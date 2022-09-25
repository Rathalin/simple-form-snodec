<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from '@vue/reactivity'
import type { Thread } from '@/types/Thread'
import { apiMockService } from '@/services/mock/api.mock.service'
import ThreadItem from '@/components/ThreadItem.vue'
import { useRoute } from 'vue-router'
import type { Topic } from '@/types/Topic'
import BackButton from '@/components/BackButton.vue'
import NoEntryMessage from '@/components/NoEntryMessage.vue'
import CreatedInfo from '../components/CreatedInfo.vue'
import { useAuthStore } from '@/stores/auth-store'
import SingleInput from '@/components/SingleInput.vue'

const authStore = useAuthStore()
const route = useRoute()
const topic = ref<Topic | null>(null)
const threads = ref<Thread[]>([])

onMounted(async () => {
  const topicUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  topic.value = await apiMockService.getTopicByUUID(topicUuid)
  threads.value = await apiMockService.getThreadsByTopicUUID(topicUuid)
})

async function loadThreads(): Promise<void> {
  const topicUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  threads.value = await apiMockService.getThreadsByTopicUUID(topicUuid)
}

async function onCreateThread(input: string): Promise<void> {
  if (authStore.user == null) {
    throw new Error(`Can't create a thread when 'user' of 'authStore' is null.`)
  }
  const topicUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  await apiMockService.createThread(input, topicUuid, authStore.user)

  await loadThreads()
}
</script>

<template>
  <h1 v-if="topic != null" class="heading flex-row gap-1">
    <div class="flex-col">
      <div class="heading-text">{{ topic.title }}</div>
      <div class="description">{{ topic.description }}</div>
      <CreatedInfo :user="topic.user" :created-at="topic.created_at" />
    </div>
    <div class="back-button">
      <BackButton route-to="/" label="All topics" />
    </div>
  </h1>
  <SingleInput input-placeholder="Create a thread" button-label="Create" @submit-input="onCreateThread" />
  <div v-if="threads.length > 0" class="threads">
    <ThreadItem v-for="thread in threads" :thread="thread" />
  </div>
  <NoEntryMessage v-else>Be the first to create a thread.</NoEntryMessage>
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

.description {
  font-size: 1rem;
  margin-block: 0;
}

.threads {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>