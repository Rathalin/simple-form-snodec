<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from '@vue/reactivity'
import type { Thread } from '@/types/Thread'
import { mockApiService } from '@/services/mock-api.service'
import ThreadItem from '../components/ThreadItem.vue'
import { useRoute } from 'vue-router'
import type { Topic } from '@/types/Topic'

const route = useRoute()
const topic = ref<Topic | null>(null)
const threads = ref<Thread[]>([])

onMounted(async () => {
  const topicUuid = Array.isArray(route.params.uuid) ? route.params.uuid[0] : route.params.uuid
  topic.value = await mockApiService.getTopicByUUID(topicUuid)
  threads.value = await mockApiService.getThreadsByTopicUUID(topicUuid)
})
</script>

<template>
  <main class="container">
    <h1 class="flex-row gap-1em">
      <div class="heading">{{ topic?.title }}</div>
      <RouterLink to="/">
        <button class="round">
          <i class="material-icons">arrow_back</i>
          <span>All topics</span>
        </button>
      </RouterLink>
    </h1>
    <div class="threads">
      <ThreadItem v-for="thread in threads" :thread="thread" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.threads {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>