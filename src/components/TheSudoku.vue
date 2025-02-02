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
  <main>
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
  </main>
</template>

<style lang="scss">
main {
  flex: 1;

  padding-block: 20%;
  padding-inline: 8px;

  @media (min-width: 769px) {
    padding-block: 22%;
    padding-inline: 12px;
  }

  @media (min-width: 1280px) {
    padding-block: 15%;
    padding-inline: 20px;
  }
}
/* .intro-section { */
/* display: grid; */
/* flex-direction: column;
  justify-content: center;
  align-items: center; */
/* } */

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease-out;
}
</style>
