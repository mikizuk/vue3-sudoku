import { computed, toValue } from 'vue'

export function useCapitalize() {
  const capitalize = computed(() => (text: string) => {
    return String(toValue(text)).charAt(0).toUpperCase() + String(toValue(text)).slice(1)
  })

  return {
    capitalize,
  }
}
