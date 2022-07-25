<script setup lang="ts">

</script>

<template>
  <main class="container flex-row">
    <div class="flex-col">
      <div class="emoji">
        <div class="hat">👒</div>
        <div class="head">😎</div>
        <div class="body">🧜</div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main.flex-row {
  justify-content: center;
}

.emoji {
  padding-block-start: 5em;

  .hat {
    transform: rotate(315deg);
    font-size: 8em;
    margin-left: 10px;
  }

  .head {
    font-size: 10em;
    margin-top: -60px;
    transform: rotate(0deg);
    z-index: -1;
  }

  .body {
    font-size: 15em;
    margin-top: -102px;
    margin-left: -61px;
    z-index: -2;
  }
}
</style>
