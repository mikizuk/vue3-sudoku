<script setup lang="ts">
import RetroButton from '@/slots/RetroButton.vue';

const emit = defineEmits<{
  (e: 'close'): void
}>()

const close = () => emit('close')

</script>

<template>
  <div>Difficulty</div>
  <RetroButton @click="close()">Start/reset game</RetroButton>

</template>
