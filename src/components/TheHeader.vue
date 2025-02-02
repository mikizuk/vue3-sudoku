<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
const store = useSudokuStore()
import EmojiText from '@/slots/EmojiText.vue'
</script>

<template>
  <EmojiText>
    <template #emoji>🕹️</template>
    <template #strong>Sudoku</template>
  </EmojiText>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-list__item">
        <EmojiText @click="store.toggleModal()">
          <template #emoji>🙋</template>
          <!-- <template #text>Scoring explained</template> -->
          <template #text>Scoring</template>
        </EmojiText>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav-list {
  display: flex;
  gap: 0.7rem;
}

.nav-list__item {
  box-shadow: inset 0 0 0 0 var(--cta);
  color: var(--cta);
  padding: 0 0.25rem;
  margin: 0 -0.25rem;
  transition:
    color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.nav-list__item:hover {
  color: var(--background-primary);
  box-shadow: inset 200px 0 0 0 var(--cta);
}
</style>
