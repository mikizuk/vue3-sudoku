import { describe, it, expect } from 'vitest'
import { formatDate } from './dates'

describe('formatDate', () => {
  it('formats current date correctly', () => {
    const date = new Date(2024, 1, 9)
    expect(formatDate(date)).toBe('09/02/24')
  })

  it('handles single digit months and days', () => {
    const date = new Date(2024, 0, 5)
    expect(formatDate(date)).toBe('05/01/24')
  })

  it('handles last day of the year', () => {
    const date = new Date(2024, 11, 31)
    expect(formatDate(date)).toBe('31/12/24')
  })

  it('handles first day of the year', () => {
    const date = new Date(2024, 0, 1)
    expect(formatDate(date)).toBe('01/01/24')
  })

  it('handles leap year date', () => {
    const date = new Date(2024, 1, 29)
    expect(formatDate(date)).toBe('29/02/24')
  })
})
