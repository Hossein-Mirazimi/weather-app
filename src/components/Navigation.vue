<template>
  <header v-if="addCityActive" class="container add-city">
    <nav>
      <span>Add City</span>
      <div class="right">
        <i
          class="fas fa-edit"
          @click="editCity"
          :class="{ 'edit-active': isToggle }"
        />
        <i class="fas fa-sync" @click="reload" />
        <i class="fas fa-plus" @click="addCity" />
      </div>
    </nav>
  </header>
  <header v-else class="container" :class="{ day: isDay, night: isNight }">
    <nav>
      <router-link class="router-link" :to="{ name: 'AddCity' }">
        <i class="fas fa-plus" />
      </router-link>
      <span>
        {{ new Date().toLocaleString('en-us', { weekday: 'short' }) }}
        {{ new Date().toLocaleString('en-us', { month: 'short' }) }}
        {{ new Date().toLocaleString('en-us', { day: '2-digit' }) }}
      </span>
      <span> &deg; F </span>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Navigation',
  props: {
    addCityActive: {
      type: Boolean,
      default: false,
    },
    isDay: {
      type: Boolean,
      default: false,
    },
    isNight: {
      type: Boolean,
      defualt: false,
    },
  },
  setup(_, context) {
    const isToggle = ref<boolean>(false);
    const addCity = () => {
      context.emit('add-city');
    };

    const editCity = () => {
      isToggle.value = !isToggle.value;
      context.emit('edit-city');
    };

    const reload = () => {
      location.reload();
    };

    return { addCity, editCity, reload, isToggle };
  },
});
</script>

<style lang="scss" scoped>
.add-city {
  background: #313640;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
}

header {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;

  nav {
    display: flex;
    color: #fff;
    padding: 30px 0;
    justify-content: space-between;
  }

  .router-link {
    color: #fff;
  }

  .edit-active {
    color: rgb(210, 75, 75);
  }
  .right {
    i {
      font-size: 20px;
    }

    i::nth-child(2),
    i::nth-child(3) {
      margin-left: 16px;
    }
  }

  span {
    font-weight: 400;
  }
}
</style>
