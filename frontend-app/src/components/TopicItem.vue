<script setup lang="ts">
import type { Topic } from '@/types/Topic'
import { computed } from '@vue/reactivity'

const { topic } = defineProps<{
  topic: Topic
}>()

const created_at = computed(() => {
  return new Date(topic.created_at).toLocaleString('en-US', {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <RouterLink :to="`/topic/${topic.id}`">
    <div class="item">
      <div class="title">{{ topic.title }}</div>
      <div class="subinfo">
        <RouterLink to="#" class="email">{{ topic.user.email }}</RouterLink>
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
  background-color: hwb(159 85% 5%);
  padding: 1em;
  border-radius: 3px;
}

.subinfo {
  font-size: small;
}
</style>
