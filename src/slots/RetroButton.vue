<script setup lang="ts">

</script>
<template>
  <button class="retro-button">
    <slot />
  </button>
</template>

<style scoped>
.retro-button {
  /* color: #fff; */
  /* background: linear-gradient(315deg, #42d392 25%, #647eff); */
  border: 2px solid var(--copy-primary);
  padding: 5px 10px;
  margin: 5px;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Press Start 2P', serif;
}
</style>