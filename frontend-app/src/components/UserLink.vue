<script setup lang="ts">
import type { User } from '@/types/User';


defineProps<{
  user: User
}>()
</script>

<template>
  <RouterLink :to="`/user/${user.uuid}`" class="profile-link">{{ user.username }}</RouterLink>
</template>

<style scoped lang="scss">
.profile-link {
  font-weight: bold;
  transition-duration: var(--duration-fast);
  transition-property: color;

  &:hover {
    color: var(--c-text-prime-acc-1);
  }
}
</style>
