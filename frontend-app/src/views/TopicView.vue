<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from '@vue/reactivity'
import type { Thread } from '@/types/Thread'
import { apiMockService } from '@/services/api.mock.service'
import ThreadItem from '../components/ThreadItem.vue'
import { useRoute } from 'vue-router'
import type { Topic } from '@/types/Topic'
import BackButton from '../components/BackButton.vue'

const route = useRoute()
const topic = ref<Topic | null>(null)
const threads = ref<Thread[]>([])

onMounted(async () => {
  const topicUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  topic.value = await apiMockService.getTopicByUUID(topicUuid)
  threads.value = await apiMockService.getThreadsByTopicUUID(topicUuid)
})
</script>

<template>
  <main class="container">
    <h1 class="flex-row gap-1em mg-b-05em">
      <div class="heading-text">{{ topic?.title }}</div>
      <BackButton route-to="/" label="All topics" />
    </h1>
    <div class="threads">
      <ThreadItem v-for="thread in threads" :thread="thread" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.heading-text {
  line-height: 1.2em;
}

.threads {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>