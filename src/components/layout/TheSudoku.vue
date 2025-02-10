<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
import TheIntro from '@/components/layout/TheIntro.vue'
import ScoreRulesModal from '@/components/ui/ScoreRulesModal.vue'
import GameControls from '@/components/layout/GameControls.vue'
import GameInfo from '@/components/layout/GameInfo.vue'
import TheBoard from '@/components/layout/TheBoard.vue'
import TheDigits from '@/components/layout/TheDigits.vue'
import RecordsTable from '@/components/layout/RecordsTable.vue'
import { useTimer } from '@/composables/useTimer'

const store = useSudokuStore()
const { isIntro } = storeToRefs(store)
const { stopTime } = useTimer()

onMounted(() => {
  store.showIntro()
})
onUnmounted(() => {
  stopTime()
})
</script>

<template>
  <main>
    <Transition name="slide" mode="out-in">
      <section v-if="isIntro" class="intro-section">
        <TheIntro />
      </section>
      <section v-else-if="isIntro === false" class="game-section">
        <GameControls />
        <GameInfo />
        <TheBoard />
        <TheDigits />
        <!-- <hr style="margin-block: 0.5rem" /> -->
        <RecordsTable />
      </section>
    </Transition>

    <ScoreRulesModal />
  </main>
</template>

<style lang="scss">
main {
  flex: 1;
  padding-top: 5px;
  padding-inline: 8px;

  @media (min-width: 769px) {
    padding-inline: 30px;
  }
}

.intro-section {
  padding-top: 20%;
  padding-bottom: 10%;
}

.game-section {
  .controls,
  .results,
  .board,
  .records {
    margin-block: 0.6rem;
    @media (min-width: 769px) {
      margin-block: 1.5rem;
    }
  }
}

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
