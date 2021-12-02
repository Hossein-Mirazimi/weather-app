<template>
  <div class="grid">
    <div class="city-link" v-for="(city, index) in citiesItems" :key="index">
      <city :city="city" :editMode="editMode" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { CityInterface } from '@/type';

import City from '@/components/City.vue';

export default defineComponent({
  name: 'AddCity',
  components: { City },
  props: {
    cities: {
      type: Object as () => CityInterface[],
      required: true,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { cities: citiesItems, isEditMode: editMode } = toRefs(props);
    return {
      citiesItems,
      editMode,
    };
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  padding-top: 81px;
  background-color: #31363d;
  width: 100%;
  height: 100vh;
  grid-auto-rows: 250px;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
