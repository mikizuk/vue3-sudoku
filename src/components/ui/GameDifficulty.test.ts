import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useSudokuStore } from '@/stores/sudoku'
import GameDifficulty from './GameDifficulty.vue'

describe('GameDifficulty', () => {
  let wrapper: VueWrapper
  let store: ReturnType<typeof useSudokuStore>

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        sudoku: {
          isGameOn: false,
          isIntro: true,
          difficulty: 'testing',
          difficulties: ['testing', 'beginner', 'intermediate', 'hard', 'expert'],
        },
      },
    })

    wrapper = mount(GameDifficulty, {
      global: {
        plugins: [pinia],
        stubs: {
          RetroButton: true,
          RetroSelect: true,
          EmojiText: true,
        },
      },
    })

    store = useSudokuStore()
  })

  it('renders difficulty select when not in game', () => {
    expect(wrapper.findComponent({ name: 'RetroSelect' }).exists()).toBe(true)
    expect(wrapper.text()).toContain('And start the game!')
  })

  it('calls setDifficulty when difficulty is changed', async () => {
    const setDifficultySpy = vi.spyOn(store, 'setDifficulty')
    await wrapper.findComponent({ name: 'RetroSelect' }).vm.$emit('change', 'expert')

    expect(setDifficultySpy).toHaveBeenCalledWith('expert')
  })

  it('calls startGame when start button is clicked', async () => {
    const startGameSpy = vi.spyOn(store, 'startGame')
    await wrapper.findComponent({ name: 'RetroButton' }).trigger('click')

    expect(startGameSpy).toHaveBeenCalled()
  })
})
