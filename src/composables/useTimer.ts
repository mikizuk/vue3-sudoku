import { ref } from 'vue'

export function useTimer() {
  const elapsedTime = ref(0)
  const isRunning = ref(false)
  const maxTime = 60 * 60
  let timer: ReturnType<typeof setInterval> | null = null

  const startTime = () => {
    if (!isRunning.value && elapsedTime.value < maxTime) {
      isRunning.value = true
      timer = setInterval(() => {
        if (elapsedTime.value < maxTime) {
          elapsedTime.value++
        } else {
          stopTime()
        }
      }, 1000)
    }
  }

  const pauseTime = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
      isRunning.value = false
    }
  }

  const resetTime = () => {
    elapsedTime.value = 0
    startTime()
  }

  const stopTime = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
      isRunning.value = false
    }
  }

  return {
    elapsedTime,
    startTime,
    pauseTime,
    resetTime,
  }
}
