import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RetroSelect from './RetroSelect.vue'

describe('RetroSelect', () => {
  const createWrapper = (props = {}) => {
    return mount(RetroSelect, {
      props: {
        label: 'Difficulty',
        selected: 'beginner',
        options: ['beginner', 'intermediate', 'hard', 'expert'],
        hideLabel: false,
        ...props,
      },
    })
  }

  it('renders label when hideLabel is false', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('label').text()).toBe('Set difficulty:')
  })

  it('does not render label when hideLabel is true', () => {
    const wrapper = createWrapper({ hideLabel: true })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('renders correct options', () => {
    const wrapper = createWrapper()
    const options = wrapper.findAll('option')
    expect(options.length).toBe(4)
    expect(options[0].text()).toBe('Beginner')
    expect(options[1].text()).toBe('Intermediate')
    expect(options[2].text()).toBe('Hard')
    expect(options[3].text()).toBe('Expert')
  })

  it('emits change event with selected option', async () => {
    const wrapper = createWrapper()
    const select = wrapper.find('select')

    await select.setValue('intermediate')
    await select.trigger('change')

    expect(wrapper.emitted('change')?.[0]).toEqual(['intermediate'])
  })
})
