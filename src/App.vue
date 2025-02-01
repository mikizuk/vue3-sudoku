<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheSudoku from "@/components/TheSudoku.vue";
import TheFooter from "@/components/TheFooter.vue";
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

  padding-block: 4px;
  padding-inline: 2px;

  @media (min-width: 769px) {
    padding-block: 12px;
    padding-inline: 12px;
  }

  @media (min-width: 1280px) {
    padding-block: 20px;
    padding-inline: 20px;
  }
}

.main {
  padding-inline: 2px;
  padding-block: 4px;

  @media (min-width: 769px) {
    padding-block: 12px;
    padding-inline: 12px;
  }

  @media (min-width: 1280px) {
    padding-block: 20px;
    padding-inline: 20px;
  }

}

.footer {
  position: sticky;
  bottom: 0;
  background: var(--background-primary);
  width: 100%;
  display: flex;
  justify-content: center;

  padding-block: 4px;
  padding-inline: 2px;

  @media (min-width: 769px) {
    padding-block: 12px;
    padding-inline: 12px;
    gap: 1rem;
  }

  @media (min-width: 1280px) {
    padding-block: 20px;
    padding-inline: 20px;
    gap: 2rem;
  }
}
</style>