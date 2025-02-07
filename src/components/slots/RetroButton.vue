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
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}
.retro-button:disabled {
  color: var(--soft-gray);
  background-color: var(--light-gray);
  border: 2px solid transparent;
}
.retro-button:active {
  outline: 2px solid var(--royal-blue);
}
@media (hover: hover) {
  .retro-button:hover {
    color: var(--golden-yellow);
    background-color: var(--sky-blue);
  }
}
</style>
