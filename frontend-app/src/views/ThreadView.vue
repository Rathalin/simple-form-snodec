<script setup lang="ts">
import { apiMockService } from '@/services/api.mock.service'
import type { Comment } from '@/types/Comment'
import type { Thread } from '@/types/Thread'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommentItem from '@/components/CommentItem.vue'
import BackButton from '../components/BackButton.vue'
import NoEntryMessage from '../components/NoEntryMessage.vue'

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
    <h1 class="flex-row gap-1em mg-b-05em">
      <div class="heading-text">{{ thread?.title }}</div>
      <BackButton :route-to="thread == null ? '#' : `/topic/${thread.topic.uuid}`"
        :label="thread == null ? 'ups' : thread.topic.title" />
      <BackButton route-to="/" label="All topics" />
    </h1>
    <div v-if="comments.length > 0" class="comments">
      <CommentItem v-for="comment in comments" :comment="comment" :thread-owner="thread?.user.uuid === comment.user.uuid" />
    </div>
    <NoEntryMessage v-else>Be the first to create a comment.</NoEntryMessage>
  </main>
</template>

<style scoped lang="scss">
.comments {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
