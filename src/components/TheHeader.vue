<script setup lang="ts">
import EmojiText from '@/slots/EmojiText.vue';

</script>

<template>
  <header class="header">

    <EmojiText>
      <template #emoji>🕹️</template>
      <template #strong>Sudoku</template>
    </EmojiText>
    <nav class="nav">
      <ul class="nav-list">
        <li>
          <EmojiText>
            <template #emoji>🙋</template>
            <template #text>Scoring explained</template>
          </EmojiText>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.nav {
  .nav-list {
    display: flex;
    gap: 0.7rem;
  }

  /* nav-list__item */
  // .nav-list__link {  }

  // .nav-list__link:hover {  }
}
</style>