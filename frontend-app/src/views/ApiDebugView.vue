<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import UrlInput from '@/components/api-debug/UrlInput.vue'

const API_URL = 'http://localhost:8080/'

const response = reactive<{
  url: string
  data: string | null
  error: Error | null
}>({
  url: '',
  data: null,
  error: null
})

async function onUrlInput(url: string) {
  response.data = null
  response.error = null
  try {
    const res = await fetch(url)
    response.url = url
    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`)
    }
    const resContentType = res.headers.get('Content-Type')
    if (resContentType !== 'application/json') {
      throw new Error(`'Content-Type' of response was '${resContentType ?? 'null'}' instead of 'application/json'`)
    }
    response.data = await res.json()
  } catch (error) {
    if (error instanceof Error) {
      response.error = error
    }
  }
}
</script>

<template>
  <h1>API Debug</h1>
  <UrlInput :api-url="API_URL" input-placeholder="api/users" button-label="GET" v-on:request="onUrlInput" />
  <h2>{{ response.url ? `Response for '${response.url}':` : 'Response:' }}</h2>
  <div class="response card no-hover">
    <div v-if="response.data">{{ response.data }}</div>
    <div v-if="response.error" class="error flex-col">
      <div>{{ response.error.name }}</div>
      <div>{{ response.error.message }}</div>
      <div>{{ response.error.stack }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.response {
  font-family: monospace;
  white-space: pre-wrap;
}

.error {
  color: var(--c-text-error)
}

.card {
  padding: 1em;
  min-height: 10em;
}
</style>
