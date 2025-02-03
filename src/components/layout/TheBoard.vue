<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'

const store = useSudokuStore()
const { isIntroShown, isModalOpen, difficulty, isGameInprogress, isPaused } = storeToRefs(store)
</script>
<template>
  <h3 style="padding-top: 10%">The board</h3>

  <pre style="font-family: 'Courier New', Courier, monospace">
isIntroShown: {{ isIntroShown }}
isModalOpen: {{ isModalOpen }}
difficulty: {{ difficulty }}
isGameInprogress: {{ isGameInprogress }}
isPaused: {{ isPaused }}
  </pre>
</template>

<style scoped></style>
