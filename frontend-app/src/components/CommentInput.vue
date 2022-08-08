<script setup lang="ts">
const props = defineProps<{
  placeholder: string
}>()
</script>

<template>
  <div class="input-wrapper">
    <input :placeholder="props.placeholder" type="text">
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
  border-radius: 0;
  font-size: 11pt;
  padding: 0.5rem;

  &:hover,
  &:focus {
    border-color: var(--c-second-acc-1);
  }
}
</style>
