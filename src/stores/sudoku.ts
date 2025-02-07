import { useTimer } from '@/composables/useTimer'
import { defineStore } from 'pinia'
import type { Cell, Difficulty, GameStatus, SudokuState } from '@/types/sudokuTypes'
import { DIFFICULTIES } from '@/constants/constants'
import { useSudokuEngine } from '@/composables/useSudokuEngine'

const { elapsedTime, startTime, pauseTime, resetTime } = useTimer()

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState => ({
    gameStatus: 'notStarted',
    isIntro: null,
    isModalOpen: false,
    selectedDifficulty: 'beginner' as Difficulty,
    actualGameDifficulty: 'beginner' as Difficulty,
    difficulties: DIFFICULTIES,
    hintsRemaining: 10,
    gameTime: elapsedTime,
    solvedBoard: Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
    originalSolvedBoard: Array(9)
      .fill(null)
      .map(() => Array(9).fill(false)),
    playBoard: Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
    selectedCell: { row: null, col: null },
  }),

  getters: {
    isGameOn(): boolean {
      return this.gameStatus !== 'notStarted'
    },
    canUseHint(): boolean {
      return this.hintsRemaining > 0
      // and selected cell is empty TODO:
    },
    formattedTime(): string {
      const minutes = Math.floor(this.gameTime / 60)
      const seconds = this.gameTime % 60

      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    isGamePlaying(): boolean {
      return this.gameStatus === 'playing'
    },
    isGamePaused(): boolean {
      return this.gameStatus === 'paused'
      // disable Reset & Hint buttons TODO:
    },
  },

  actions: {
    // game control
    changeGameStatus(newStatus: GameStatus) {
      console.info('--- changeGameStatus', newStatus)
      this.gameStatus = newStatus
    },
    // intro shown
    showIntro() {
      this.isIntro = true
    },
    hideIntro() {
      this.isIntro = false
    },
    // modal
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    // difficulty
    setSelectedDifficulty(newDiff: Difficulty) {
      this.selectedDifficulty = newDiff
    },
    setActualGameDifficulty(newDiff: Difficulty) {
      this.actualGameDifficulty = newDiff
    },
    // hints
    resetHintsNumber() {
      this.hintsRemaining = 10
    },
    useHint() {
      if (!this.canUseHint || !this.isGamePlaying) return

      this.hintsRemaining -= 1
      // give hint TODO:
      // add penalty TODO:
      // chnage score TODO:
      // fill the board TODO:
    },
    // game controls
    togglePause() {
      if (this.isGamePlaying) {
        this.changeGameStatus('paused')
        pauseTime()
      } else if (this.isGamePaused) {
        this.changeGameStatus('playing')
        startTime()
      }
    },
    // cell actions
    setSelectedCell(cell: Cell) {
      // console.info('selectedCell a', cell)
      if (this.isGamePaused || cell.row === null || cell.col === null) return

      if (!this.originalSolvedBoard[cell.row][cell.col]) {
        this.selectedCell = cell
        // console.info('selectedCell b', cell)
      } else {
        this.clearSelectedCell()
      }
    },
    clearSelectedCell() {
      this.selectedCell = { row: null, col: null }
    },
    // digit actions
    onDigitClick(digit: number | null) {
      // console.info('onDigitClick a', digit, this.selectedCell)
      if (this.isGamePaused || this.selectedCell.row === null || this.selectedCell.col === null) return

      const { row, col } = this.selectedCell
      // const isCorrectGuess = digit === this.solvedBoard[row][col]
      // console.info('onDigitClick b', digit, 'correct', this.solvedBoard[row][col], digit === this.solvedBoard[row][col])
      // if (isCorrectGuess) {
      this.playBoard[row][col] = digit
      // }
    },
    startGame() {
      console.info('START GAME!!')
      this.generateNewGame(this.selectedDifficulty)
      this.hideIntro()
      startTime()
    },
    resetGame() {
      // if (this.isGamePaused) return

      console.info('RESET GAME!!')
      this.resetHintsNumber()
      this.clearSelectedCell()
      // reset points TODO:
      this.generateNewGame(this.selectedDifficulty)
      resetTime()
    },
    // game logic
    // sudoku engine
    generateNewGame(difficulty: Difficulty) {
      this.setActualGameDifficulty(difficulty)
      console.info('GENERATE BOARD !!', difficulty)
      this.changeGameStatus('playing')
      const sudokuEngine = useSudokuEngine()
      this.solvedBoard = sudokuEngine.generateSolvedBoard()
      const { newBoard, originalBoard } = sudokuEngine.modifyBoardForPlay(this.solvedBoard, difficulty)
      this.playBoard = newBoard
      this.originalSolvedBoard = originalBoard
      console.info('solvedBoard', this.solvedBoard)
      console.info('playBoard', this.playBoard)
      console.info('originalSolvedBoard', this.originalSolvedBoard)
    },
  },
})
