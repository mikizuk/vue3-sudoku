<script setup lang="ts">
import { useSudokuStore, type Difficulty } from '@/stores/sudoku'
import RetroButton from '@/components/slots/RetroButton.vue'
import RetroSelect from '@/components/ui/RetroSelect.vue'
import EmojiText from '@/components/slots/EmojiText.vue'

const store = useSudokuStore()

const onDifficultyChange = (value: Difficulty): void => {
  store.setDifficulty(value)
}
const onStartGame = () => {
  store.startGame()
}
const onResetGame = () => {
  console.info('onResetGame')
}
</script>

<template>
  <div
    :class="{
      'game-difficulty game-difficulty--during-game': store.isGameInprogress,
      'game-difficulty game-difficulty--during-intro': !store.isGameInprogress,
    }"
  >
    <RetroSelect
      label="Difficulty"
      :selected="store.difficulty"
      :options="store.difficulties"
      @change="onDifficultyChange"
      :hideLabel="!store.isIntroShown"
    />

    <span v-if="!store.isGameInprogress" for="difficulty">And start the game!</span>
    <RetroButton v-if="!store.isGameInprogress" @click="onStartGame">Start</RetroButton>
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
