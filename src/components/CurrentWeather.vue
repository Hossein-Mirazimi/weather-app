<template>
  <div class="current-weather">
    <div class="container">
      <div class="weather-info">
        <span class="city">{{ currentWeather.name }}</span>
        <span class="current-temperature">{{ temp }}</span>

        <div class="high-low-temperatures">
          <div class="high">
            <i class="fas fa-chevron-up"></i>
            <span>{{ tempMax }}&deg;</span>
          </div>
          <div class="low">
            <i class="fas fa-chevron-down"></i>
            <span>{{ tempMin }}&deg;</span>
          </div>
        </div>

        <span class="condition">{{ description }}</span>
        <span class="feals-like">Feels like {{ feelsLike }}</span>
      </div>
      <div class="weather-icon">
        <img v-if="isDay" src="../../public/sun.png" alt="" />
        <img v-if="isNight" src="../../public/moon.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { WeatherInterface } from '@/type';

export default defineComponent({
  name: 'CurrentWeather',
  props: {
    isDay: {
      type: Boolean,
      defualt: false,
    },
    isNight: {
      type: Boolean,
      defualt: false,
    },
    currentWeather: {
      type: () => Object as WeatherInterface,
      required: true,
    },
  },
  setup(props) {
    // @ts-ignore: Object is possibly 'null'.
    const temp = computed(() => Math.round(props.currentWeather.main?.temp));
    const tempMin = computed(() =>
      // @ts-ignore: Object is possibly 'null'.
      Math.round(props.currentWeather.main?.temp_min)
    );
    const tempMax = computed(() =>
      // @ts-ignore: Object is possibly 'null'.
      Math.round(props.currentWeather.main?.temp_max)
    );
    const description = computed(() =>
      // @ts-ignore: Object is possibly 'null'.
      props.currentWeather?.weather?.length > 0
        ? // @ts-ignore: Object is possibly 'null'.
          props.currentWeather?.weather[0]?.description || ''
        : ''
    );
    const feelsLike = computed(() =>
      // @ts-ignore: Object is possibly 'null'.
      Math.round(props.currentWeather.main?.feels_like)
    );

    return {
      temp,
      tempMin,
      tempMax,
      description,
      feelsLike,
    };
  },
});
</script>

<style lang="scss" scoped>
.current-weather {
  margin-top: 90px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  .container {
    margin: 30px 0;
    min-height: 366px;
    position: relative;
    display: flex;
    color: #fff;
  }
  span {
    display: block;
  }
  .weather-info {
    padding-top: 30px;
    flex: 1;
    .city {
      font-size: 24px;
      font-weight: 500;
    }
    .current-temperature {
      margin-top: 40px;
      font-size: 80px;
      font-weight: 600;
    }
    .high-low-temperatures {
      display: flex;
      gap: 16px;
      .high,
      .low {
        display: flex;

        span {
          margin-left: 8px;
        }
      }
    }
  }
  .condition {
    text-transform: capitalize;
    font-size: 24px;
    font-weight: 500;
    margin: 60px 0 8px 0;
  }
  .feels-like {
    font-size: 14px;
    font-weight: 400;
  }
  .weather-icon {
    height: 100%;
    position: absolute;
    right: -160px;
    display: flex;
    align-items: center;
    img {
      width: 366px;
      height: 366px;
    }
  }
}
</style>
