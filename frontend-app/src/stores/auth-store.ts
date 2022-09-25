import { apiMockService } from '@/services/mock/api.mock.service'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'


function getRandomDarkColor() {
  const rgbMin = 30
  const rgbMax = 120
  const rgb: number[] = []
  for (let i = 0; i < 3; i++) {
    rgb.push(Math.floor((Math.random() * (rgbMax - rgbMin)) + rgbMin))
  }
  const hex = rgb
    .map(num => num.toString(16)) // To HEX
    .map(numStr => numStr.length === 1 ? '0' + numStr : numStr) // Add leading zero
  return `#${hex[0]}${hex[1]}${hex[2]}`
}


function now(): string {
  return new Date().toISOString()
}


function getNewUuid(): string {
  return crypto?.randomUUID() ?? `UUID${new Date().getTime()}`
}


export const useAuthStore = defineStore('user', {
  state: (): {
    user: {
      uuid: string
      email: string
      username: string
      created_at: string
      color_hex: string
    } | null
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
      // const response = await apiMockService.login(email)
      // if (response.user != null) {
      //   this.user = response.user
      //   await this.router.push('/')
      // } else {
      //   return response.error
      // }
      this.user = {
        uuid: crypto.randomUUID(),
        email,
        username: email,
        created_at: new Date().toDateString(),
        color_hex: getRandomDarkColor(),
      }
    },
    async demoLogout() {
      if (this.user == null) {
        throw new Error(`Can't logout with 'user' being 'null'`)
      }
      // await apiMockService.logout(this.user)
      this.user = null
      await this.router.push('/login')
    },
  },
})
