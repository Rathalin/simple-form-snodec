<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { ref } from 'vue'
import UserThumbnail from './UserThumbnail.vue'

const authStore = useAuthStore()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

async function onMenuBlur(event: FocusEvent) {
  if (event.currentTarget == null) return;
  const currentTarget = event.currentTarget as HTMLElement
  // Give browser time to focus the next element
  requestAnimationFrame(() => {
    // Check if the new focused element is a child of the original container
    if (!currentTarget.contains(document.activeElement)) {
      closeMenu()
    }
  })
}

async function logout() {
  closeMenu()
  await authStore.demoLogout()
}

</script>

<template>
  <template v-if="authStore.user != null">
    <div class="wrapper" tabindex="0" @keydown.enter.self="toggleMenu" @blur="onMenuBlur">
      <UserThumbnail :user="authStore.user" @click.self="toggleMenu" />
      <ul v-if="menuOpen" class="menu card flex-col no-hover">
        <li class="no-click">
          <span>Signed in as</span>
          <strong>{{ authStore.user.username }}</strong>
        </li>
        <li>
          <RouterLink :to="`/user/${authStore.user.uuid}`" @click="closeMenu()">
            Profile
          </RouterLink>
        </li>
        <li @click="logout" @keydown.enter="logout">
          <span tabindex="0">Logout</span>
        </li>
      </ul>
    </div>
  </template>
</template>

<style scoped lang="scss">
.wrapper {
  cursor: pointer;
  z-index: 1;
}

.round-link {
  border-radius: 50%;
}

.menu {
  background-color: var(--c-second-acc-1);
  position: absolute;
  right: 0;
  z-index: 10;
  border-color: var(--c-second-acc-2);
  border-width: 1px;
  border-style: solid;
  transition-property: display;
  transition-duration: 300ms;
  margin-top: 5px;
  padding: 0;
  list-style: none;

  & li {
    padding: 0.2rem 0.6rem;
    display: flex;
    flex-direction: column;

    &:focus-visible {
      background-color: var(--c-second-acc-1);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--c-second-acc-2);
    }

    &:not(.no-click):is(:hover, :focus-within) {
      background-color: var(--c-second-acc-2);
    }
  }

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
