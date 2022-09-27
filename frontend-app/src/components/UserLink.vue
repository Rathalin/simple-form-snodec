<script setup lang="ts">
import type { UserDTO } from '@/types/UserDTO';

defineProps<{
  user: UserDTO
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
