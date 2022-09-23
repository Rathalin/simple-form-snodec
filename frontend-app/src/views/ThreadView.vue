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
import CreatedInfo from '../components/CreatedInfo.vue'
import { useAuthStore } from '@/stores/auth-store'

const authStore = useAuthStore()
const route = useRoute()
const thread = ref<Thread | null>(null)
const comments = ref<Comment[]>([])

onMounted(async () => {
  const threadUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  thread.value = await apiMockService.getThreadByUUID(threadUuid)
  comments.value = await apiMockService.getCommentsByThreadUuid(threadUuid)
})

async function loadComments(): Promise<void> {
  const threadUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  comments.value = await apiMockService.getCommentsByThreadUuid(threadUuid)
}

async function onCreateComment(input: string): Promise<void> {
  if (authStore.user == null) {
    throw new Error(`Can't create a comment when 'user' of 'authStore' is null.`)
  }
  const threadUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  apiMockService.createComment(input, threadUuid, authStore.user)

  await loadComments()
}
</script>

<template>
  <h1 v-if="thread != null" class="heading flex-row gap-1">
    <div class="flex-col">
      <div class="heading-text">{{ thread.title }}</div>
      <CreatedInfo :user="thread.user" :created-at="thread.created_at" />
    </div>
    <div class="back-button">
      <BackButton :route-to="thread == null ? '#' : `/topic/${thread.topic.uuid}`"
        :label="thread == null ? '' : thread.topic.title" />
    </div>
    <div class="back-button">
      <BackButton route-to="/" label="All topics" />
    </div>
  </h1>
  <CommentCounter :comments="comments" />
  <div class="comment-input-wrapper">
    <CommentInput placeholder="Add comment" buttonLabel="Post" @submit-input="onCreateComment"/>
  </div>
  <div class="comments">
    <CommentItem v-for="comment in comments" :comment="comment"
      :thread-owner="thread?.user.uuid === comment.user.uuid" />
  </div>
</template>

<style scoped lang="scss">
.heading {
  margin-block: 1em;
  align-items: flex-start;

  & .back-button {
    margin-top: 0.2em;
  }
}

.heading-text {
  line-height: 1em;
}

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
