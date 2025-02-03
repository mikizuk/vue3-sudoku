<script setup lang="ts">
import { useSudokuStore, type Difficulty } from '@/stores/sudoku'
import RetroButton from '@/components/slots/RetroButton.vue'

const store = useSudokuStore()

const onDifficultyChange = (event: Event) => {
  const newDifficulty = (event.target as HTMLSelectElement).value as Difficulty

  if (newDifficulty) {
    store.setDifficulty(newDifficulty)
  }
}
const onStartGame = () => {
  // store.hideIntro()
  store.startGame()
}
</script>

<template>
  <label v-if="!store.isGameInprogress" for="difficulty">Set difficulty:</label>
  <select aria-label="Difficulty:" class="select" id="difficulty" v-model="store.difficulty" @change="onDifficultyChange($event)">
    <option v-for="difficulty in store.difficulties" :key="difficulty" :value="difficulty">
      {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
    </option>
  </select>

  <span v-if="!store.isGameInprogress" for="difficulty">And start the game!</span>
  <RetroButton v-if="!store.isGameInprogress" @click="onStartGame">Start</RetroButton>
  <RetroButton v-else @click="store.hideIntro()">Reset game</RetroButton>
</template>

<style scoped>
.select,
.select > option {
  background-color: var(--soft-gray);
  border: 2px solid var(--charcoal-gray);
  padding: 5px 10px;
  margin: 5px;
  border-radius: 3px;
  font-family: 'Press Start 2P', serif;
  font-weight: 200;
  font-style: normal;
  cursor: pointer;
  font-size: 0.7rem;
  width: fit-content;

  option {
    background-color: var(--sky-blue);
  }
}
</style>
