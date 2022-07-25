<script setup lang="ts">

</script>

<template>
  <main class="container">
    <h1>About</h1>
    <article>
      <h2>Simple Form SNode.C</h2>
      <p>
        The final submission of lecture <em>Network and Distributed Systems</em>. 
        The backend was developed with <a class="link" href="https://github.com/VolkerChristian/snode.c">SNode.C</a>,
        the frontend with <a class="link" href="https://vuejs.org/">Vue 3</a>.
      </p>
    </article>
    <article>
      <h2>Team</h2>
      <p>
        <ul>
          <li>Daniel Flockert</li>
          <li>Rita Hainzl</li>
          <li>Sebastian Mayer</li>
          <li>Philip Toolan</li>
        </ul>
      </p>
    </article>
  </main>
</template>

<style scoped lang="scss">
a.link {
  text-decoration: underline;
  font-weight: normal;

  &:hover {
    color: var(--c-prime);
  }
}
</style>
