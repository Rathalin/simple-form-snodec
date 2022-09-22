<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  inputLabel?: string
  inputPlaceholder?: string
  buttonLabel: string
}>()

const emits = defineEmits<{
  (e: 'submit-input', input: string): void
}>()

const inputText = ref('')
const inputFocused = ref(false)

function submitInput(): void {
  emits('submit-input', inputText.value)
  inputText.value = ''
}
</script>

<template>
  <div class="input-wrapper flex-col">
    <label v-if="props.inputLabel" for="new-topic">{{ props.inputLabel }}</label>
    <div class="flex-row">
      <input v-model="inputText" @focus="inputFocused = true" @blur="inputFocused = false" @keydown.enter="submitInput"
        :placeholder="props.inputPlaceholder" type="text" name="new-topic" id="new-topic" autocomplete="off"
        class="flex-grow">
      <button v-if="inputFocused || inputText" :disabled="inputText.length === 0" @click="submitInput">
        {{ props.buttonLabel }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  margin-top: 1em;

  & > div {
    gap: 0.4rem;
  }
}

input,
button {
  box-shadow: var(--shadow-second);
}
</style>
