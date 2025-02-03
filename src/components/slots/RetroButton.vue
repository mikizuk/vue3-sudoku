<template>
  <button class="retro-button">
    <slot />
  </button>
</template>

<style scoped>
.retro-button {
  color: var(--charcoal-gray);
  background-color: var(--soft-gray);
  border: 2px solid var(--charcoal-gray);
  padding: 5px 10px;
  margin: 5px;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Press Start 2P', serif;
}
</style>
