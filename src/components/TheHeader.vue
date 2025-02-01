<script setup lang="ts">
import EmojiText from '@/slots/EmojiText.vue';

</script>

<template>

  <EmojiText>
    <template #emoji>🕹️</template>
    <template #strong>Sudoku</template>
  </EmojiText>
  <nav class="nav">
    <ul class="nav-list">
      <li>
        <EmojiText>
          <template #emoji>🙋</template>
          <!-- <template #text>Scoring explained</template> -->
          <template #text>Scoring</template>
        </EmojiText>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
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