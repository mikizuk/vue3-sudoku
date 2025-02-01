<script setup lang="ts">
import { onMounted, } from 'vue';
import { useSudokuStore } from '@/stores/sudoku';
import { storeToRefs } from 'pinia';
import TheIntro from '@/components/TheIntro.vue';

const store = useSudokuStore();
const { isIntroShown } = storeToRefs(store);

onMounted(() => store.showIntro())
</script>

<template>
  <Transition name="slide" mode="out-in">
    <section v-if="isIntroShown">
      <TheIntro />
    </section>
    <section v-else-if="isIntroShown === false">
      Game
    </section>
  </Transition>

  <!-- <section>
      <p>TheControls</p>
    </section>
    
    <section>
      <p>TheBoard</p>
    </section>
    
    <section>
      <p>TheDigits</p>
    </section>
    
    <section>
      <p>RecordsTable</p>
    </section> -->

</template>
