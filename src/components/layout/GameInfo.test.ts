import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import GameInfo from './GameInfo.vue'

const pinia = createTestingPinia({
  createSpy: vi.fn,
  initialState: {
    sudoku: {
      formattedTime: '00:00',
      actualGameDifficulty: 'hard',
      gameScore: 500,
    },
  },
})

describe('GameControls.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = shallowMount(GameInfo, {
      global: {
        plugins: [pinia],
      },
    })
  })

  it('renders formatted time correctly', () => {
    expect(wrapper.text()).toContain('00:00')
  })

  it('renders actual game difficulty with correct class', () => {
    const difficultyElement = wrapper.find('.color--hard')
    expect(difficultyElement.text()).toContain('Hard')
  })
})
