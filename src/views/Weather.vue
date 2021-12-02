<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <div v-else class="weather" :class="{ day: isDay, night: isNight }">
      <div class="weather-wrap">
        <current-weather
          :isNight="isNight"
          :isDay="isDay"
          :currentWeather="currentWeather"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { query, where, collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import fireStore from '@/firebase/init';
import { WeatherInterface } from '@/type';

import CurrentWeather from '@/components/CurrentWeather.vue';

interface ForecastInterface {
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: {
    dt?: number;
    sunrise?: number;
    sunset?: number;
    temp?: number;
    feels_like?: number;
    pressure?: number;
    humidity?: number;
    dew_point?: number;
    uvi?: number;
    clouds?: number;
    visibility?: number;
    wind_speed?: number;
    wind_gust?: number;
    wind_deg?: number;
    weather?: {
      id?: number;
      main?: string;
      description?: string;
      icon?: string;
    }[];
    rain?: {
      [propName: string]: number;
    };
    snow?: {
      [propName: string]: number;
    };
  };
  minutely?: {
    dt?: number;
    precipitation?: number;
  }[];

  hourly?: {
    dt?: number;
    temp?: number;
    feels_like?: number;
    pressure?: number;
    humidity?: number;
    dew_point?: number;
    uvi?: number;
    clouds?: number;
    visibility?: number;
    wind_speed?: number;
    wind_deg?: number;
    wind_gust?: number;

    weather?: {
      id?: number;
      main?: string;
      description?: string;
      icon?: string;
    }[];
    pop?: number;
  }[];

  daily?: {
    dt?: number;
    sunrise?: number;
    sunset?: number;
    moonrise?: number;
    moonset?: number;
    moon_phase?: number;
    temp?: {
      day?: number;
      min?: number;
      max?: number;
      night?: number;
      eve?: number;
      morn?: number;
    };
    feels_like?: {
      day?: number;
      night?: number;
      eve?: number;
      morn?: number;
    };
    pressure?: number;
    humidity?: number;
    dew_point?: number;
    wind_speed?: number;
    wind_gust?: number;
    wind_deg?: number;
    weather?: {
      id?: number;
      main?: string;
      description?: string;
      icon?: string;
    }[];
    clouds?: number;
    pop?: number;
    rain?: number;
    snow?: number;
    uvi?: number;
  }[];
  alerts?: {
    sender_name?: string;
    event?: string;
    start?: number;
    end?: number;
    description?: string;
    tags?: string[];
  }[];
}

export default defineComponent({
  name: 'Weather-app',
  components: { CurrentWeather },
  props: {
    api: {
      type: String,
      require: true,
    },
    isDay: {
      type: Boolean,
      default: false,
    },
    isNight: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const route = useRoute();

    const { city } = route.params;

    const loading = ref<boolean>(true);
    const forecast = reactive<ForecastInterface>({});
    const currentWeather = reactive<WeatherInterface>({});
    const currentTime = ref<number>();
    // methods
    const getWeather = async () => {
      const q = query(
        collection(fireStore, 'cities'),
        where('city', '==', city)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        console.log('weather :', doc.data());
        const { currentweather: cWeather } = doc.data();
        Object.assign(currentWeather, cWeather);
        const lat = currentWeather?.coord?.lat || 0;
        const lon = currentWeather?.coord?.lon || 0;
        const url = 'https://api.openweathermap.org/data/2.5/onecall';
        const part = 'current,current,minutely,hourly,daily,alerts';
        const params = {
          params: {
            appid: props.api,
            exclude: part,
            lat,
            lon,
          },
        };
        await axios
          .get(url, params)
          .then((res) => {
            Object.assign(forecast, res.data as ForecastInterface);
          })
          .finally(() => {
            loading.value = false;
            getCurrentTime();
          });
      });
    };

    const getCurrentTime = () => {
      const dateObj = new Date();
      currentTime.value = dateObj.getHours();
      const sunrise = new Date(
        // @ts-ignore: Object is possibly 'null'.
        currentWeather?.sys?.sunrise * 1000
      ).getHours();
      const sunset = new Date(
        // @ts-ignore: Object is possibly 'null'.
        currentWeather?.sys?.sunset * 1000
      ).getHours();

      if (currentTime.value > sunrise && currentTime.value < sunset) {
        context.emit('is-day');
      } else {
        context.emit('is-night');
      }
    };

    onMounted(() => {
      getWeather();
    });

    onUnmounted(() => {
      context.emit('reset-days');
    });

    return {
      city,
      loading,
      forecast,
      currentWeather,
    };
  },
});
</script>

<style lang="scss" scoped>
.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
.weather {
  transition: 500ms ease all;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  .weather-wrap {
    overflow: hidden;
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>
