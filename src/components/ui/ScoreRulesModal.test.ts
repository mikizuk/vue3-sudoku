import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ModalComponent from '@/components/ui/ScoreRulesModal.vue'
import { useSudokuStore } from '@/stores/sudoku'

describe('ModalComponent', () => {
  let wrapper: VueWrapper
  let store: ReturnType<typeof useSudokuStore>

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        sudoku: {
          isModalOpen: false,
        },
      },
    })

    wrapper = mount(ModalComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          Teleport: {
            name: 'Teleport',
            template: '<div><slot /></div>',
          },
        },
      },
    })

    store = useSudokuStore()
  })

  it('should not render modal when isModalOpen is false', () => {
    expect(wrapper.find('.modal-backdrop').exists()).toBe(false)
    expect(wrapper.find('.modal').exists()).toBe(false)
  })

  it('should render modal when isModalOpen is true', async () => {
    store.isModalOpen = true
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.modal-backdrop').exists()).toBe(true)
    expect(wrapper.find('.modal').exists()).toBe(true)
  })

  it('should call toggleModal when backdrop is clicked', async () => {
    store.isModalOpen = true
    await wrapper.vm.$nextTick()

    const backdrop = wrapper.find('.modal-backdrop')
    await backdrop.trigger('click')

    expect(store.toggleModal).toHaveBeenCalledTimes(1)
  })

  it('should render game-rules article inside modal', async () => {
    store.isModalOpen = true
    await wrapper.vm.$nextTick()

    const gameRules = wrapper.find('.game-rules')
    expect(gameRules.exists()).toBe(true)
  })
})
