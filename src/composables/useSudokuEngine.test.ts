import { describe, it, expect, beforeEach } from 'vitest'
import { useSudokuEngine } from './useSudokuEngine'
import type { Difficulty } from '@/types/sudokuTypes'
import { DIFFICULTY_RANGES } from '@/constants/constants'

describe('useSudokuEngine', () => {
  let sudokuEngine: ReturnType<typeof useSudokuEngine>

  beforeEach(() => {
    sudokuEngine = useSudokuEngine()
  })

  describe('generateSolvedBoard', () => {
    it('generates a 9x9 board', () => {
      const board = sudokuEngine.generateSolvedBoard()
      expect(board.length).toBe(9)
      board.forEach((row) => {
        expect(row.length).toBe(9)
      })
    })

    it('fills all cells with numbers between 1 and 9', () => {
      const board = sudokuEngine.generateSolvedBoard()
      board.forEach((row) => {
        row.forEach((cell) => {
          expect(cell).toBeGreaterThanOrEqual(1)
          expect(cell).toBeLessThanOrEqual(9)
          expect(Number.isInteger(cell)).toBe(true)
        })
      })
    })

    it('generates valid rows (no duplicates)', () => {
      const board = sudokuEngine.generateSolvedBoard()
      board.forEach((row) => {
        const numbers = new Set(row)
        expect(numbers.size).toBe(9)
      })
    })

    it('generates valid columns (no duplicates)', () => {
      const board = sudokuEngine.generateSolvedBoard()
      for (let col = 0; col < 9; col++) {
        const numbers = new Set()
        for (let row = 0; row < 9; row++) {
          numbers.add(board[row][col])
        }
        expect(numbers.size).toBe(9)
      }
    })

    it('generates valid 3x3 boxes (no duplicates)', () => {
      const board = sudokuEngine.generateSolvedBoard()

      // Check each 3x3 box
      for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
          const numbers = new Set()

          // Check each cell in the 3x3 box
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              const row = boxRow * 3 + i
              const col = boxCol * 3 + j
              numbers.add(board[row][col])
            }
          }

          expect(numbers.size).toBe(9)
        }
      }
    })

    it('generates different boards on subsequent calls', () => {
      const board1 = sudokuEngine.generateSolvedBoard()
      const board2 = sudokuEngine.generateSolvedBoard()

      // Convert boards to strings for easy comparison
      const board1String = JSON.stringify(board1)
      const board2String = JSON.stringify(board2)

      expect(board1String).not.toBe(board2String)
    })

    it('generates a valid solution that follows Sudoku rules', () => {
      const board = sudokuEngine.generateSolvedBoard()

      const isValidSet = (numbers: number[]) => {
        const set = new Set(numbers)
        return set.size === 9 && Math.min(...numbers) === 1 && Math.max(...numbers) === 9
      }

      // Check rows
      board.forEach((row) => {
        expect(isValidSet(row)).toBe(true)
      })

      // Check columns
      for (let col = 0; col < 9; col++) {
        const column = board.map((row) => row[col])
        expect(isValidSet(column)).toBe(true)
      }

      // Check 3x3 boxes
      for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
          const boxNumbers: number[] = []
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              boxNumbers.push(board[boxRow * 3 + i][boxCol * 3 + j])
            }
          }
          expect(isValidSet(boxNumbers)).toBe(true)
        }
      }
    })
  })

  describe('getRandomNumber', () => {
    it('removes varying number of cells based on difficulty', () => {
      const difficulties: Difficulty[] = ['beginner', 'intermediate', 'hard', 'expert']

      difficulties.forEach((difficulty) => {
        const solvedBoard = sudokuEngine.generateSolvedBoard()
        const playBoard = sudokuEngine.modifyBoardForPlay(solvedBoard, difficulty).newBoard

        const nullCellCount = playBoard.reduce((total, row) => total + row.filter((cell) => cell === null).length, 0)

        const range = DIFFICULTY_RANGES[difficulty]
        expect(nullCellCount).toBeGreaterThanOrEqual(range.min)
        expect(nullCellCount).toBeLessThanOrEqual(range.max)
      })
    })
  })
  it('generates different boards across multiple calls', () => {
    const boardSet = new Set()
    const iterations = 50

    for (let i = 0; i < iterations; i++) {
      const board = sudokuEngine.generateSolvedBoard()
      const boardString = JSON.stringify(board)
      boardSet.add(boardString)
    }

    // Ensure good randomness with minimal repeated boards
    expect(boardSet.size).toBeGreaterThan(iterations * 0.9)
  })
})
