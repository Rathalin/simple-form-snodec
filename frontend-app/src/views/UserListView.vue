<script setup lang="ts">
import type { UserDTO } from '@/types/UserDTO'
import { onMounted, ref } from 'vue'
import UserThumbnail from '../components/UserThumbnail.vue'
import UserLink from '../components/UserLink.vue'
import { apiMockService } from '@/services/api/mock/api-mock.service';

const users = ref<UserDTO[]>([])

onMounted(async () => {
  users.value = await apiMockService.getUsers()
})
</script>

<template>
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
