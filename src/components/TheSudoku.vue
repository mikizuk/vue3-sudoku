<script setup lang="ts">
import { onMounted } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
import TheIntro from '@/components/TheIntro.vue'
import ScoreRulesModal from '@/components/ScoreRulesModal.vue'
import GameDifficulty from '@/components/GameDifficulty.vue'

const store = useSudokuStore()
const { isIntroShown } = storeToRefs(store)

onMounted(() => store.showIntro())
</script>

<template>
  <Transition name="slide" mode="out-in">
    <section v-if="isIntroShown" class="intro-section">
      <TheIntro />
    </section>
    <section v-else-if="isIntroShown === false">
      <GameDifficulty />
      <p>TheBoard</p>
    </section>
  </Transition>

  <!-- <section>
    <p>TheControls</p>
  </section>
  
  <section>
  </section>
  
  <section>
    <p>TheDigits</p>
  </section>
  
  <section>
    <p>RecordsTable</p>
  </section> -->

  <ScoreRulesModal />
</template>

<style scoped>
/* .intro-section { */
/* display: grid; */
/* flex-direction: column;
  justify-content: center;
  align-items: center; */
/* } */
</style>
