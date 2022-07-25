<script setup lang="ts">
import type { User } from '@/types/User';


defineProps<{
  user: User
}>()
</script>

<template>
  <RouterLink :to="`/user/${user.uuid}`" class="link">{{ user.username }}</RouterLink>
</template>

<style scoped lang="scss">
</style>
