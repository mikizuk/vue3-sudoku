<script setup lang="ts">
import { useSudokuStore, type Difficulty } from '@/stores/sudoku'
import RetroButton from '@/components/slots/RetroButton.vue'
import RetroSelect from '@/components/ui/RetroSelect.vue'

const store = useSudokuStore()

const onDifficultyChange = (value: Difficulty): void => {
  store.setDifficulty(value)
}
const onStartGame = () => {
  store.startGame()
}
</script>

<template>
  <RetroSelect
    label="Difficulty"
    :selected="store.difficulty"
    :options="store.difficulties"
    @change="onDifficultyChange"
    :hideLabel="!store.isIntroShown"
  />

  <span v-if="!store.isGameInprogress" for="difficulty">And start the game!</span>
  <RetroButton v-if="!store.isGameInprogress" @click="onStartGame">Start</RetroButton>
  <RetroButton v-else @click="store.hideIntro()">Reset game</RetroButton>
</template>
