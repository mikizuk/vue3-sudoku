<script setup lang="ts">
import EmojiText from '@/components/slots/EmojiText.vue'

const version: string = __APP_VERSION__
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
    <span class="footer__separator">|</span>
    <span class="app-version" title="App version">{{ version }}</span>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: sticky;
  bottom: 0;
  background-color: var(--charcoal-gray);
  // background-color: var(--charcoal-gray);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.5rem;

  // padding-top: 6px;
  // padding-block: 4px;
  // padding-inline: 2px;
  gap: 0.5rem;

  @media (min-width: 769px) {
    // padding-block: 12px;
    // padding-inline: 12px;
    // gap: 1rem;
  }

  @media (min-width: 1280px) {
    // padding-block: 20px;
    // padding-inline: 20px;
    // gap: 2rem;
  }
}
.footer__separator {
  color: var(--soft-gray);
  align-self: center;
}

.footer__link {
  box-shadow: inset 0 0 0 0 var(--royal-blue);
  color: var(--mint-green);
  padding: 0 0.25rem;
  margin: 0 -0.25rem;
  transition:
    color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
}

.footer__link:hover {
  color: var(--golden-yellow);
  box-shadow: inset 200px 0 0 0 var(--royal-blue);
}

.app-version {
  color: var(--golden-yellow);
}
</style>
