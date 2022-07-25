<script setup lang="ts">
import { apiMockService } from '@/services/api.mock.service';
import type { User } from '@/types/User'
import { getDateFromString } from '@/util/date.util'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import BackButton from '../components/BackButton.vue';

const route = useRoute()
const user = ref<User | null>(null)

const created_at = computed(() => {
  return user.value == null ? '' : getDateFromString(user.value.created_at)
})

onMounted(async () => {
  const userUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  user.value = await apiMockService.getUserByUUID(userUuid)
})
</script>

<template>
  <template v-if="user != null">
    <main class="container">
      <h1 class="flex-row gap-1em mg-b-05em">
        <div>{{ user.username }}</div>
        <BackButton label="Back" />
      </h1>
      <div>Email: {{ user.email }}</div>
      <div>Joined: {{ created_at }}</div>
    </main>
  </template>
</template>

<style scoped lang="scss">
</style>
