<template>
  <div class="slot-wrapper">
    <span v-if="$slots.emoji" class="slot__emoji">
      <slot name="emoji" />
    </span>

    <p v-if="$slots.strong" class="slot__strong">
      <slot name="strong" />
    </p>

    <p v-if="$slots.text" class="slot__text">
      <slot name="text" />
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.slot-wrapper {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  @media (min-width: 769px) {
    align-items: end;
  }
}

.slot__emoji {
  text-decoration: none;
}

.slot__strong,
.slot__text {
  display: flex;
  @media (min-width: 769px) {
    align-items: end;
  }
}
</style>
