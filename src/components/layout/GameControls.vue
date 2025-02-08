<script setup lang="ts">
import GameDifficulty from '@/components/ui/GameDifficulty.vue'
import RetroButton from '../slots/RetroButton.vue'
import EmojiText from '@/components/slots/EmojiText.vue'
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'

const store = useSudokuStore()
const { isGamePaused, hintsRemaining, isGameFinished } = storeToRefs(store)

const onTogglePause = () => {
  store.togglePause()
}
const onHintClick = () => {
  store.useHint()
}
</script>
<template>
  <div class="controls">
    <GameDifficulty />
    <RetroButton v-if="!isGameFinished" @click="onTogglePause">
      <EmojiText v-if="isGamePaused">
        <template #emoji>▶️</template>
        <template #text>Resume</template>
      </EmojiText>
      <EmojiText v-else>
        <template #emoji>⏸</template>
        <template #text>Pause</template>
      </EmojiText>
    </RetroButton>
    <div v-if="isGameFinished" class="finish-info">
      <p>Game finished!!!</p>
    </div>
    <RetroButton @click="onHintClick" :disabled="isGamePaused">
      <EmojiText>
        <template #emoji>💡</template>
        <template #text>Hint ({{ hintsRemaining }})</template>
      </EmojiText>
    </RetroButton>
  </div>
</template>

<style lang="scss" scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.4rem;
}

.finish-info {
  display: flex;
  align-items: center;
}
</style>
