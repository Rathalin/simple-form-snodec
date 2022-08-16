<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header class="flex-row wrap">
    <!-- <div id="logo">🍰</div> -->
    <nav>
      <RouterLink to="/" tabindex="-1">
        <button class="round" type="button">Home</button>
      </RouterLink>
      <RouterLink to="/registered-users" tabindex="-1">
        <button class="round" type="button">Registered Users</button>
      </RouterLink>
      <RouterLink to="/api-debug" tabindex="-1">
        <button class="round" type="button">API Debug</button>
      </RouterLink>
      <RouterLink to="/about" tabindex="-1">
        <button class="round" type="button">About</button>
      </RouterLink>
      <RouterLink to="/xd" tabindex="-1">
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
  box-shadow: var(--shadow-prime);
  background-color: var(--c-back-dim-1);
}

#logo {
  justify-self: flex-start;
  padding-inline: 1em;
}

.colors {
  background-image: url('./assets/negative-space.jpg');
  background-size: cover;
  animation: gradient-spin 5s ease infinite;

}

nav {
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
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

      &:hover {
        background-color: var(--c-back-acc-1);
      }
    }
  }

  @media screen and (min-width: 200px) {
    & {
      flex-direction: row;
    }
  }
}
</style>
