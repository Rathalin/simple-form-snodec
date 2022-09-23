<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Topic } from '@/types/Topic'
import { apiMockService } from '@/services/api.mock.service'
import TopicItem from '@/components/TopicItem.vue'
import NoEntryMessage from '@/components/NoEntryMessage.vue'
import SingleInput from '@/components/SingleInput.vue'
import { useAuthStore } from '@/stores/auth-store'
import TopicInput from '../components/TopicInput.vue'

const authStore = useAuthStore()
const topics = ref<Topic[]>([])

onMounted(async () => {
  await loadTopics()
})

async function loadTopics(): Promise<void> {
  topics.value = await apiMockService.getTopics()
}

async function onCreateTopic(input1: string, input2: string): Promise<void> {
  if (authStore.user == null) {
    throw new Error(`Can't create a topic when 'user' of 'authStore' is null.`)
  }
  // TODO: Create topic with description
  apiMockService.createTopic(input1, input2, authStore.user)

  await loadTopics()
}
</script>

<template>
  <h1 class="heading-text">Topics 🍴</h1>
  <TopicInput input-placeholder="Create a topic" input-descplaceholder="Description" button-label="Create" @submit-input="onCreateTopic" />
  <div v-if="topics.length > 0" class="topics">
    <TopicItem v-for="topic in topics" :topic="topic" />
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
