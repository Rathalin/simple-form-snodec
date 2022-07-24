<script setup lang="ts">
import { apiMockService } from '@/services/api.mock.service'
import type { User } from '@/types/User'
import { onMounted, ref } from 'vue'

const users = ref<User[]>([])

onMounted(async () => {
  users.value = await apiMockService.getUsers()
})
</script>

<template>
  <main class="container">
    <h1>Registered users</h1>
    <ol class="card no-hover">
      <li v-for="user of users" :key="user.uuid">{{ user.email }}</li>
    </ol>
  </main>
</template>

<style scoped lang="scss">
ol {
  margin-top: 1em;
  list-style: upper-roman;
}
</style>
