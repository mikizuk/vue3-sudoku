<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { useCapitalize } from '@/composables/useCapitalize'
import { storeToRefs } from 'pinia'

const store = useSudokuStore()
const { capitalize } = useCapitalize()
const { formattedTime, actualGameDifficulty, gameScore } = storeToRefs(store)
</script>
<template>
  <div class="results">
    <div>
      <strong>Time:</strong><span>{{ formattedTime }}</span>
    </div>
    <div>
      <span :class="`color--${actualGameDifficulty}`">{{ capitalize(actualGameDifficulty) }}</span>
    </div>

    <div><strong>Score:</strong><span>{{ gameScore }}</span></div>
  </div>
</template>

<style lang="scss" scoped>
.results {
  display: flex;
  // justify-content: space-evenly;
  justify-content: space-between;
}
</style>
