<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'

const store = useSudokuStore()
const { formattedTime } = storeToRefs(store)
</script>
<template>
  <div class="results">
    <div>
      <strong>Time:</strong><span>{{ formattedTime }}</span>
    </div>
    <div><strong>Score:</strong><span>432</span></div>
  </div>
</template>

<style lang="scss" scoped>
.results {
  display: flex;
  justify-content: space-evenly;
}
</style>
