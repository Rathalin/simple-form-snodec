<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import UserThumbnail from './UserThumbnail.vue'

const authStore = useAuthStore()

async function logout() {
  await authStore.demoLogout()
}
</script>

<template>
  <template v-if="authStore.user != null">
    <RouterLink :to="`/user/${authStore.user.uuid}`">
      <div class="wrapper">
        <UserThumbnail :user="authStore.user" tabindex="1" />
        <div class="menu card flex-col no-hover" tabindex="1">
          <div>{{ authStore.user.username }}</div>
          <button class="round" @click="logout()">Logout</button>
        </div>
      </div>
    </RouterLink>
  </template>
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
  align-items: center;
  gap: 0.6em;
  right: 0;

  &>div {
    white-space: pre;
  }

  &::before,
  &::after {
    position: absolute;
    display: inline-block;
    content: "";
  }

  &::before {
    top: -20px;
    right: 9px;
    border: 10px solid transparent;
    border-bottom-color: var(--c-second-acc-2);
    z-index: 11;
  }

  &::after {
    top: -16px;
    right: 11px;
    border: 8px solid transparent;
    border-bottom-color: var(--c-second-acc-1);
    z-index: 12;
  }
}
</style>
