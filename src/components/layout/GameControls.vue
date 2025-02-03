<script setup lang="ts">
import GameDifficulty from '@/components/ui/GameDifficulty.vue'
import RetroButton from '../slots/RetroButton.vue'
import EmojiText from '@/components/slots/EmojiText.vue'

const onTogglePause = () => {
  console.info('onTogglePause')
}
const onHintClick = () => {
  console.info('onHintClick')
}
</script>
<template>
  <div class="game-controls">
    <GameDifficulty />
    <RetroButton @click="onTogglePause">
      <EmojiText>
        <template #emoji>⏸</template>
        <!-- <template #emoji>▶️</template> -->
        <template #text>Pause</template>
        <!-- <template #text>Resume</template> -->
      </EmojiText>
    </RetroButton>
    <RetroButton @click="onHintClick">
      <EmojiText>
        <template #emoji>💡</template>
        <template #text>Hint (10)</template>
      </EmojiText>
    </RetroButton>
  </div>
</template>

<style scoped>
.game-controls {
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.4rem;
}
</style>
