<script setup lang="ts">
import { apiMockService } from '@/services/api.mock.service'
import type { Comment } from '@/types/Comment'
import type { Thread } from '@/types/Thread'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommentItem from '@/components/CommentItem.vue'

const route = useRoute()
const thread = ref<Thread | null>(null)
const comments = ref<Comment[]>([])

onMounted(async () => {
  const threadUUID = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  thread.value = await apiMockService.getThreadByUUID(threadUUID)
  comments.value = await apiMockService.getCommentsByThreadUuid(threadUUID)
})
</script>

<template>
  <main class="container">
    <h1 class="flex-row gap-1em">
      <div class="heading">{{ thread?.title }}</div>
      <RouterLink :to="thread == null ? '#' : `/topic/${thread.topic.uuid}`">
        <button class="round">
          <i class="material-icons">arrow_back</i>
          <span>{{ thread?.topic.title }}</span>
        </button>
      </RouterLink>
    </h1>
    <div class="comments">
      <CommentItem v-for="comment in comments" :comment="comment" />
    </div>
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
