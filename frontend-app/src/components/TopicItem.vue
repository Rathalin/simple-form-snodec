<script setup lang="ts">
import type { UserDTO } from '@/types/UserDTO';
import CreatedInfo from './CreatedInfo.vue'

const props = defineProps<{
  topic: {
    uuid: string
    title: string
    description: string
    created_at: string
    user: UserDTO
  }
}>()
</script>

<template>
  <RouterLink class="no-link card prime" :to="`/topic/${props.topic.uuid}`">
    <div class="item">
      <h2 class="title">{{ props.topic.title }}</h2>
      <div class="description">{{ props.topic.description }}</div>
      <CreatedInfo :user="props.topic.user" :created-at="props.topic.created_at" />
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.title {
  margin-block: 0;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}
</style>
