import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TheHeader from './TheHeader.vue'
import { createTestingPinia } from '@pinia/testing'
import { useSudokuStore } from '@/stores/sudoku'

describe('TheHeader', () => {
  let wrapper: VueWrapper
  let store: ReturnType<typeof useSudokuStore>

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    })
    wrapper = mount(TheHeader, {
      global: {
        plugins: [pinia],
        stubs: ['EmojiText'],
      },
    })
    store = useSudokuStore()
  })

  it('renders the header element', () => {
    expect(wrapper.find('header.header').exists()).toBe(true)
  })

  it('renders EmojiText component with correct content', () => {
    const emojiTexts = wrapper.findAllComponents({ name: 'EmojiText' })
    expect(emojiTexts.length).toBe(2)
  })

  it('renders navigation list with one item', () => {
    const navItems = wrapper.findAll('.nav-list__item')
    expect(navItems.length).toBe(1)
  })

  it('calls toggleModal when onToggleModal function is executed', () => {
    const onToggleModal = () => store.toggleModal()
    onToggleModal()
    expect(store.toggleModal).toHaveBeenCalled()
  })
})
