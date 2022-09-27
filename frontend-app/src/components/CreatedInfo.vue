<script setup lang="ts">
import type { UserDTO } from '@/types/UserDTO';
import { getDateTimeFromString } from '@/util/date.util'
import { computed } from 'vue'
import UserLink from './UserLink.vue'


const props = defineProps<{
  user: UserDTO
  createdAt: string
}>()

const created_at = computed(() => getDateTimeFromString(props.createdAt))
</script>

<template>
  <div class="subinfo">
    <UserLink :user="props.user" />
    <span> at </span>
    <span class="date">{{ created_at }}</span>
  </div>
</template>

<style scoped lang="scss">
.subinfo {
  font-size: small;
  color: var(--c-text-second);
}
</style>
