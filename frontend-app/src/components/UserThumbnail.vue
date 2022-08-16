<script setup lang="ts">
import type { User } from '@/types/User'
import { computed } from 'vue'

const props = defineProps<{
  user: User
}>()

const firstLetter = computed(() => props.user.username.charAt(0).toLocaleUpperCase())
</script>

<template>
  <RouterLink :to="`/user/${user.uuid}`">
    <div class="thumbnail" :style="{ 'background-color': user.color_hex }">{{ firstLetter }}</div>
  </RouterLink>
</template>

<style scoped lang="scss">
.thumbnail {
  border-radius: 50%;
  line-height: 40px;
  width: 40px;
  font-size: 1.2em;
  text-align: center;
}
</style>
