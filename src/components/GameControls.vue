<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku';
import RetroButton from '@/slots/RetroButton.vue';

const store = useSudokuStore();
const difficulties = ['testing', 'beginner', 'intermediate', 'hard', 'expert'] as const;

</script>

<template>
  <!-- <select aria-label="Difficulty" v-model="selectedDifficulty"></select> -->
  <select aria-label="Difficulty">
    <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty">
      {{ difficulty.charAt(0).toUpperCase() + difficulty.slice(1) }}
    </option>
  </select>
  <RetroButton @click="store.hideIntro()">Start/reset game</RetroButton>

</template>
