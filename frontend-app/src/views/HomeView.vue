<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TopicItem from '@/components/TopicItem.vue'
import NoEntryMessage from '@/components/NoEntryMessage.vue'
import SingleInput from '@/components/SingleInput.vue'
import { useAuthStore } from '@/stores/auth-store'

const authStore = useAuthStore()
const topics = ref<>([])

onMounted(async () => {
  await loadTopics()
})

async function loadTopics(): Promise<void> {
  topics.value = await apiMockService.getTopics()
}

async function onCreateTopic(input: string): Promise<void> {
  if (authStore.user == null) {
    throw new Error(`Can't create a topic when 'user' of 'authStore' is null.`)
  }
  // TODO: Create topic with description
  apiMockService.createTopic(input, '', authStore.user)

  await loadTopics()
}
</script>

<template>
  <h1 class="heading-text">Topics 🍴</h1>
  <SingleInput input-placeholder="Create a topic" button-label="Create" @submit-input="onCreateTopic" />
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
