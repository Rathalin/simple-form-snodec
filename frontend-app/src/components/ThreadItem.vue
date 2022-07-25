<script setup lang="ts">
import type { Thread } from '@/types/Thread'
import { getDateTimeFromString } from '@/util/date.util'
import { computed } from '@vue/reactivity';
import UserLink from './UserLink.vue';

const props = defineProps<{
  thread: Thread,
}>()

const created_at = computed(() => getDateTimeFromString(props.thread.created_at))
</script>

<template>
  <RouterLink class="no-link card" :to="`/thread/${thread.uuid}`">
    <div class="item">
      <h2 class="title">{{ thread.title }}</h2>
      <div class="subinfo">
        <UserLink :user="thread.user" />
        <span> at </span>
        <span class="date">{{ created_at }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
h2 {
  margin-block: 0;
}
div.item {
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

.subinfo {
  font-size: small;
  color: var(--c-text-second);
}
</style>
