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
  /* height: 25px; */
  /* padding: 2px; */
  align-items: end;
}

.slot__emoji {
  text-decoration: none;
}

.slot__strong,
.slot__text {
  /* height: 100%; */
  /* line-height: 19px; */
  /* align-self: center; */
  display: flex;
  align-items: end;

  @media (min-width: 769px) {
    /* line-height: 35px; */
    /* background-color: red; */
  }

  @media (min-width: 1280px) {
    /* line-height: 35px; */
  }
}
</style>
