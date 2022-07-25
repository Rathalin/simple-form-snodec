<script setup lang="ts">
import type { Topic } from '@/types/Topic'
import { computed } from '@vue/reactivity'
import { getDateTimeFromString } from '@/util/date.util'
import UserLink from './UserLink.vue'

const props = defineProps<{
  topic: Topic
}>()

const created_at = computed(() => getDateTimeFromString(props.topic.created_at))
</script>

<template>
  <RouterLink class="no-link card prime" :to="`/topic/${topic.uuid}`">
    <div class="item">
      <h2 class="title">{{ topic.title }}</h2>
      <div class="description">{{ topic.description }}</div>
      <div class="subinfo">
        <UserLink :user="topic.user" />
        <span> at </span>
        <span class="date">{{ created_at }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

.subinfo {
  font-size: small;
  color: var(--c-text-second);
}
</style>
