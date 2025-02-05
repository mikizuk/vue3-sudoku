<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
const store = useSudokuStore()

const { solvedBoard, originalSolvedBoard, playBoard, isGamePaused, gameTime, selectedCell } = storeToRefs(store) // canSelectCell

const onCellClick = (row: number, col: number): void => {
  store.setSelectedCell({ row, col })
}
</script>

<template>
  <table class="board" :class="{ 'board--blurred': isGamePaused || gameTime === 0 }">
    <tr class="board__row" v-for="(row, rowIndex) in playBoard" :key="rowIndex">
      <td class="board__cell" v-for="(digit, cellIndex) in row" :key="cellIndex">
        <button
          class="board__button"
          @click="onCellClick(rowIndex, cellIndex)"
          :class="{
            'board__cell--selected': rowIndex === selectedCell?.row && cellIndex === selectedCell?.col,
            'board__cell--correct':
              playBoard[rowIndex][cellIndex] === solvedBoard[rowIndex][cellIndex] &&
              !originalSolvedBoard[rowIndex][cellIndex],
            'board__cell--error':
              playBoard[rowIndex][cellIndex] !== null &&
              playBoard[rowIndex][cellIndex] !== solvedBoard[rowIndex][cellIndex] &&
              !originalSolvedBoard[rowIndex][cellIndex],
            'board__cell--original': originalSolvedBoard[rowIndex][cellIndex],
          }"
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
    border-right: solid;
  }
  .board__row:nth-child(3n) .board__cell {
    border-bottom: solid;
  }
  /* Delete below later */
  /* .board__row:nth-of-type(1) > .board__cell:nth-of-type(1) {
    background-color: var(--soft-gray);
  }
  .board__row:nth-of-type(1) > .board__cell:nth-of-type(2) {
    background-color: var(--mint-green);
  }
  .board__row:nth-of-type(1) > .board__cell:nth-of-type(3) {
    background-color: var(--crimson-red);
  } */
  /* Delete above later */

  /* .board__row:nth-of-type(1) > .board__cell:nth-of-type(4), */
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
  transition: all 0.4s ease-out;
}

.board--blurred {
  filter: blur(4px);
}
</style>
