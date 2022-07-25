<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Topic } from '@/types/Topic'
import { apiMockService } from '@/services/api.mock.service'
import TopicItem from '@/components/TopicItem.vue'

const topics = ref<Topic[]>([])

onMounted(async () => {
  topics.value = await apiMockService.getTopics()
})
</script>

<template>
  <main class="container">
    <h1 class="mg-b-05em">
      <div class="heading-text">Topics 🍴</div>
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
