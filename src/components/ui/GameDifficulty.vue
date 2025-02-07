<script setup lang="ts">
import { useSudokuStore, type Difficulty } from '@/stores/sudoku'
import RetroButton from '@/components/slots/RetroButton.vue'
import RetroSelect from '@/components/ui/RetroSelect.vue'
import EmojiText from '@/components/slots/EmojiText.vue'
import { storeToRefs } from 'pinia'

const store = useSudokuStore()
const { difficulties, selectedDifficulty } = storeToRefs(store)

const onDifficultyChange = (value: Difficulty): void => {
  store.setSelectedDifficulty(value)
}
const onStartGame = () => store.startGame()
const onResetGame = () => {
  console.info('reset!')
  store.resetGame()
}
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
// .game-difficulty { }
.game-difficulty--during-intro {
  & > * {
    margin-bottom: 0.5rem;
  }
}
.game-difficulty--during-game {
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-between;
  // gap: 0.4rem;
  width: 100%;
}
</style>
