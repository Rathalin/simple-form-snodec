<script setup lang="ts">
import { apiService, type User } from '@/services/api.service'
import { onMounted, ref } from 'vue'

const users = ref<User[]>([])

onMounted(async () => {
  users.value = await apiService.getUsers()
})
</script>

<template>
  <div>
    <h1>Registered users</h1>
    <ol>
      <li v-for="user of users" :key="user.email">{{ user.email}}</li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
ol {
  list-style: upper-roman;
}
</style>
