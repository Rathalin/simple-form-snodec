<script setup lang="ts">
import { computed } from 'vue'
import { getDateTimeFromString } from '@/util/date.util'
import UserLink from '@/components/UserLink.vue'
import UserThumbnail from '@/components/UserThumbnail.vue'
import type { UserDTO } from '@/types/UserDTO';

const props = defineProps<{
  comment: {
    uuid: string
    content: string
    created_at: string
    user: UserDTO
  }
  threadOwner?: boolean
}>()

const created_at = computed(() => getDateTimeFromString(props.comment.created_at))
</script>

<template>
  <div class="item flex-row no-wrap">
    <UserThumbnail :user="comment.user" />
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

.content {
  font-size: 14px;
}

.subinfo {
  font-size: 13px;
  color: var(--c-text-second);
}
</style>
