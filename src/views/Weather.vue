<template>
  <h3>this weather {{ city }} {{ loading }}</h3>
  <div>
    {{ currentWeather }}
    {{ forecast }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { query, where, collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import fireStore from '@/firebase/init';
import { WeatherInterface } from '@/type';

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
  props: {
    api: {
      type: String,
      require: true,
    },
  },
  setup(props, context) {
    const route = useRoute();

    const { city } = route.params;

    const loading = ref<boolean>(true);
    let forecast = reactive<ForecastInterface>({});
    let currentWeather = reactive<WeatherInterface>({});
    const currentTime = ref<number>();
    // methods
    const getWeather = async () => {
      const q = query(
        collection(fireStore, 'cities'),
        where('city', '==', city)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const { currentweather: cWeather } = doc.data();
        currentWeather = cWeather;
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
            forecast = res.data as ForecastInterface;
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
      // @ts-ignore: Object is possibly 'null'.
      const sunrise = new Date(currentWeather?.sys?.sunrise * 1000).getHours();
      // @ts-ignore: Object is possibly 'null'.
      const sunset = new Date(currentWeather?.sys?.sunset * 1000).getHours();

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
h3 {
  padding-top: 100px;
}
</style>
