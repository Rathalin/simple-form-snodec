import { apiMockService } from '@/services/api.mock.service'
import type { User } from '@/types/User'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('user', {
  state: (): {
    user: User | null
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
    login(email: string, password: string) {
      // TODO Login with apiService
      throw new Error(`Not implemented`)
    },
    async demoLogin(email: string) {
      const response = await apiMockService.login(email)
      if (response.user != null) {
        this.user = response.user
        await this.router.push('/')
      } else {
        return response.error
      }
    },
    async demoLogout() {
      if (this.user == null) {
        throw new Error(`Can't logout with 'user' being 'null'`)
      }
      await apiMockService.logout(this.user)      
      this.user = null
      await this.router.push('/login')
    },
  },
})

export const useStore = defineStore("game", {
  actions: {
    updatePreviousPieceSelected(piece?: any) {
      this.previousPieceSelected
    }
  },
  state: () => {
    return {
      moves: [],
      previousPieceSelected: undefined as any | undefined,
    }
  },
})