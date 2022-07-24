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
  <div class="item card no-hover">
    <h2 class="content">{{ comment.content }}</h2>
    <div class="subinfo">
      <RouterLink to="#" class="email">{{ comment.user.email }}</RouterLink>
      <span> at </span>
      <span class="date">{{ created_at }}</span>
    </div>
  </div>
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
