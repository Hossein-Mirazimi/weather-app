import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AddCity from '../views/AddCity.vue';
import Weather from '../views/Weather.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AddCity',
    component: AddCity,
  },
  {
    path: '/weather/:city',
    name: 'Weather-app',
    component: Weather,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
