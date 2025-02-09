<script setup lang="ts">
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
const store = useSudokuStore()
const { isModalOpen } = storeToRefs(store)
</script>

<template>
  <Transition name="grows-out" mode="out-in">
    <Teleport to="body">
      <div class="modal-backdrop" v-if="isModalOpen" @click="store.toggleModal()">
        <div class="modal" v-if="isModalOpen">
          <article class="game-rules">
            <h3>Rules</h3>
            <ul>
              <li>All classical Sudoku rules must be followed</li>
              <li>Each game is randomly generated, ensuring a unique experience</li>
              <li>Pre-filled cells cannot be edited</li>
              <li>Real-time error detection and validation</li>
            </ul>

            <h3>Difficulty Levels</h3>

            <p>The game features 4 ranks with varying numbers of pre-filled cells (out of 81):</p>

            <ul>
              <li>Beginner: 36-40 cells visible</li>
              <li>Intermediate: 32-36 cells visible</li>
              <li>Hard: 28-32 cells visible</li>
              <li>Expert: 24-28 cells visible</li>
            </ul>

            <h3>Hint System</h3>

            <ul>
              <li>Available hints are indicated by a bulb icon</li>
              <li>Maximum of 10 hints per game</li>
              <li>Each hint reveals a correct cell value</li>
            </ul>

            <h3>Scoring System</h3>

            <ul>
              <li>+5 points for each correct cell</li>
              <li>-3 points for the first hint</li>
              <li>Each subsequent hint increases the penalty by 1 point (e.g., -3, -4, -5, etc.)</li>
              <li>-1 point for each error</li>
              <li>Base time bonus of 500 points</li>
              <li>Final time bonus = 500 - elapsed time in seconds</li>
              <li>Added to Part 1 score upon successful completion</li>
            </ul>

            <h3>Records System</h3>

            <ul>
              <li>Maintains top 3 highest scores for each rank</li>
              <li>Persists across page refreshes</li>
              <li>Only successful game completions are eligible</li>
              <li>Tracks scores across all difficulty levels</li>
            </ul>
          </article>
        </div>
      </div>
    </Teleport>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--charcoal-gray);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: var(--light-gray);
  padding: 20px;
  border-radius: 5px;
}

.game-rules {
  font-size: 0.5rem;
  line-height: 0.6rem;
}

h3 {
  font-size: 1rem;
  padding-block: 0.8rem;
}

ul {
  padding-bottom: 0.4rem;
}

.grows-out-enter-from,
.grows-out-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.grows-out-enter-active,
.grows-out-leave-active {
  transition: 0.3s ease-out;
}
</style>
