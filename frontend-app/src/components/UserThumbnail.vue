<script setup lang="ts">
import type { UserDTO } from '@/types/UserDTO'
import { computed } from 'vue'

const props = defineProps<{
  user: UserDTO,
  disableLink?: boolean,
}>()

const firstLetter = computed(() => props.user.username?.charAt(0).toLocaleUpperCase() ?? '')
</script>

<template>
  <div class="thumbnail" :style="{ 'background-color': user.color_hex }">{{ firstLetter }}</div>
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
