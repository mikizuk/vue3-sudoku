import { computed } from 'vue'

export function useCapitalize() {
  const capitalize = computed(() => (text: string) => {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1)
  })

  return {
    capitalize,
  }
}
