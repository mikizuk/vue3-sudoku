import { DIFFICULTY_RANGES } from '@/constants/constants'
import type { Difficulty, SudokuBoard } from '@/types/sudokuTypes'
import { useRandom } from '@/composables/useRandom'

export function useSudokuEngine() {
  const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  // GENERATE SOLVED SUDOKU BOARD

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
    const { shuffleArray } = useRandom()
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

  // GENERATE PLAYABLE SUDOKU BOARD

  const modifyBoardForPlay = (
    solvedBoard: SudokuBoard,
    difficulty: Difficulty,
  ): {
    newBoard: SudokuBoard
    originalBoard: SudokuBoard
  } => {
    const { getRandomNumber } = useRandom()
    const range = DIFFICULTY_RANGES[difficulty]
    const cellsToRemove = getRandomNumber(range.min, range.max)
    // console.info('generatePlayBoard', difficulty, range, cellsToRemove, solvedBoard)

    const newBoard = JSON.parse(JSON.stringify(solvedBoard))
    const originalBoard = Array(9)
      .fill(null)
      .map(() => Array(9).fill(true))

    let cellsRemoved = 0
    while (cellsRemoved < cellsToRemove) {
      const randomRowIndex = getRandomNumber(0, 8)
      const randomColIndex = getRandomNumber(0, 8)

      if (newBoard[randomRowIndex][randomColIndex] !== null) {
        newBoard[randomRowIndex][randomColIndex] = null
        originalBoard[randomRowIndex][randomColIndex] = false
        cellsRemoved++
      }
    }

    return {
      newBoard,
      originalBoard,
    }
  }

  // CHECK DIFFERENCES BETWEEN A SOLVED BOARD AND A PLAYING BOARD
  const checkSection = (playBoard: SudokuBoard, solvedBoard: SudokuBoard, section: string, indexCheck: number): boolean => {
    const uniqueDigits = new Set();

    if (section === 'row') {
      for (let col = 0; col < 9; col++) {
        if (playBoard[indexCheck][col] !== solvedBoard[indexCheck][col]) {
          return false
        } else {
          uniqueDigits.add(playBoard[indexCheck][col])
        }
      }
    } else if (section === 'col') {
      for (let row = 0; row < 9; row++) {
        if (playBoard[row][indexCheck] !== solvedBoard[row][indexCheck]) {
          return false
        } else {
          uniqueDigits.add(playBoard[row][indexCheck])
        }
      }
    } else if (section === 'box') {
      const startingRow = Math.floor(indexCheck / 3) * 3
      const startingCol = (indexCheck % 3) * 3
      for (let i = 0; i < 3; i++) {        
        for (let j = 0; j < 3; j++) {
          const checkedRow = startingRow + i
          const checkedCol = startingCol + j

          if (playBoard[checkedRow][checkedCol] !== solvedBoard[checkedRow][checkedCol]) {
            return false
          } else {
            uniqueDigits.add(playBoard[checkedRow][checkedCol])
          }
        }
      }
  
    }

    return uniqueDigits.size === 9
  }
  const checkIsBoardFinished = (playBoard: SudokuBoard, solvedBoard: SudokuBoard): boolean => {
    console.log('checkIsBoardFinished!',
      JSON.parse(JSON.stringify(playBoard)) === JSON.parse(JSON.stringify(solvedBoard))
    )
    return JSON.parse(JSON.stringify(playBoard)) === JSON.parse(JSON.stringify(solvedBoard));
  }

  return {
    generateSolvedBoard,
    modifyBoardForPlay,
    checkSection,
    checkIsBoardFinished
  }
}
