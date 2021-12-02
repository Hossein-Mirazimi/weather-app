<template>
  <div class="hour">
    <span>{{ timeFormate }}</span>
    <span>
      <img
        :src="require(`../../public/conditions/${conditionIcon}.svg`)"
        alt=""
      />
    </span>
    <span>{{ temp }}&deg;</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { HourlyInterface } from '@/type';

export default defineComponent({
  name: 'Hour',
  props: {
    time: {
      type: () => Object as HourlyInterface,
      required: true,
    },
  },
  setup(props) {
    // @ts-ignore: Object is possibly 'null'.
    const conditionIcon = computed(() => props.time.weather[0].icon);
    // @ts-ignore: Object is possibly 'null'.
    const temp = computed(() => Math.round(props.time.temp));
    const timeFormate = computed(() =>
      // @ts-ignore: Object is possibly 'null'.
      new Date(props.time?.dt * 1000).toLocaleString('en-us', {
        hour: 'numeric',
      })
    );

    return {
      temp,
      timeFormate,
      conditionIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
.hour {
  color: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 45px;
  margin-right: 30px;
}

img {
  width: auto;
  height: 22px;
  display: block;
}
span {
  display: block;
  align-self: center;
}
span:nth-child(1) {
  font-weight: 300;
  margin-bottom: 12px;
}
span:nth-child(2) {
  margin-bottom: 12px;
}
span:nth-child(3) {
  font-weight: 500;
}
</style>
