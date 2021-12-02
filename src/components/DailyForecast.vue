<template>
  <div class="daily-forecast">
    <div>
      <span>{{ weekName }}</span>
    </div>
    <div class="condition">
      <img :src="require(`../../public/conditions/${dayIcon}.svg`)" alt="" />
    </div>
    <div class="weather">
      <span class="high">{{ tempMax }}</span>
      <span class="low">{{ tempMin }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { DailyInterface } from '@/type';

export default defineComponent({
  name: 'DailyForecast',
  props: {
    day: {
      type: () => Object as DailyInterface,
      required: true,
    },
  },
  setup(props) {
    const { day: d } = toRefs(props);
    const weekName = computed(() =>
      // @ts-ignore: Object is possibly 'null'.
      new Date(d.value?.dt * 1000).toLocaleString('en-us', { weekday: 'long' })
    );
    // @ts-ignore: Object is possibly 'null'.
    const dayIcon = computed(() => d.value?.weather[0]?.icon);
    // @ts-ignore: Object is possibly 'null'.
    const tempMax = computed(() => Math.round(d.value?.temp?.max));
    // @ts-ignore: Object is possibly 'null'.
    const tempMin = computed(() => Math.round(d.value?.temp?.min));

    return {
      weekName,
      tempMax,
      tempMin,
      dayIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.daily-forecast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  div {
    flex: 1;
  }
  .condition {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
    }
  }
  .weather {
    display: flex;
    justify-content: flex-end;
    span {
      min-width: 20px;
    }
    .high {
      font-weight: 500;
      margin-right: 12px;
    }
  }
}
</style>
