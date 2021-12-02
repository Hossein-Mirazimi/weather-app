<template>
  <div @click.self="closeModal" class="modal" ref="modal">
    <div class="modal-wrap" ref="modalWrap">
      <label for="city-name">Enter Location:</label>
      <input
        type="text"
        name="city-name"
        placeholder="Search By City Name"
        v-model="city"
      />
      <button @click="addCity">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';

import firestore from '@/firebase/init';

export default defineComponent({
  name: 'Modal',
  props: {
    api: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const city = ref<string>('');

    const closeModal = () => {
      context.emit('close');
    };

    const addCity = async () => {
      if (city.value !== '') {
        console.log('add city');
        try {
          const url = 'https://api.openweathermap.org/data/2.5/weather';
          const params = { params: { q: city.value, appid: props.api } };
          const { data } = await axios.get(url, params);
          console.log(data);
          const document = collection(firestore, 'cities');
          // const document = doc(firestore, 'cities');
          addDoc(document, {
            city: city.value,
            currentweather: data,
          }).then(() => {
            closeModal();
          });
        } catch (err) {
          console.log(err);
        }
      }
    };

    return { city, closeModal, addCity };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    color: #fff;
  }

  .modal-wrap {
    min-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    input {
      color: #fff;
      border: none;
      background: transparent;
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      border: none;
      width: 100%;
      &:focus {
        outline: none;
      }
    }

    button {
      background-color: #222325;
      color: #fff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
    }
  }
}
</style>
