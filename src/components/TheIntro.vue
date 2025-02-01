<script setup lang="ts">
import RetroButton from '@/slots/RetroButton.vue';

// import GameControls from "@/components/GameControls.vue";

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')
</script>

<template>
  <h1>
    Welcome to my Sudoku game!
  </h1>
  <p>Select your difficulty and click Start Game to begin</p>
  <!-- <GameControls /> -->
  <!-- <button @click="close()">Close</button> -->
  <RetroButton @click="close()">Close</RetroButton>



</template>
