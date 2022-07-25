<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
defineProps<{
  routeTo?: string
  label?: string
}>()


</script>

<template>
  <template v-if="routeTo">
    <RouterLink :to="routeTo">
      <button class="round">
        <i class="material-icons">arrow_back</i>
        <span v-if="label">{{ label }}</span>
      </button>
    </RouterLink>
  </template>
  <template v-else>
    <button class="round" @click="router.go(-1)">
      <i class="material-icons">arrow_back</i>
      <span>{{ label }}</span>
    </button>
  </template>
</template>