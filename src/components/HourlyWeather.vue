<template>
  <div class="hourly-weather">
    <div class="container">
      <div class="hourly-temp" v-for="(item, i) in filteredList" :key="i">
        test
        <hourly-temp :time="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import { ForecastInterface } from '@/type';

import HourlyTemp from '@/components/HourlyTemp.vue';

export default defineComponent({
  name: 'HourlyWeather',
  components: { HourlyTemp },
  props: {
    forecast: {
      type: () => Object as ForecastInterface,
      required: true,
    },
  },
  setup(props) {
    const { forecast: fc } = toRefs(props);

    const filteredList = computed(() => {
      // @ts-ignore: Object is possibly 'null'.
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return fc.value.hourly?.splice(0, 10);
    });

    return {
      fc,
      filteredList,
    };
  },
});
</script>

<style lang="scss" scoped>
.hourly-weather {
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  .container {
    display: flex;
    max-width: 100vw;
    overflow: scroll;
    padding: 0;
    margin: 0 20px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
