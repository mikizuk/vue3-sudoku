import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTimer } from './useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initializes with correct default values', () => {
    const { elapsedTime } = useTimer()

    expect(elapsedTime.value).toBe(0)
  })

  it('starts timer and increments elapsed time', () => {
    const { elapsedTime, startTime } = useTimer()

    startTime()
    vi.advanceTimersByTime(3000)

    expect(elapsedTime.value).toBe(3)
  })

  it('pauses timer correctly', () => {
    const { elapsedTime, startTime, pauseTime } = useTimer()

    startTime()
    vi.advanceTimersByTime(3000)
    pauseTime()
    vi.advanceTimersByTime(2000)

    expect(elapsedTime.value).toBe(3)
  })

  it('resets timer and restarts', () => {
    const { elapsedTime, startTime, resetTime } = useTimer()

    startTime()
    vi.advanceTimersByTime(3000)
    resetTime()

    expect(elapsedTime.value).toBe(0)

    vi.advanceTimersByTime(1000)
    expect(elapsedTime.value).toBe(1)
  })

  it('stops when maximum time is reached', () => {
    const { elapsedTime, startTime } = useTimer()

    startTime()
    vi.advanceTimersByTime(60 * 60 * 1000)

    expect(elapsedTime.value).toBe(3600)
  })
})
