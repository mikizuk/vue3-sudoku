import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import GameControls from './GameControls.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useSudokuStore } from '@/stores/sudoku'
import { createTestingPinia } from '@pinia/testing'
import RetroButton from '@/components/slots/RetroButton.vue'

describe('GameControls.vue', () => {
  let wrapper: VueWrapper
  let store: ReturnType<typeof useSudokuStore>

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        sudoku: {
          isGamePaused: false,
          hintsRemaining: 3,
          isGameFinished: false,
          togglePause: vi.fn(),
          useHint: vi.fn(),
        },
      },
    })
    wrapper = mount(GameControls, {
      global: {
        plugins: [pinia],
      },
    })
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSudokuStore()
    wrapper = mount(GameControls)
    vi.spyOn(store, 'togglePause')
    vi.spyOn(store, 'useHint')
  })

  it('renders the difficulty component', () => {
    expect(wrapper.findComponent({ name: 'GameDifficulty' }).exists()).toBe(true)
  })

  it('toggles pause when pause button is clicked', async () => {
    const pauseButton = wrapper.findAllComponents(RetroButton)[1]
    await pauseButton.trigger('click')
    expect(store.togglePause).toHaveBeenCalled()
  })

  it('calls useHint when hint button is clicked', async () => {
    const hintButton = wrapper.findAllComponents(RetroButton)[2]
    await hintButton.trigger('click')
    expect(store.useHint).toHaveBeenCalled()
  })
})
