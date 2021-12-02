<template>
  <div class="additional-info container">
    <div>
      <span>Sunrise</span>
      <span>{{ sunrise }}</span>
    </div>
    <div>
      <span>SunSet</span>
      <span>{{ sunset }}</span>
    </div>
    <div>
      <span>Humidity</span>
      <span>{{ currentWeather.main?.humidity }}%</span>
    </div>
    <div>
      <span>Cloudness</span>
      <span>{{ currentWeather.clouds?.all }}%</span>
    </div>
    <div>
      <span>Wind</span>
      <span>{{ wind }}mph</span>
    </div>
    <div>
      <span>Pressure</span>
      <span>{{ currentWeather.main?.pressure }}&nbsp;hPa</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { WeatherInterface } from '@/type';

export default defineComponent({
  name: 'AdditionalInfo',
  props: {
    currentWeather: {
      type: () => Object as WeatherInterface,
      required: true,
    },
  },
  setup(props) {
    const { currentWeather } = toRefs(props);
    const sunrise = computed(() =>
      // @ts-ignore: Object is possibly 'null'.
      new Date(currentWeather.value.sys?.sunrise * 1000).toLocaleString(
        'en-us',
        { timeStyle: 'short' }
      )
    );
    const sunset = computed(() =>
      // @ts-ignore: Object is possibly 'null'.
      new Date(currentWeather.value.sys?.sunset * 1000).toLocaleString(
        'en-us',
        { timeStyle: 'short' }
      )
    );
    // @ts-ignore: Object is possibly 'null'.
    const wind = computed(() => Math.round(currentWeather.value?.wind?.speed));

    return {
      sunrise,
      sunset,
      wind,
    };
  },
});
</script>

<style lang="scss" scoped>
.additional-info {
  padding: 30px 20px;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  > div {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    margin-bottom: 20px;
    span {
      &:nth-child(1) {
        font-size: 12px;
        margin-bottom: 8px;
      }
      &:nth-child(2) {
        font-weight: 600;
      }
    }
    &:nth-child(5),
    &:nth-child(6) {
      margin-bottom: 0;
    }
  }
}
</style>
