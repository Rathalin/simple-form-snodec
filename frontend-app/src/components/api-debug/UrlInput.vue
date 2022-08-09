<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  apiUrl: string
  inputPlaceholder: string
  buttonLabel: string
}>()

const inputText = ref('')

const emits = defineEmits<{
  (e: 'request', url: string): void
}>()

function emitInput() {
  emits('request', props.apiUrl + inputText.value)
}
</script>

<template>
  <div class="flex-row row gap-1">
    <div>{{ props.apiUrl }}</div>
    <input v-model="inputText" @keydown.enter="emitInput" type="text" :placeholder="inputPlaceholder"
      class="flex-grow">
    <button @click="emitInput">{{ props.buttonLabel}}</button>
  </div>
</template>

<style scoped lang="scss">
</style>
