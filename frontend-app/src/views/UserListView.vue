<script setup lang="ts">
import { mockApiService } from '@/services/mock-api.service'
import type { User } from '@/types/User'
import { onMounted, ref } from 'vue'

const users = ref<User[]>([])

onMounted(async () => {
  users.value = await mockApiService.getUsers()
})
</script>

<template>
  <main class="container">
    <h1>Registered users</h1>
    <ol>
      <li v-for="user of users" :key="user.uuid">{{ user.email }}</li>
    </ol>
  </main>
</template>

<style scoped lang="scss">
ol {
  list-style: upper-roman;
}
</style>
