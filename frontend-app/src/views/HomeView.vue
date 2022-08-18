<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Topic } from '@/types/Topic'
import { apiMockService } from '@/services/api.mock.service'
import TopicItem from '@/components/TopicItem.vue'
import NoEntryMessage from '@/components/NoEntryMessage.vue'
import SingleInput from '@/components/SingleInput.vue'

const topics = ref<Topic[]>([])

onMounted(async () => {
  await loadTopics()
})

async function loadTopics(): Promise<void> {
  topics.value = await apiMockService.getTopics()
}

async function onCreateTopic(input: string): Promise<void> {
  // TODO: Create topic apiMockService.createTopic()

  await loadTopics()
}
</script>

<template>
  <main class="container">
    <h1 class="heading-text">Topics 🍴</h1>

    <SingleInput input-placeholder="Create a topic" button-label="Create" @submit-input="onCreateTopic" />

    <div v-if="topics.length > 0" class="topics">
      <TopicItem v-for="topic in topics" :topic="topic" />
    </div>
    <NoEntryMessage v-else>No topics yet? Be the first to create one!</NoEntryMessage>
  </main>
</template>

<style scoped lang="scss">
.topics {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
