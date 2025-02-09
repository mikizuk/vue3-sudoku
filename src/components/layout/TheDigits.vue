<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import { useKeyboardNumbers } from '@/composables/useKeyboardNumbers'
import { storeToRefs } from 'pinia'

const { pressedNumber } = useKeyboardNumbers()
const store = useSudokuStore()
const { isGamePaused, playBoard } = storeToRefs(store)

const digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const getDigitCount = (digit: number) => {
  let count = 0
  for (let row = 0; row < digits.length; row++) {
    for (let col = 0; col < digits.length; col++) {
      if (playBoard.value[row][col] === digit) {
        count++
      }
    }
  }
  return count
}

const availableDigits = computed(() =>
  digits.map((digit) => ({
    value: digit,
    isAvailable: getDigitCount(digit) < digits.length,
  })),
)

const onDigit = (e: number) => store.onDigitClick(e)

watchEffect(() => {
  if (pressedNumber.value) {
    store.onDigitClick(+pressedNumber.value)
  }
})
</script>
<template>
  <ul class="digits">
    <li class="digits__item" v-for="digit in availableDigits" :key="digit.value">
      <button
        class="digits__button"
        :class="{ 'digits__button--disabled': !digit.isAvailable || isGamePaused }"
        @click="onDigit(digit.value)"
        :disabled="!digit.isAvailable || isGamePaused"
      >
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
    color: var(--charcoal-gray);

    @media (min-width: 769px) {
      font-size: 1.2rem;
      height: 60px;
      width: 90px;
    }
  }

  .digits__item .digits__button--disabled {
    border-color: var(--soft-gray);
    background-color: inherit;
    color: var(--soft-gray);
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
