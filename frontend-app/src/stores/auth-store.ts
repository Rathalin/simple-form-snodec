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
    },
    async demoLogin(email: string) {
      this.user = {
        uuid: crypto.randomUUID(),
        email,
        username: email,
        created_at: new Date().toDateString(),
        color_hex: '#4caf50',
      }
      await this.router.push('/')
    },
    async demoLogout() {
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