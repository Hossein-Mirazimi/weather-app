<template>
  <div @click="goToWeather" class="city">
    <i
      v-if="edit"
      @click.self="removeCity"
      class="far fa-trash-alt edit"
      ref="edit"
    />
    <span>{{ cityDetail?.city }}</span>
    <div class="weather">
      <span>{{ temp }}&deg;</span>
      <img :src="src" alt="weather icon" />
    </div>
    <div class="video">
      <video autoplay loop muted :src="videoSrc"></video>
      <div class="bg-overlay"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { CityInterface } from '@/type';
import fireStore from '@/firebase/init';

export default defineComponent({
  name: 'City',
  props: {
    city: {
      type: Object as () => CityInterface,
      require: true,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const router = useRouter();

    const { city: cityDetail, editMode: edit } = toRefs(props);

    const temp = computed<number>( // @ts-ignore: Object is possibly 'null'.
      () => Math.round(cityDetail.value.currentweather?.main?.temp) || 0
    );

    const src = computed(() =>
      require(`../../public/conditions/${
        // @ts-ignore: Object is possibly 'null'.
        cityDetail.value.currentweather?.weather[0]?.icon || '01d'
      }.svg`)
    );

    const videoSrc = computed(() =>
      require(`../../public/videos/${
        // @ts-ignore: Object is possibly 'null'.
        cityDetail.value.currentweather?.weather[0]?.icon || '01d'
      }.mp4`)
    );

    // methods
    const goToWeather = () => {
      router.push(`/weather/${cityDetail.value?.city}`);
    };

    const removeCity = async () => {
      const q = query(
        collection(fireStore, 'cities'),
        where('__name__', '==', cityDetail.value?.id)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(fireStore, 'cities', document.id));
      });
    };
    return {
      cityDetail,
      edit,
      temp,
      videoSrc,
      src,
      goToWeather,
      removeCity,
    };
  },
});
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  flex-basis: 50%;
  min-height: 250px;
  color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .edit {
    border-radius: 0 15px 0 0;
    border: 10px solid rgb(77, 77, 77);
    background-color: rgb(77, 77, 77);
    z-index: 2;
    font-size: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  span {
    z-index: 1;
    text-transform: capitalize;
    display: block;
    font-size: 25px;
    font-weight: 600;
  }

  .weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
    span {
      font-size: 35px;
      margin-right: 8px;
    }
    img {
      height: 20px;
      width: auto;
    }
  }

  .video {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    video {
      height: 100%;
      @media (min-width: 900px) {
        height: auto;
        width: 100%;
      }
    }

    .bg-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
