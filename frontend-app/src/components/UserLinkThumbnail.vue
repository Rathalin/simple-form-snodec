<script setup lang="ts">
import type { UserDTO } from '@/types/UserDTO'
import UserThumbnail from './UserThumbnail.vue'

defineProps<{
  user: UserDTO,
}>()

</script>

<template>
  <RouterLink :to="`/user/${user.uuid}`">
    <UserThumbnail :user="user" />
  </RouterLink>
</template>

<style scoped lang="scss">

</style>
