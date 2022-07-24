<script setup lang="ts">
import type { Thread } from '@/types/Thread'
import { getTimeFromDateString } from '@/util/date.util'
import { computed } from '@vue/reactivity';

const { thread } = defineProps<{
  thread: Thread,
}>()

const created_at = computed(() => getTimeFromDateString(thread.created_at))
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
