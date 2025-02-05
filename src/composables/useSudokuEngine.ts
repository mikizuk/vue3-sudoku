import type { SudokuBoard } from '@/types/sudokuTypes'

export function useSudokuEngine() {
  const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const shuffleArray = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5)
  }

  const isValidDigit = (board: SudokuBoard, row: number, col: number, digit: number): boolean => {
    // check if the number (digit) already exists in this row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === digit) {
        return false
      }
    }

    // check if the number (digit) already exists in this column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === digit) return false
    }

    // check if the number (num) already exists in each 3x3 box
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === digit) {
          return false
        }
      }
    }

    // if a digit is not already in row and col and it's box then we can use it
    return true
  }

  const solveSudoku = (board: SudokuBoard): boolean => {
    let sudokuRow = 0
    let sudokuCol = 0
    let hasSudokuEmptyCells = false

    // Check here is board has empty (null) cells
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          sudokuRow = row
          sudokuCol = col
          hasSudokuEmptyCells = true
          break
        }
      }

      // if a cell is empty (null) let's break these loops and give it a new random digit
      if (hasSudokuEmptyCells) {
        break
      }
    }

    // if no empty cell found, sudoku is finished
    if (hasSudokuEmptyCells === false) {
      return true // BASE CASE
    }

    // give to a cell (board[sudokuRow][sudokuCol]) a new random digit
    const randomDigits = shuffleArray(DIGITS)

    for (const digit of randomDigits) {
      if (isValidDigit(board, sudokuRow, sudokuCol, digit)) {
        board[sudokuRow][sudokuCol] = digit
        if (solveSudoku(board)) {
          return true // RECURSIVE CASE
        } else {
          board[sudokuRow][sudokuCol] = null
        }
      }
    }

    return false
  }

  const generateSolvedBoard = (): number[][] => {
    const board = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null))

    solveSudoku(board)

    return board
  }

  return {
    generateSolvedBoard,
  }
}
