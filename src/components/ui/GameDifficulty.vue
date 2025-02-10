<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import RetroButton from '@/components/slots/RetroButton.vue'
import RetroSelect from '@/components/ui/RetroSelect.vue'
import EmojiText from '@/components/slots/EmojiText.vue'
import { storeToRefs } from 'pinia'
import type { Difficulty } from '@/types/sudokuTypes'

const store = useSudokuStore()
const { difficulties, selectedDifficulty } = storeToRefs(store)

const onDifficultyChange = (value: Difficulty): void => store.setSelectedDifficulty(value)
const onStartGame = () => store.startGame()
const onResetGame = () => store.resetGame()
</script>

<template>
  <div
    :class="{
      'game-difficulty game-difficulty--during-game': store.isGameOn,
      'game-difficulty game-difficulty--during-intro': !store.isGameOn,
    }"
  >
    <RetroSelect
      label="Difficulty"
      :selected="selectedDifficulty"
      :options="difficulties"
      @change="onDifficultyChange"
      :hideLabel="!store.isIntro"
    />

    <span v-if="!store.isGameOn" for="difficulty">And start the game!</span>
    <RetroButton v-if="!store.isGameOn" @click="onStartGame">Start</RetroButton>
    <RetroButton v-else @click="onResetGame">
      <EmojiText>
        <template #text>Reset game</template>
      </EmojiText>
    </RetroButton>
  </div>
</template>

<style lang="scss" scoped>
.game-difficulty--during-intro {
  & > * {
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
  }

  @media (min-width: 769px) {
    padding-inline: 3rem;
    gap: 1rem;
    display: grid;
    font-size: 1rem;
  }
}
.game-difficulty--during-game {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
