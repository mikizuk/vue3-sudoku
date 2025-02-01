<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku';
import RetroButton from '@/slots/RetroButton.vue';

const store = useSudokuStore();

</script>

<template>
  <div>Difficulty</div>
  <RetroButton @click="store.hideIntro()">Start/reset game</RetroButton>

</template>
