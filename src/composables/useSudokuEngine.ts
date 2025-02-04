const shuffleArray = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5)
}

export function useSudokuEngine() {
  const isValidCell = false

  const generateSolvedBoard = (board: number[][]): boolean => {
    console.info('solveSudoku', board)
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // console.info(row, col)
        for (let num = 0; num < 9; num++) {
          board[row][col] = +`${row}${col}`
        }
      }
    }

    return true
  }

  return {
    isValidCell,
    generateSolvedBoard,
  }
}
