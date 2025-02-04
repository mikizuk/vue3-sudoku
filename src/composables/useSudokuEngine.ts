// const shuffleArray = (array: number[]) => {
//   return array.sort(() => Math.random() - 0.5)
// }

export function useSudokuEngine() {
  const isValidCell = (board: number[][], row: number, col: number, num: number): boolean => {
    // check if the number (num) already exists in this row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) {
        return false
      }
    }

    // check if the number (num) already exists in this column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false
    }

    // check if the number (num) already exists in each box
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false
        }
      }
    }

    // if the number is not already in row and col and it's box then we can use it
    return true
  }

  const generateSolvedBoard = (): number[][] => {
    const board = Array(9)
      .fill(null)
      .map(() => Array(9).fill(0))
    console.info('board', board)
    solveSudoku(board)

    return board
  }
  const solveSudoku = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // console.info(row, col)
          for (let num = 1; num <= 9; num++) {
            // board[row][col] = +`${row}${col}`
            if (isValidCell(board, row, col, num)) {
              board[row][col] = num

              if (solveSudoku(board)) {
                return true
              }
              board[row][col] = 0
            }
          }
          return false
        }
      }
    }

    return true
  }

  return {
    // isValidCell,
    generateSolvedBoard,
  }
}
