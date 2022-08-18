<script setup lang="ts">
import { apiMockService } from '@/services/api.mock.service'
import type { User } from '@/types/User'
import { getDateFromString } from '@/util/date.util'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BackButton from '@/components/BackButton.vue'
import UserThumbnail from '@/components/UserThumbnail.vue'

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
    <h1 class="flex-row gap-1">
      <div>{{ user.username }}</div>
      <BackButton label="Back" />
    </h1>
    <div class="flex-row gap-1">
      <UserThumbnail :user="user" />
      <div class="flex-col">
        <div class="flex-row icon-row">
          <span class="material-icons">email</span>
          <span>{{ user.email }}</span>
        </div>
        <div class="flex-row icon-row">
          <span class="material-icons">access_time</span>
          <span>{{ created_at }}</span>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
.icon-row {
  gap: 0.5rem;
}
</style>
