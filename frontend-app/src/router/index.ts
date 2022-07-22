import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/index.html',
      redirect: { name: 'home' },
    },
    {
      path: '/registered-users',
      name: 'registered-users',
      component: () => import('../views/UserListView.vue')
    },
  ]
})

export default router
