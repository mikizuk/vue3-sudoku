<script setup lang="ts" generic="T">
import { useCapitalize } from '@/composables/useCapitalize'
const { capitalize } = useCapitalize()

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
      {{ capitalize(option as string) }}
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
  cursor: pointer;
  font-size: 0.7rem;
  width: fit-content;

  @media (min-width: 769px) {
    font-size: 1rem;
    padding: 15px 20px;
  }

  .retro-select__option {
    background-color: var(--sky-blue);
  }
}
</style>
