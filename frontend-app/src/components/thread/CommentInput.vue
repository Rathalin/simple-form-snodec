<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  placeholder: string
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
  <div class="input-wrapper">
    <input v-model="inputText" @focus="inputFocused = true" @blur="inputFocused = false" @keydown.enter="submitInput"
        :placeholder="props.placeholder" type="text"  name="new-comment" id="new-comment" autocomplete="off">
    <button v-if="inputFocused || inputText" :disabled="inputText.length === 0" @click="submitInput">
      {{ props.buttonLabel }}
    </button>
  </div>
</template>

<style scoped lang="scss">
input {
  width: 100%;
  background-color: transparent;
  outline: none;
  border-width: 0 0 2px 0;
  border-color: var(--c-second);
  border-style: solid;
  border-radius: var(--border-radius-none);
  font-size: 11pt;
  padding: 0.5rem;

  &:hover,
  &:focus {
    border-color: var(--c-second-acc-1);
  }
}

button {
  border: unset;
  box-shadow: var(--shadow-second);
  color: white;
  margin-top: 0.5m;
  float: right;
}
</style>
