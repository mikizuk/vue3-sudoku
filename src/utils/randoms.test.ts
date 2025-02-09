import { describe, it, expect } from 'vitest'
import { getRandomNumber, shuffleArray } from './randoms'

describe('randoms', () => {
  describe('getRandomNumber', () => {
    it('generates a number within the default range', () => {
      const result = getRandomNumber()
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(9)
      expect(Number.isInteger(result)).toBe(true)
    })

    it('generates a number within a custom range', () => {
      const min = 5
      const max = 10
      const result = getRandomNumber(min, max)
      expect(result).toBeGreaterThanOrEqual(min)
      expect(result).toBeLessThanOrEqual(max)
      expect(Number.isInteger(result)).toBe(true)
    })

    it('generates different random numbers across multiple calls', () => {
      const results = new Set()
      const iterations = 100

      for (let i = 0; i < iterations; i++) {
        results.add(getRandomNumber())
      }

      expect(results.size).toBeGreaterThan(1)
    })

    it('handles edge cases with equal min and max', () => {
      const fixedNumber = 7
      const result = getRandomNumber(fixedNumber, fixedNumber)
      expect(result).toBe(fixedNumber)
    })
  })

  describe('shuffleArray', () => {
    it('shuffles an array of numbers', () => {
      const originalArray = [1, 2, 3, 4, 5]
      const shuffledArray = shuffleArray([...originalArray])

      expect(shuffledArray.sort()).toEqual(originalArray)
    })

    it('generates different shuffles across multiple calls', () => {
      const array = [1, 2, 3, 4, 5]
      const shuffleResults = new Set()

      for (let i = 0; i < 100; i++) {
        shuffleResults.add(JSON.stringify(shuffleArray([...array])))
      }

      expect(shuffleResults.size).toBeGreaterThan(1)
    })
  })
})
