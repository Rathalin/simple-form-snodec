<script setup lang="ts">
import type { Comment } from '@/types/Comment'
import { computed } from 'vue'
import { getDateTimeFromString } from '@/util/date.util'
import UserLink from './UserLink.vue'

const props = defineProps<{
  comment: Comment,
  threadOwner?: boolean,
}>()

const created_at = computed(() => getDateTimeFromString(props.comment.created_at))
const firstLetter = computed(() => props.comment.user.username.charAt(0).toLocaleUpperCase())

</script>

<template>
  <div class="item flex-row">
    <RouterLink :to="`/user/${comment.user.uuid}`">
      <div class="thumbnail" :style="{ 'background-color': comment.user.color_hex }">{{ firstLetter }}</div>
    </RouterLink>
    <div class="content-wrapper flex-col">
      <div class="subinfo">
        <UserLink :class="{ highlight: threadOwner }" :user="comment.user" />
        <span> at </span>
        <span class="date">{{ created_at }}</span>
      </div>
      <div class="content">{{ comment.content }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.highlight {
  background-color: var(--c-second-acc-1);
  color: var(--c-text-prime);
  border-radius: 1em;
  padding: 1px 6px;

  &:hover {
    color: var(--c-text-prime-acc-1);
  }
}

.item {
  gap: 1em;
}

.content-wrapper {
  gap: 0.2em;
}

.thumbnail {
  border-radius: 50%;
  line-height: 40px;
  width: 40px;
  font-size: 1.2em;
  text-align: center;
}

.content {
  font-size: 14px;
}

.subinfo {
  font-size: 13px;
  color: var(--c-text-second);
}
</style>
