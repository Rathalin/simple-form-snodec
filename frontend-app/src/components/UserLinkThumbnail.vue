<script setup lang="ts">
import type { User } from '@/types/User'
import UserThumbnail from './UserThumbnail.vue'

defineProps<{
  user: User,
}>()

</script>

<template>
  <RouterLink :to="`/user/${user.uuid}`">
    <UserThumbnail :user="user" />
  </RouterLink>
</template>

<style scoped lang="scss">
</style>
