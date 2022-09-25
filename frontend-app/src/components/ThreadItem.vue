<script setup lang="ts">
import CreatedInfo from './CreatedInfo.vue'

const props = defineProps<{
  thread: {
    uuid: string
    title: string
    created_at: string
    user: {
      uuid: string
      username: string
    }
  }
}>()
</script>

<template>
  <RouterLink class="no-link card" :to="`/thread/${thread.uuid}`">
    <div class="item">
      <h2 class="title">{{ thread.title }}</h2>
      <CreatedInfo :user="props.thread.user" :created-at="props.thread.created_at" />
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.title {
  margin-block: 0;
}

div.item {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}
</style>
