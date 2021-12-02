<template>
  <div class="weekly-forecast">
    <div class="container">
      <div class="daily" v-for="(day, index) in filteredList" :key="index">
        <daily-forecast :day="day" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { ForecastInterface } from '@/type';
import DailyForecast from '@/components/DailyForecast.vue';

export default defineComponent({
  name: 'WeeklyForecast',
  components: { DailyForecast },
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
      return fc.value.daily?.splice(1, 8);
    });

    return {
      filteredList,
    };
  },
});
</script>

<style lang="scss" scoped>
.weekly-forecast {
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  .daily {
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
