<script setup lang="ts">
import EmojiText from '@/slots/EmojiText.vue';

</script>

<template>
  <footer class="footer">
    <a class="footer__link" href="https://github.com/mikizuk" target="_blank">
      <EmojiText>
        <template #emoji>🤓</template>
        <template #text>GitHub</template>
      </EmojiText>
    </a>
    <span class="footer__separator">|</span>
    <a class="footer__link" href="https://github.com/mikizuk/vue3-sudoku" target="_blank">
      <EmojiText>
        <template #emoji>💾</template>
        <template #text>Repository</template>
      </EmojiText>
    </a>
    <span class="footer__separator">|</span>
    <a class="footer__link" href="https://en.wikipedia.org/wiki/Sudoku" target="_blank">
      <EmojiText>
        <template #emoji>📜</template>
        <template #text>Game rules</template>
      </EmojiText>
    </a>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  margin: 0 auto;
  gap: 1rem;

  .footer__separator {
    color: var(--copy-secondary);
  }

  .footer__link {
    box-shadow: inset 0 0 0 0 var(--cta);
    color: var(--cta);
    padding: 0 .25rem;
    margin: 0 -.25rem;
    transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
  }

  .footer__link:hover {
    color: var(--background-primary);
    box-shadow: inset 200px 0 0 0 var(--cta);
  }
}
</style>