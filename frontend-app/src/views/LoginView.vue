<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { ref } from 'vue';


const auth = useAuthStore()
const emailInput = ref('')
const passwordInput = ref('')

async function login() {
  const errors = await auth.login(emailInput.value, passwordInput.value)
  if (errors != null) {
    console.table(errors)
  }
}
</script>

<template>
  <form class="login-wrapper flex-col no-wrap" @submit.prevent="login()">
    <h1>Login</h1>
    <div class="flex-col">
      <div class="flex-col row">
        <label>Email</label>
        <input type="email" name="email" v-model="emailInput" autocomplete="off" required autofocus>
      </div>
      <div class="flex-col row">
        <label>Password</label>
        <input type="password" name="password" required v-model="passwordInput">
      </div>
      <div class="flex-row button-wrapper row">
        <button class="round" type="submit">Login</button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.login-wrapper {
  max-width: 50ch;
  margin-inline: auto;
}

h2 {
  gap: 1rem;
  line-height: 1em;
  flex-wrap: wrap;
  justify-content: center;
}

.button-wrapper {
  justify-content: center;

  button {
    min-width: 16ch;
  }
}

.hint {
  margin-bottom: 1rem;
}
</style>
