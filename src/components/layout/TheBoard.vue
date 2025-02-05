<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const store = useSudokuStore()

const { solvedBoard, isGamePaused, gameTime } = storeToRefs(store)

const onCellClick = (value: number | null) => {
  console.info('onCellClick', value, 'isGamePaused', isGamePaused.value)
}
onMounted(() => {
  // console.info('?')
})
</script>

<template>
  <table class="board" :class="{ 'board--blurred': isGamePaused || gameTime === 0 }">
    <tr class="board__row" v-for="(row, rowIndex) in solvedBoard" :key="rowIndex">
      <td class="board__cell" v-for="(cell, cellIndex) in row" :key="cellIndex">
        <button class="board__button" @click="onCellClick(cell)">{{ cell }}</button>
        <!-- {{ cell }} -->
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
    height: 30px;
    width: 30px;
    border: 1px solid;
    text-align: center;
  }

  .board__button {
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
  /* Delete belowlater */
  .board__row:nth-of-type(1) > .board__cell:nth-of-type(1) {
    background-color: var(--soft-gray);
  }
  .board__row:nth-of-type(1) > .board__cell:nth-of-type(2) {
    background-color: var(--mint-green);
  }
  .board__row:nth-of-type(1) > .board__cell:nth-of-type(3) {
    background-color: var(--crimson-red);
  }
  .board__row:nth-of-type(1) > .board__cell:nth-of-type(4) {
    border: 2px solid var(--royal-blue);
  }
  transition: all 0.4s ease-out;
}

.board--blurred {
  filter: blur(4px);
}
</style>
