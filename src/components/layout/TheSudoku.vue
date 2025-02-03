<script setup lang="ts">
import { onMounted } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
import TheIntro from '@/components/layout/TheIntro.vue'
import TheBoard from '@/components/layout/TheBoard.vue'
import ScoreRulesModal from '@/components/ui/ScoreRulesModal.vue'
import GameControls from '@/components/layout/GameControls.vue'

const store = useSudokuStore()
const { isIntro } = storeToRefs(store)

onMounted(() => {
  console.info('mounted animate!')
  store.showIntro()
})
</script>

<template>
  <main>
    <Transition name="slide" mode="out-in">
      <section v-if="isIntro" class="intro-section">
        <TheIntro />
      </section>
      <section v-else-if="isIntro === false">
        <GameControls />
      </section>
    </Transition>
    <section>
      <TheBoard />
    </section>
    <!-- 
    <section>
      <TheDigits />
    </section>
    <section>
      <RecordsTable/>
    </section> -->

    <ScoreRulesModal />
  </main>
</template>

<style lang="scss">
main {
  flex: 1;

  padding-block: 20px;
  padding-inline: 8px;

  .intro-section {
    padding-top: 20%;
    padding-bottom: 10%;
  }
  // @media (min-width: 769px) {
  //   padding-block: 22%;
  //   padding-inline: 12px;
  // }

  // @media (min-width: 1280px) {
  //   padding-block: 15%;
  //   padding-inline: 20px;
  // }
}
/* display: grid; */
/* flex-direction: column;
  justify-content: center;
  align-items: center; */

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
