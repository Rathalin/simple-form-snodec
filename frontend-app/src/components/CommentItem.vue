<script setup lang="ts">
import type { Comment } from '@/types/Comment'
import { computed } from 'vue'
import { getDateTimeFromString } from '@/util/date.util'
import UserLink from './UserLink.vue'

const props = defineProps<{
  comment: Comment
}>()

const created_at = computed(() => getDateTimeFromString(props.comment.created_at))
</script>

<template>
  <div class="item">
    <div class="subinfo">
      <UserLink :user="comment.user" />
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
