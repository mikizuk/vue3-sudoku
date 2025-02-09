import { describe, it, expect } from 'vitest'
import { formatDate } from './dates'

describe('formatDate', () => {
  it('formats current date correctly', () => {
    const date = new Date(2024, 1, 9) // February 9, 2024
    expect(formatDate(date)).toBe('02/09/24')
  })

  it('handles single digit months and days', () => {
    const date = new Date(2024, 0, 5) // January 5, 2024
    expect(formatDate(date)).toBe('01/05/24')
  })

  it('handles last day of the year', () => {
    const date = new Date(2024, 11, 31) // December 31, 2024
    expect(formatDate(date)).toBe('12/31/24')
  })

  it('handles first day of the year', () => {
    const date = new Date(2024, 0, 1) // January 1, 2024
    expect(formatDate(date)).toBe('01/01/24')
  })

  it('handles leap year date', () => {
    const date = new Date(2024, 1, 29) // February 29, 2024
    expect(formatDate(date)).toBe('02/29/24')
  })
})
