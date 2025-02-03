import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RetroButton from '@/components//slots/RetroButton.vue'

describe('RetroButton.vue', () => {
  it('renders the button', () => {
    const wrapper = mount(RetroButton)
    expect(wrapper.find('button.retro-button').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(RetroButton, {
      slots: {
        default: 'Click Me',
      },
    })
    expect(wrapper.text()).toBe('Click Me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(RetroButton)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted<'click'>()).toHaveProperty('click')
  })
})
