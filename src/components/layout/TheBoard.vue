<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
import { GET_BOX_INDEX } from '@/constants/constants'

const store = useSudokuStore()
const showAnimation = ref(false)
const {
  solvedBoard,
  originalSolvedBoard,
  playBoard,
  isGamePaused,
  gameTime,
  selectedCell,
  completedSections,
  isGameFinished,
} = storeToRefs(store)

const onCellClick = (row: number, col: number): void => {
  store.setSelectedCell({ row, col })
}
watchEffect(() => {
  if (completedSections.value.length) {
    showAnimation.value = true
    setTimeout(() => {
      showAnimation.value = false
    }, 1000)
  }
})

const getCellClasses = computed(() => (row: number, col: number) => ({
  'board__cell--selected': row === selectedCell.value.row && col === selectedCell.value.col,
  'board__cell--correct':
    showAnimation.value &&
    playBoard.value[row][col] === solvedBoard.value[row][col] &&
    !originalSolvedBoard.value[row][col],
  'board__cell--error':
    playBoard.value[row][col] !== null &&
    playBoard.value[row][col] !== solvedBoard.value[row][col] &&
    !originalSolvedBoard.value[row][col],
  'board__cell--original': !!originalSolvedBoard.value[row][col],
  'board__cell--completed-row':
    showAnimation.value && completedSections.value.find((section) => section.type === 'row' && section.index === row),
  'board__cell--completed-col':
    showAnimation.value && completedSections.value.find((section) => section.type === 'col' && section.index === col),
  'board__cell--completed-box':
    showAnimation.value &&
    completedSections.value.find((section) => section.type === 'box' && section.index === GET_BOX_INDEX(row, col)),
  'board__cell--completed-all': isGameFinished.value,
}))

const isBoardBlurred = computed(() => isGamePaused.value || gameTime.value === 0)
</script>

<template>
  <table class="board" :class="{ 'board--blurred': isBoardBlurred, 'board--completed': isGameFinished }">
    <tr class="board__row" v-for="(row, rowIndex) in playBoard" :key="rowIndex">
      <td class="board__cell" v-for="(digit, cellIndex) in row" :key="cellIndex">
        <button
          class="board__button"
          @click="onCellClick(rowIndex, cellIndex)"
          :class="getCellClasses(rowIndex, cellIndex)"
        >
          {{ digit }}
        </button>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.board {
  background-color: var(--white);
  border: 2px solid var(--charcoal-gray);
  border-radius: 3px;

  width: 100%;
  /* max-width: 1200px; */

  .board__row {
    height: 30px;
    width: 30px;
    border: 1px solid;
    text-align: center;
  }
  .board__cell {
    /* aspect-ratio: 1/1; */
    height: 30px;
    width: 30px;
    border: 1px solid;
    text-align: center;
  }

  .board__button {
    color: var(--charcoal-gray);
    background-color: inherit;
    font-size: inherit;
    border: 0;
    height: 100%;
    width: 100%;
  }

  .board__cell:nth-child(3n) {
    border-right: 3px solid var(--charcoal-gray);
  }
  .board__row:nth-child(3n) .board__cell {
    border-bottom: 3px solid var(--charcoal-gray);
  }

  .board__cell--original {
    background-color: var(--soft-gray);
  }
  .board__cell--selected {
    border: 2px solid var(--royal-blue);
  }
  .board__cell--correct {
    background-color: var(--mint-green);
  }
  .board__cell--error {
    background-color: var(--crimson-red);
  }

  .board__cell--completed-all,
  .board__cell--completed-row,
  .board__cell--completed-col,
  .board__cell--completed-box {
    background-color: var(--mint-green);
    transition: background-color 1s ease-in-out;
  }

  /* transition: all 0.4s ease-out; */
}

.board--blurred {
  filter: blur(4px);
}
.board--completed {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
