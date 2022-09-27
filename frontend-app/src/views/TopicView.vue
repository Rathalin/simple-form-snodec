<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from '@vue/reactivity'
import { apiMockService } from '@/services/mock/api.mock.service'
import ThreadItem from '@/components/ThreadItem.vue'
import { useRoute } from 'vue-router'
import BackButton from '@/components/BackButton.vue'
import NoEntryMessage from '@/components/NoEntryMessage.vue'
import CreatedInfo from '../components/CreatedInfo.vue'
import { useAuthStore } from '@/stores/auth-store'
import SingleInput from '@/components/SingleInput.vue'
import type { GetTopicByUuidResponse } from '@/services/rest/topic-protocol'

const authStore = useAuthStore()
const route = useRoute()
const topic = ref<GetTopicByUuidResponse | null>(null)
let topicUuid = ''

onMounted(async () => {
  topicUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  topic.value = await apiMockService.getTopicByUuid(topicUuid)
})

async function loadTopic(): Promise<void> {
  topic.value = await apiMockService.getTopicByUuid(topicUuid)
}

async function onCreateThread(input: string): Promise<void> {
  if (authStore.user == null) {
    throw new Error(`Can't create a thread when 'user' of 'authStore' is null.`)
  }
  await apiMockService.createThread(input, topicUuid, authStore.user)
  await loadTopic()
}
</script>

<template>
  <h1 v-if="topic != null" class="heading flex-row gap-1">
    <div class="flex-col">
      <div class="heading-text">{{ topic.data.title }}</div>
      <div class="description">{{ topic.data.description }}</div>
      <CreatedInfo :user="topic.data.user" :created-at="topic.data.created_at" />
    </div>
    <div class="back-button">
      <BackButton route-to="/" label="All topics" />
    </div>
  </h1>
  <SingleInput input-placeholder="Create a thread" button-label="Create" @submit-input="onCreateThread" />
  <div v-if="topic != null && topic.data.threads.length > 0" class="threads">
    <ThreadItem v-for="thread in topic.data.threads" :thread="thread" />
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