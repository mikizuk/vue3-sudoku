<script setup lang="ts">
import { computed } from 'vue'

const digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const availableDigits = computed(() =>
  digits.map((digit) => {
    return { value: digit, isAvailable: true }
  }),
)
</script>
<template>
  <ul class="digits">
    <li class="digits__item" v-for="digit in availableDigits" :key="digit.value">
      <button>{{ digit.value }}</button>
    </li>
  </ul>
</template>

<style scoped>
.digits {
  list-style: none;
  display: flex;
  justify-content: space-between;
  /* gap: 1rem; */

  .digits__item {
    border: 2px solid var(--charcoal-gray);
    border-radius: 3px;
    /* padding: 4px; */

    button {
      /* color: var(--royal-blue); */
      background-color: var(--white);
      /* border: 1px solid red; */
      cursor: pointer;
      height: 30px;
      width: 30px;
    }
  }
}
</style>
