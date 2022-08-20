<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { ref } from 'vue'
import UserThumbnail from './UserThumbnail.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="wrapper">
    <UserThumbnail :user="authStore.user" tabindex="1" />
    <div class="menu card flex-col no-hover" tabindex="1">
      <div>{{ authStore.user.email }}</div>
      <div>{{ authStore.user.username }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  cursor: pointer;

  &:hover .menu {
    display: flex;
  }
}

.menu {
  display: none;
  background-color: var(--c-second-acc-1);
  position: absolute;
  z-index: 10;
  border-color: var(--c-second-acc-2);
  border-width: 1px;
  border-style: solid;
  transition-property: display;
  transition-duration: 300ms;
  padding: 0.6em;
  gap: 0.6em;

  &::before,
  &::after {
    position: absolute;
    display: inline-block;
    content: "";
  }

  &::before {
    top: -20px;
    left: 9px;
    border: 10px solid transparent;
    border-bottom-color: var(--c-second-acc-2);
    z-index: 11;
  }

  &::after {
    top: -16px;
    left: 11px;
    border: 8px solid transparent;
    border-bottom-color: var(--c-second-acc-1);
    z-index: 12;
  }
}
</style>
