<script setup lang="ts">
import type { Thread } from '@/types/Thread'
import { computed } from '@vue/reactivity';

const { thread } = defineProps<{
  thread: Thread,
}>()

const created_at = computed(() => {
  return new Date(thread.created_at).toLocaleString('en-US', {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <RouterLink class="no-link card" :to="`/thread/${thread.uuid}`">
    <div class="item">
      <h2 class="title">{{ thread.title }}</h2>
      <div class="subinfo">
        <RouterLink to="#" class="email">{{ thread.user.email }}</RouterLink>
        <span> at </span>
        <span class="date">{{ created_at }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
div.item {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

.subinfo {
  font-size: small;
  color: var(--c-text-second);
}
</style>
