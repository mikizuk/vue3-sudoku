<script setup lang="ts" generic="T">
defineProps<{
  label: string
  selected: T
  options: T[]
  hideLabel: boolean
}>()
const emit = defineEmits<{
  (e: 'change', value: T): void
}>()
const onSelect = (event: Event) => {
  const newOption = (event.target as HTMLSelectElement).value as T
  emit('change', newOption)
}
</script>

<template>
  <label v-if="!hideLabel" :for="`select-${label}`">Set difficulty:</label>
  <select :aria-label="`${label}:`" class="retro-select" :id="`select-${label}`" :value="selected" @change="onSelect">
    <option class="retro-select__option" v-for="option in options" :key="String(option)" :value="option">
      {{ String(option).charAt(0).toUpperCase() + String(option).slice(1) }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.retro-select {
  color: var(--charcoal-gray);
  background-color: var(--soft-gray);
  border: 2px solid var(--charcoal-gray);
  border-radius: 3px;
  padding: 5px 10px;
  // margin: 5px;
  // font-family: 'Press Start 2P', serif;
  // font-weight: 200;
  // font-style: normal;
  cursor: pointer;
  font-size: 0.7rem;
  width: fit-content;

  .retro-select__option {
    background-color: var(--sky-blue);
  }
}
</style>
