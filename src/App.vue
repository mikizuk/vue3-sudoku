<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheSudoku from '@/components/TheSudoku.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <header class="header">
    <TheHeader />
  </header>

  <main class="main">
    <TheSudoku />
  </main>

  <footer class="footer">
    <TheFooter />
  </footer>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  background: var(--background-primary);

  display: flex;
  justify-content: space-between;
}

.main {
  flex: 1;
}

.footer {
  position: sticky;
  bottom: 0;
  background: var(--background-primary);
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
