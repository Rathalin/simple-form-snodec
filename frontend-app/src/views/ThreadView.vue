<script setup lang="ts">
import { apiMockService } from '@/services/mock/api.mock.service'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommentItem from '@/components/thread/CommentItem.vue'
import BackButton from '@/components/BackButton.vue'
import CommentInput from '@/components/thread/CommentInput.vue'
import CommentCounter from '@/components/thread/CommentCounter.vue'
import CreatedInfo from '../components/CreatedInfo.vue'
import { useAuthStore } from '@/stores/auth-store'
import type { GetThreadByUuidResponse } from '@/services/api/thread-protocol'

const authStore = useAuthStore()
const route = useRoute()
const thread = ref<GetThreadByUuidResponse | null>(null)
let threadUuid = ''

onMounted(async () => {
  threadUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  thread.value = await apiMockService.getThreadByUuid(threadUuid)
})

async function loadThread(): Promise<void> {
  thread.value = await apiMockService.getThreadByUuid(threadUuid)
}

async function onCreateComment(input: string): Promise<void> {
  if (authStore.user == null) {
    throw new Error(`Can't create a comment when 'user' of 'authStore' is null.`)
  }
  const threadUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  await apiMockService.createComment(input, threadUuid, authStore.user)

  await loadThread()
}
</script>

<template>
  <template v-if="thread != null">
    <h1 class="heading flex-row gap-1">
      <div class="flex-col">
        <div class="heading-text">{{ thread.data.title }}</div>
        <CreatedInfo :user="thread.data.user" :created-at="thread.data.created_at" />
      </div>
      <div class="back-button">
        <BackButton :route-to="thread == null ? '#' : `/topic/${thread.data.topic.uuid}`"
          :label="thread == null ? '' : thread.data.topic.title" />
      </div>
      <div class="back-button">
        <BackButton route-to="/" label="All topics" />
      </div>
    </h1>
    <CommentCounter :comments="thread.data.comments" />
    <div class="comment-input-wrapper">
      <CommentInput placeholder="Add comment" buttonLabel="Post" @submit-input="onCreateComment" />
    </div>
    <div class="comments">
      <CommentItem v-for="comment in thread.data.comments" :comment="comment"
        :thread-owner="thread.data.user.uuid === comment.user.uuid" />
    </div>
  </template>
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
