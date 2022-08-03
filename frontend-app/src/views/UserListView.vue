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
    <div class="card no-hover">
      <ol>
        <li v-for="user of users" :key="user.uuid">
          <div>{{ user.username }}</div>
          <div>{{ user.email }}</div>
        </li>
      </ol>
    </div>
  </main>
</template>

<style scoped lang="scss">
.card {
  padding: 1em;
}

ol {
  margin-top: 1em;
  list-style: upper-roman;

  li:not(:first-of-type) {
    margin-top: 1em;
  }
}
</style>
