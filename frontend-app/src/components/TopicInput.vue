<script setup lang="ts">
    import { ref } from 'vue'

    
    
    const props = defineProps<{
      inputLabel?: string
      inputPlaceholder?: string
      inputDescplaceholder?: string
      buttonLabel: string
    }>()
    
    const emits = defineEmits<{
      (e: 'submit-input', input1: string, input2: string): void
      (e: 'submit-desc', input: string): void
    }>()
    
    const inputText = ref('')
    const inputDesc = ref('')
    const inputFocused = ref(false)
    
    function submitInput(): void {
      emits('submit-input', inputText.value, inputDesc.value)
      inputText.value = ''
      inputDesc.value = ''
    }
    </script>
    
    <template>
      <div class="input-wrapper flex-col">
        <label v-if="props.inputLabel" for="new-topic">{{ props.inputLabel }}</label>
        <div class="flex-row">
          <input v-model="inputText" @focus="inputFocused = true" @blur="inputFocused = false"
            :placeholder="props.inputPlaceholder" type="text" name="new-topic" id="new-topic" autocomplete="off"
            class="flex-grow"/>
            <input v-if="inputFocused || inputText" v-model="inputDesc" @focus="inputFocused = true" @blur="inputFocused = false" @keydown.enter="submitInput"
            :placeholder="props.inputDescplaceholder" type="text" name="topic-desc" id="topic-desc" autocomplete="off"
            class="flex-grow"/>
          <button v-if="inputFocused || inputText && inputDesc" :disabled="inputText.length === 0" @click="submitInput">
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
    