<script setup lang="ts">
import EmojiText from '@/components/slots/EmojiText.vue'
import { useSudokuStore } from '@/stores/sudoku'

const store = useSudokuStore()

const onToggleModal = () => {
  store.toggleModal()
}
</script>

<template>
  <header class="header">
    <EmojiText>
      <template #emoji>🕹️</template>
      <template #strong>Sudoku</template>
    </EmojiText>
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-list__item">
          <EmojiText @click="onToggleModal">
            <template #emoji>🙋</template>
            <!-- <template #text>Scoring explained</template> -->
            <template #text>Scoring</template>
          </EmojiText>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  background-color: var(--soft-gray);

  display: flex;
  justify-content: space-between;

  padding-block: 4px;
  padding-inline: 6px;

  @media (min-width: 769px) {
    font-size: 1rem;
    padding-block: 20px;
    padding-inline: 20px;
  }
}

.nav-list {
  list-style: none;
}

.nav-list__item {
  box-shadow: inset 0 0 0 0 var(--sky-blue);
  color: var(--sky-blue);
  transition:
    color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.nav-list__item:hover {
  color: var(--golden-yellow);
  box-shadow: inset 200px 0 0 0 var(--sky-blue);
}
</style>
