import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmojiText from './EmojiText.vue'

describe('EmojiText', () => {
  it('renders all slots when provided', () => {
    const wrapper = mount(EmojiText, {
      slots: {
        emoji: '👋',
        strong: '<strong>Hello</strong>',
        text: 'Welcome to the test',
      },
    })

    expect(wrapper.find('.slot__emoji').exists()).toBe(true)
    expect(wrapper.find('.slot__strong').exists()).toBe(true)
    expect(wrapper.find('.slot__text').exists()).toBe(true)

    expect(wrapper.find('.slot__emoji').text()).toBe('👋')
    expect(wrapper.find('.slot__strong').html()).toContain('<strong>Hello</strong>')
    expect(wrapper.find('.slot__text').text()).toBe('Welcome to the test')
  })

  it('does not render slots when not provided', () => {
    const wrapper = mount(EmojiText)

    expect(wrapper.find('.slot__emoji').exists()).toBe(false)
    expect(wrapper.find('.slot__strong').exists()).toBe(false)
    expect(wrapper.find('.slot__text').exists()).toBe(false)
  })

  it('renders only provided slots', () => {
    const wrapper = mount(EmojiText, {
      slots: {
        emoji: '😊',
        text: 'Partial slots test',
      },
    })

    expect(wrapper.find('.slot__emoji').exists()).toBe(true)
    expect(wrapper.find('.slot__strong').exists()).toBe(false)
    expect(wrapper.find('.slot__text').exists()).toBe(true)

    expect(wrapper.find('.slot__emoji').text()).toBe('😊')
    expect(wrapper.find('.slot__text').text()).toBe('Partial slots test')
  })

  it('maintains correct wrapper class and structure', () => {
    const wrapper = mount(EmojiText, {
      slots: {
        emoji: '🎉',
      },
    })

    const wrapperElement = wrapper.find('.slot-wrapper')
    expect(wrapperElement.exists()).toBe(true)
    expect(wrapperElement.classes()).toContain('slot-wrapper')
  })
})
