<script setup lang="ts">
import { apiMockService } from '@/services/api.mock.service'
import type { Comment } from '@/types/Comment'
import type { Thread } from '@/types/Thread'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommentItem from '@/components/thread/CommentItem.vue'
import BackButton from '@/components/BackButton.vue'
import CommentInput from '@/components/thread/CommentInput.vue'
import CommentCounter from '@/components/thread/CommentCounter.vue'

const route = useRoute()
const thread = ref<Thread | null>(null)
const comments = ref<Comment[]>([])

onMounted(async () => {
  const threadUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  thread.value = await apiMockService.getThreadByUUID(threadUuid)
  comments.value = await apiMockService.getCommentsByThreadUuid(threadUuid)
})
</script>

<template>
  <main class="container">
    <h1 class="flex-row gap-1">
      <div class="heading-text">{{ thread?.title }}</div>
      <BackButton :route-to="thread == null ? '#' : `/topic/${thread.topic.uuid}`"
        :label="thread == null ? '' : thread.topic.title" />
      <BackButton route-to="/" label="All topics" />
    </h1>
    <CommentCounter :comments="comments" />
    <div class="comment-input-wrapper">
      <CommentInput placeholder="Add comment" />
    </div>
    <div class="comments">
      <CommentItem v-for="comment in comments" :comment="comment"
        :thread-owner="thread?.user.uuid === comment.user.uuid" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.comment-input-wrapper {
  margin-top: 1em;
}

.comments {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
