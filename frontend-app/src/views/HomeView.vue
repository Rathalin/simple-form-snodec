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
    <h1>
      <div class="heading">Topics</div>
    </h1>
    <div class="topics">
      <TopicItem v-for="topic in topics" :topic="topic" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.topics {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

</style>
