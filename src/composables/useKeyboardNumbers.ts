import { ref, onMounted, onUnmounted } from 'vue'

export function useKeyboardNumbers() {
  const pressedNumber = ref<string | null>()

  const handleKeyDown = (event: KeyboardEvent) => {
    const numberKey = event?.key?.match(/^[0-9]$/)

    if (numberKey) {
      pressedNumber.value = event.key
    }
  }

  const handleKeyup = (event: KeyboardEvent) => {
    const numberKey = event?.key?.match(/^[0-9]$/)
    if (numberKey) {
      pressedNumber.value = null
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyup)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyup)
  })

  return { pressedNumber }
}
