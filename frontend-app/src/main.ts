import { createApp, markRaw } from 'vue'
import App from './App.vue'

import './styles/app.scss'
import { createPinia } from 'pinia'
import { useRouter, type Router } from 'vue-router'
import router from './router/router'

const pinia = createPinia()

declare module 'pinia' {
  export interface PiniaCustomProperties {
      router: Router
  }
}
pinia.use(({ store }) => {
  store.router = markRaw(useRouter())
})
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
