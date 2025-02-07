import { describe, it, expect } from 'vitest'
import { useCapitalize } from './useCapitalize'

describe('useCapitalize', () => {
  it('should capitalize the first letter of a string', () => {
    const { capitalize } = useCapitalize()
    expect(capitalize.value('hello')).toBe('Hello')
    expect(capitalize.value('world')).toBe('World')
  })

  it('should return an empty string when input is empty', () => {
    const { capitalize } = useCapitalize()
    expect(capitalize.value('')).toBe('')
  })

  it('should handle single-character strings', () => {
    const { capitalize } = useCapitalize()
    expect(capitalize.value('a')).toBe('A')
    expect(capitalize.value('z')).toBe('Z')
  })

  it('should not modify already capitalized words', () => {
    const { capitalize } = useCapitalize()
    expect(capitalize.value('Hello')).toBe('Hello')
    expect(capitalize.value('World')).toBe('World')
  })
})
