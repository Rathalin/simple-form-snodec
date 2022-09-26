<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TopicItem from '@/components/TopicItem.vue'
import NoEntryMessage from '@/components/NoEntryMessage.vue'
import { useAuthStore } from '@/stores/auth-store'
import TopicInput from '../components/TopicInput.vue'
import type { GetTopicsResponse } from '@/services/api/topic-protocol'
import { apiMockService } from '@/services/mock/api.mock.service'

const authStore = useAuthStore()
const topics = ref<GetTopicsResponse | null>(null)

onMounted(async () => {
  await loadTopics()
})

async function loadTopics(): Promise<void> {
  console.log('begin loadTopics')
  const response = await apiMockService.getTopics()
  console.table(response.data)
  topics.value = response
  console.log(topics.value.data)
}

async function onCreateTopic(input1: string, input2: string): Promise<void> {
  if (authStore.user == null) {
    throw new Error(`Can't create a topic when 'user' of 'authStore' is null.`)
  }
  await apiMockService.createTopic(input1, input2, authStore.user)

  await loadTopics()
}
</script>

<template>
  <h1 class="heading-text">Topics 🍴</h1>
  <TopicInput input-placeholder="Create a topic" input-descplaceholder="Description" button-label="Create"
    @submit-input="onCreateTopic" />
  <div v-if="topics != null" class="topics">
    <TopicItem v-for="topic in topics.data" :topic="topic" />
  </div>
  <NoEntryMessage v-else>No topics yet? Be the first to create one!</NoEntryMessage>
</template>

<style scoped lang="scss">
.topics {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
