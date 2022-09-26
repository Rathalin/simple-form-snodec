<script setup lang="ts">

const props = defineProps<{
  comments: {
    content: string
  }[]
}>()
</script>

<template>
  <div>
    <span v-if="props.comments.length === 1">1 comment</span>
    <span v-else>{{ props.comments.length }} comments</span>
  </div>
</template>

<style scoped lang="scss">
</style>
