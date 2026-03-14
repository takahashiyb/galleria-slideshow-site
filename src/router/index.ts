import DetailsPage from '@/pages/DetailsPage.vue'
import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { name: 'home', path: '/', component: HomePage },
    {
      name: 'details',
      path: '/details/:name',
      component: DetailsPage,
    },
  ],
})

export default router
