<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Topic } from '@/types/Topic'
import { mockApiService } from '@/services/mock-api.service'
import TopicItem from '@/components/TopicItem.vue'

const topics = ref<Topic[]>([])

onMounted(async () => {
  topics.value = await mockApiService.getTopics()
})
</script>

<template>
  <main class="container">
    <TopicItem v-for="topic in topics" :topic="topic" />
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
