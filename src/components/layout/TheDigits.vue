<script setup lang="ts">
import { computed } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
const store = useSudokuStore()

const { isGamePaused } = storeToRefs(store)
const digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const availableDigits = computed(() =>
  digits.map((digit) => {
    return { value: digit, isAvailable: true }
  }),
)

const isButtonDisabled = computed(() => isGamePaused.value) // && all digits solved on playBoard

const onDigit = (e: number) => {
  // console.info('ondigit', e)
  store.onDigitClick(e)
}
</script>
<template>
  <ul class="digits">
    <li class="digits__item" v-for="digit in availableDigits" :key="digit.value">
      <button class="digits__button" @click="onDigit(digit.value)" :disabled="isButtonDisabled">
        {{ digit.value }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.digits {
  list-style: none;
  display: flex;
  justify-content: space-between;
  /* gap: 1rem; */

  /* .digits__item { */
    /* border: 2px solid var(--charcoal-gray); */
    /* border-radius: 3px; */
    /* padding: 4px; */
  /* } */

  .digits__item:active {
    outline: 2px solid var(--royal-blue);
  }

  .digits__button {
    border: 3px solid var(--charcoal-gray);
    border-radius: 3px;
    background-color: var(--white);
    cursor: pointer;
    height: 34px;
    width: 34px;
  }

  .digits__item .digits__button:disabled {
    background-color: var(--light-gray);
    border: transparent;
  }

  @media (hover: hover) {
    .digits__button:hover {
      outline: 2px solid var(--mint-green);
      background-color: var(--teal-green);
      color: var(--white);
    }
  }
}
</style>
