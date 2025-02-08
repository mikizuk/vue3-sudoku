<script setup lang="ts">
import { computed } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
import { GET_BOX_INDEX } from '@/constants/constants'
const store = useSudokuStore()

const { solvedBoard, originalSolvedBoard, playBoard, isGamePaused, gameTime, selectedCell, completedSections } = storeToRefs(store) // canSelectCell

const onCellClick = (row: number, col: number): void => {
  store.setSelectedCell({ row, col })
}

const getCellClasses = computed(() => (row: number, col: number) => ({
  'board__cell--selected': row === selectedCell.value.row && col === selectedCell.value.col,
  'board__cell--correct':
    playBoard.value[row][col] === solvedBoard.value[row][col] && !originalSolvedBoard.value[row][col],
  'board__cell--error':
    playBoard.value[row][col] !== null &&
    playBoard.value[row][col] !== solvedBoard.value[row][col] &&
    !originalSolvedBoard.value[row][col],
  'board__cell--original': !!originalSolvedBoard.value[row][col],
  'board__cell--completed-row': completedSections.value.find(section => section.type === 'row' && section.index === row),
  'board__cell--completed-col': completedSections.value.find(section => section.type === 'col' && section.index === col),
  // 'board__cell--completed-box': completedSections.value.find(section => section.type === 'box' && section.index === Math.floor(row / 3) * 3 + Math.floor(col / 3)),
  'board__cell--completed-box': completedSections.value.find(section => section.type === 'box' && section.index === GET_BOX_INDEX(row, col)),
  'board__cell--completed-all': false,
}))

const isBoardBlurred = computed(() => isGamePaused.value || gameTime.value === 0)
</script>

<template>
  <table class="board" :class="{ 'board--blurred': isBoardBlurred }">
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
    /* border-right: solid; */
    border-right: 3px solid var(--charcoal-gray);

  }
  .board__row:nth-child(3n) .board__cell {
    /* border-bottom: solid; */
    border-bottom: 3px solid var(--charcoal-gray);
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
  
  .board__cell--completed-all,
  .board__cell--completed-row,
  .board__cell--completed-col,
  .board__cell--completed-box {
    background-color: var(--mint-green);
  }


  transition: all 0.4s ease-out;
}

.board--blurred {
  filter: blur(4px);
}
</style>
