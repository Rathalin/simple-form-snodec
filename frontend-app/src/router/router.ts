import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import TopicView from '@/views/TopicView.vue'
import ThreadView from '@/views/ThreadView.vue'
import UserListView from '@/views/UserListView.vue'
import { useAuthStore } from '@/stores/auth-store'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: TopicView,
    },
    {
      path: '/thread/:id',
      name: 'thread',
      component: ThreadView,
    },
    {
      path: '/index.html',
      redirect: { name: 'home' },
    },
    {
      path: '/registered-users',
      name: 'registered-users',
      component: UserListView,
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/VueHelpView.vue'),
    },
  ]
})

router.beforeEach((to, from) => {
  const auth = useAuthStore()
  auth.isAuthenticated = true
  if (!auth.isAuthenticated && to.name !== 'login') {
    return {
      name: 'login'
    }
  }
})

export default router
