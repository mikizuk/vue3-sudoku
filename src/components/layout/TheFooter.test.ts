import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheFooter from './TheFooter.vue'

describe('Footer', () => {
  const wrapper = mount(TheFooter, {
    global: {
      stubs: ['EmojiText'],
    },
  })

  it('renders three links', () => {
    const links = wrapper.findAll('.footer__link')
    expect(links.length).toBe(3)
  })

  it('renders correct link URLs', () => {
    const links = wrapper.findAll('.footer__link')
    expect(links[0].attributes('href')).toBe('https://github.com/mikizuk')
    expect(links[1].attributes('href')).toBe('https://github.com/mikizuk/vue3-sudoku')
    expect(links[2].attributes('href')).toBe('https://en.wikipedia.org/wiki/Sudoku')
  })

  it('renders three separators', () => {
    const separators = wrapper.findAll('.footer__separator')
    expect(separators.length).toBe(3)
  })

  it('renders EmojiText components with correct content', () => {
    const emojiTexts = wrapper.findAllComponents({ name: 'EmojiText' })
    expect(emojiTexts.length).toBe(3)
  })

  it('displays the app version', () => {
    const appVersion = wrapper.find('.app-version')
    expect(appVersion.exists()).toBe(true)
    expect(appVersion.text()).toBe(__APP_VERSION__)
    expect(appVersion.attributes('title')).toBe('App version')
  })
})
