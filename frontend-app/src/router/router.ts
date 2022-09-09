import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import TopicView from '@/views/TopicView.vue'
import ThreadView from '@/views/ThreadView.vue'
import UserListView from '@/views/UserListView.vue'


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
      path: '/topic/:uuid',
      name: 'topic',
      component: TopicView,
    },
    {
      path: '/thread/:uuid',
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
      path: '/api-debug',
      name: 'api-debug',
      component: () => import('@/views/ApiDebugView.vue'),
    },
    {
      path: '/user/:uuid',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/xd',
      name: 'xd',
      component: () => import('@/views/EmojiView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: () => import('@/views/NotFoundView.vue'),
    }
  ]
})

router.beforeEach((to, from) => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated) {
    if (to.name !== 'login') {
      return {
        name: 'login'
      }
    }
  } else {
    if (to.name === 'login') {
      return {
        name: 'home'
      }
    }
  }
})

export default router
