<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheIntro from '@/components/TheIntro.vue';

const showIntro = ref<null | boolean>(null);

onMounted(() => showIntro.value = true)
const foo = () => {
  console.info('showIntro!',);
  showIntro.value = false
}
</script>

<template>
  <Transition name="slide" mode="out-in">
    <section v-if="showIntro">
      <TheIntro @close="foo" />
    </section>
    <section v-else-if="showIntro === false">
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
