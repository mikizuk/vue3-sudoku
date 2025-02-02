<script setup lang="ts">
import EmojiText from '@/slots/EmojiText.vue'
</script>

<template>
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
      <template #text>Repo</template>
    </EmojiText>
  </a>
  <span class="footer__separator">|</span>
  <a class="footer__link" href="https://en.wikipedia.org/wiki/Sudoku" target="_blank">
    <EmojiText>
      <template #emoji>📜</template>
      <template #text>Rules</template>
    </EmojiText>
  </a>
</template>

<style lang="scss" scoped>
.footer__separator {
  color: var(--copy-secondary);
  align-self: center;
}

.footer__link {
  box-shadow: inset 0 0 0 0 var(--cta);
  color: var(--cta);
  padding: 0 0.25rem;
  margin: 0 -0.25rem;
  transition:
    color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.footer__link:hover {
  color: var(--background-primary);
  box-shadow: inset 200px 0 0 0 var(--cta);
}
</style>
