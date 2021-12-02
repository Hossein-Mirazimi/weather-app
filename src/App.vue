<template>
  <div class="main">
    <modal v-if="modalShow" @close="toggleModal" :api="api" />
    <navigation
      :add-city-active="addCityActive"
      @add-city="toggleModal"
      @edit-city="toggleEditCity"
      :is-day="isDay"
      :is-night="isNight"
    />
    <router-view
      v-bind="{ cities, isEditMode, api }"
      @is-day="dayTime"
      @is-night="nightTime"
      @reset-days="resetDays"
      :is-day="isDay"
      :is-night="isNight"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import firestore from './firebase/init';
import { CityInterface } from '@/type';

import Navigation from '@/components/Navigation.vue';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  components: { Navigation, Modal },
  setup() {
    const route = useRoute();

    const API_KEY = 'c8de308c605b0e7286c3a190a8ca12c6';
    const cities = ref<CityInterface[]>([]);
    const modalShow = ref<boolean>(false);
    const isEditMode = ref<boolean>(false);
    const addCityActive = ref<boolean>(false);
    const isDay = ref<boolean>(false);
    const isNight = ref<boolean>(false);
    // methods
    const checkRoute = () => {
      addCityActive.value = route.name === 'AddCity';
    };

    const toggleModal = () => {
      modalShow.value = !modalShow.value;
    };

    const toggleEditCity = () => {
      isEditMode.value = !isEditMode.value;
    };

    const getCityWeather = () => {
      onSnapshot(collection(firestore, 'cities'), (snapshot) => {
        snapshot.docChanges().forEach(async (document) => {
          const { type, doc: cityDocument } = document;
          const { city, currentweather } = cityDocument.data();
          console.log(type, ' -> ', cityDocument, ' -> ', cityDocument.data());

          if (type === 'added' && !currentweather) {
            try {
              console.log('update currentWeather');
              const url = 'https://api.openweathermap.org/data/2.5/weather';
              const params = { params: { q: city, appid: API_KEY } };
              await axios.get(url, params).then(({ data }) => {
                const document = doc(firestore, 'cities', cityDocument.id);
                updateDoc(document, {
                  currentweather: data,
                }).then(() => {
                  cities.value.push({
                    ...cityDocument.data(),
                    id: cityDocument.id,
                  } as CityInterface);
                });
              });
            } catch (err) {
              console.log(err);
            }
          } else if (type === 'removed') {
            cities.value = cities.value.filter(
              (city) => city.id !== cityDocument.id
            );
          } else {
            cities.value.push({
              ...cityDocument.data(),
              id: cityDocument.id,
            } as CityInterface);
          }
        });
      });
    };

    const dayTime = () => {
      isDay.value = !isDay.value;
    };

    const nightTime = () => {
      isNight.value = !isNight.value;
    };

    const resetDays = () => {
      dayTime();
      nightTime();
    };

    watch([route], () => {
      checkRoute();
    });

    // lifecycle
    onMounted(() => {
      console.log('test');
      getCityWeather();
    });

    return {
      toggleEditCity,
      toggleModal,
      modalShow,
      cities,
      api: API_KEY,
      isEditMode,
      addCityActive,
      dayTime,
      nightTime,
      isDay,
      isNight,
      resetDays,
    };
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 240);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
}
.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
}

.main {
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;

  .container {
    padding: 0 20px;
  }
}
</style>
