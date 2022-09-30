import { apiService } from '@/services/api/api.service'
import type { UserDTO } from '@/types/UserDTO'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('user', {
  state: (): {
    user: UserDTO | null
  } => {
    return {
      user: null,
    }
  },
  getters: {
    isAuthenticated(): boolean {
      return this.user != null
    }
  },
  actions: {
    async login(email: string, password: string) {
      const response = await apiService.login(email, '')
      if (response.user != null) {
        this.user = response.user
        await this.router.push('/')
      } else {

      }
    },
    async logout() {
      if (this.user == null) {
        throw new Error(`Can't logout with 'user' being 'null'`)
      }
      await apiService.logout()
      this.user = null
      await this.router.push('/login')
    },
  },
})
