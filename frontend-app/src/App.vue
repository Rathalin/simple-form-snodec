<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <button class="round" type="button">Home</button>
      </RouterLink>
      <RouterLink to="/registered-users">
        <button class="round" type="button">Registered Users</button>
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
}

nav {
  padding: 0.5em;
  box-shadow: var(--shadow-prime);
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  background-color : var(--c-back-acc-1);

  a {
    &:first-of-type {
      border-left: none;
    }

    &:not(.router-link-exact-active) button {
      background-color: transparent;
      color: var(--c-text-prime);
    }
  }
}
</style>
