<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { ref } from 'vue';

const auth = useAuthStore()
const emailInput = ref('')

async function login() {
  await auth.demoLogin(emailInput.value)
}
</script>

<template>
  <form class="login-wrapper flex-col no-wrap" @submit.prevent="login()">
    <h1>Please login to continue</h1>
    <h2 class="flex-row gap">
      <div>⚠️</div>
      <div>
        <div>Real login not implemented yet.</div>
        <div>Type in any email to continue.</div>
      </div>
      <div>⚠️</div>
    </h2>
    <div class="flex-col">
      <div class="flex-col row">
        <label>Email</label>
        <input type="email" name="email" v-model="emailInput" autocomplete="off" required>
      </div>
      <div class="flex-col row">
        <label>Password</label>
        <input type="password" name="password" required disabled>
      </div>
      <div class="flex-row button-wrapper row">
        <button type="submit">Login</button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.login-wrapper {
  max-width: 75ch;
  margin-inline: auto;
}

h2 {
  gap: 1rem;
  line-height: 1em;
  justify-content: center;
  flex-wrap: wrap;
}

.button-wrapper {
  justify-content: center;

  button {
    min-width: 16ch;
  }
}
</style>
