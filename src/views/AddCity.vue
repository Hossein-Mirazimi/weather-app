<template>
  <div class="grid">
    <template v-if="citiesItems.length > 0">
      <div class="city-link" v-for="(city, index) in citiesItems" :key="index">
        <city :city="city" :editMode="editMode" />
      </div>
    </template>
    <div v-else class="no-cities">
      <p>No cities added, add a new one?</p>
      <button @click="addCity">Add City</button>
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
  setup(props, context) {
    const { cities: citiesItems, isEditMode: editMode } = toRefs(props);
    const addCity = () => {
      context.emit('add-city');
    };
    return {
      citiesItems,
      editMode,
      addCity,
    };
  },
});
</script>

<style lang="scss" scoped>
.no-cities {
  position: absolute;
  max-width: 1024px;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}

button {
  margin-top: 16px;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 500ms ease all;
  &:hover {
    outline: none;
    transform: scale(0.98);
  }
  &:focus {
    outline: none;
  }
}
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
