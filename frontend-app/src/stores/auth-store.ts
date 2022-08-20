import { apiMockService } from '@/services/api.mock.service'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('user', {
  state: () => {
    return { isAuthenticated: false, user: apiMockService.demoUser }
  },
})
