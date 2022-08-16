<script setup lang="ts">
import { apiMockService } from '@/services/api.mock.service'
import type { User } from '@/types/User'
import { onMounted, ref } from 'vue'
import UserThumbnail from '../components/UserThumbnail.vue'
import UserLink from '../components/UserLink.vue'
import { apiService } from '@/services/api.service'

const users = ref<User[]>([])

onMounted(async () => {
  users.value = await apiService.getUsers()
})
</script>

<template>
  <main class="container">
    <h1>Registered users</h1>
    <div class="card no-hover">
      <ol>
        <li v-for="user of users" :key="user.uuid">
          <div class="flex-row no-wrap gap-1">
            <UserThumbnail :user="user" />
            <UserLink :user="user" />
          </div>
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
  padding-inline: inherit;
  list-style: none;

  li:not(:first-of-type) {
    margin-top: 1em;
  }
}
</style>
