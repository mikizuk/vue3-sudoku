<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'

const store = useSudokuStore()
const { isIntro, isModalOpen, difficulty, gameStatus, board } = storeToRefs(store)
</script>
<template>
  <h3 style="padding-top: 10%">The board</h3>

  <!-- <pre style="font-family: 'Courier New', Courier, monospace">
isIntro: {{ isIntro }}
isModalOpen: {{ isModalOpen }}
difficulty: {{ difficulty }}
gameStatus: {{ gameStatus }}
---
  </pre> -->
</template>

<style scoped></style>
