<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <!-- <div id="logo">🍰</div> -->
    <nav>
      <RouterLink to="/">
        <button class="round" type="button">Home</button>
      </RouterLink>
      <RouterLink to="/registered-users">
        <button class="round" type="button">Registered Users</button>
      </RouterLink>
      <RouterLink to="/about">
        <button class="round" type="button">About</button>
      </RouterLink>
      <RouterLink to="/emoji">
        <button class="round" type="button">🤔</button>
      </RouterLink>
    </nav>
  </header>

  <div>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: var(--shadow-prime);
  background-color: var(--c-back-acc-1);
}

#logo {
  justify-self: flex-start;
  padding-inline: 1em;
}

.colors {
  background-image: url('./assets/negative-space.jpg');
  background-size: cover;
  flex: 1;
  animation: gradient-spin 5s ease infinite;

}

nav {
  padding: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 100%;

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
