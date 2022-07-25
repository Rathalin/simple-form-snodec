<script setup lang="ts">
import type { Comment } from '@/types/Comment'
import { computed } from 'vue'
import { getTimeFromDateString } from '@/util/date.util'

const { comment } = defineProps<{
  comment: Comment
}>()

const created_at = computed(() => getTimeFromDateString(comment.created_at))
</script>

<template>
  <div class="item">
    <div class="subinfo">
      <RouterLink to="#" class="email">{{ comment.user.email }}</RouterLink>
      <span> at </span>
      <span class="date">{{ created_at }}</span>
    </div>
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<style scoped lang="scss">
div.item {
  font-family: var(--font-second);
  display: flex;
  flex-direction: column;
  gap: 0.2em;

  .content {
    font-size: 14px;
    line-height: 0.5rem;
  }
}

.subinfo {
  font-size: 13px;
  color: var(--c-text-second);
}
</style>
