import { useTimer } from '@/composables/useTimer'
import { defineStore } from 'pinia'
import type { Cell, CompletedSection, Difficulty, GameAction, GameStatus, SudokuState } from '@/types/sudokuTypes'
import {
  DIFFICULTIES,
  FALSE_SUDOKU_BOARD,
  GET_BOX_INDEX,
  INITIAL_REMAINING_HINTS,
  NULL_SUDOKU_BOARD,
} from '@/constants/constants'
import { useSudokuEngine } from '@/composables/useSudokuEngine'
import { useScoreSystem } from '@/composables/useScoreSystem'

const { elapsedTime, startTime, pauseTime, resetTime } = useTimer()

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState => ({
    gameStatus: 'notStarted',
    isIntro: null,
    isModalOpen: false,
    selectedDifficulty: 'beginner' as Difficulty,
    actualGameDifficulty: 'beginner' as Difficulty,
    difficulties: DIFFICULTIES,
    hintsRemaining: INITIAL_REMAINING_HINTS,
    gameTime: elapsedTime,
    solvedBoard: NULL_SUDOKU_BOARD,
    originalSolvedBoard: FALSE_SUDOKU_BOARD,
    playBoard: NULL_SUDOKU_BOARD,
    selectedCell: { row: null, col: null },
    gameScore: 0,
    hintsUsed: 0,
    completedSections: [],
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
    },
    isGameFinished(): boolean {
      return this.gameStatus === 'finished'
    },
  },

  actions: {
    // game control
    changeGameStatus(newStatus: GameStatus) {
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
      this.hintsRemaining = INITIAL_REMAINING_HINTS
    },
    deductHints() {
      this.hintsRemaining -= 1
    },
    resetHintsUsed() {
      this.hintsUsed = 0
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
      if (this.isGamePaused || cell.row === null || cell.col === null) return

      if (!this.originalSolvedBoard[cell.row][cell.col]) {
        this.selectedCell = cell
      } else {
        this.clearSelectedCell()
      }
    },
    clearSelectedCell() {
      this.selectedCell = { row: null, col: null }
    },
    startGame() {
      this.generateNewGame(this.selectedDifficulty)
      this.hideIntro()
      startTime()
    },
    resetGame() {
      resetTime()
      this.updateScore('reset')
      this.resetHintsNumber()
      this.clearSelectedCell()
      this.resetHintsUsed()
      this.resetCompletedSections()
      this.generateNewGame(this.selectedDifficulty)
    },
    // game logic | sudoku engine
    generateNewGame(difficulty: Difficulty) {
      this.solvedBoard = NULL_SUDOKU_BOARD
      this.originalSolvedBoard = FALSE_SUDOKU_BOARD
      this.playBoard = NULL_SUDOKU_BOARD
      this.setActualGameDifficulty(difficulty)
      this.changeGameStatus('playing')

      const sudokuEngine = useSudokuEngine()
      this.solvedBoard = sudokuEngine.generateSolvedBoard()
      const { newBoard, originalBoard } = sudokuEngine.modifyBoardForPlay(this.solvedBoard, difficulty)
      this.playBoard = newBoard
      this.originalSolvedBoard = originalBoard
    },
    // user actions
    useHint() {
      const { row, col } = this.selectedCell
      if (
        !this.canUseHint ||
        !this.isGamePlaying ||
        row === null ||
        col === null ||
        this.playBoard[row][col] === this.solvedBoard[row][col] // is already a correct digit
      ) return

      this.playBoard[row][col] = this.solvedBoard[row][col]

      this.updateScore('hint')
      this.deductHints()
      this.checkBoard(row, col)
    },
    onDigitClick(digit: number | null) {
      const { row, col } = this.selectedCell
      if (
        this.isGamePaused ||
        row === null ||
        col === null ||
        this.playBoard[row][col] === this.solvedBoard[row][col] // is already a correct digit
      ) return

      this.playBoard[row][col] = digit

      if (digit === this.solvedBoard[row][col]) { // is corect digit entered
        this.updateScore('correct')
        this.checkBoard(row, col)
      } else {
        this.updateScore('error')
      }
    },
    // score system
    updateScore(action: GameAction) {
      const {
        correctGuess,
        wrongGuess,
        useHint,
        resetScore,
        calculateWinningScore
      } = useScoreSystem() // this.gameScore

      switch (action) {
        case 'finish':
          calculateWinningScore(this.gameTime)
          this.clearSelectedCell()
          break
        case 'hint':
          useHint()
          this.clearSelectedCell()
          break
        case 'correct':
          correctGuess()
          this.clearSelectedCell()
          break
        case 'error':
          wrongGuess()
          break
        case 'reset':
          resetScore()
          break
      }
    },
    // check board & endgame
    addCompletedSection(section: CompletedSection) {
      this.completedSections.push(section)
    },
    resetCompletedSections() {
      this.completedSections.length = 0
    },
    checkBoard(row: number, col: number) {
      const sudokuEngine = useSudokuEngine()
      let checkEndGame = false

      if (sudokuEngine.checkSection(this.playBoard, this.solvedBoard, 'row', row)) {
        this.addCompletedSection({ type: 'row', index: row })
        checkEndGame = true
      }
      if (sudokuEngine.checkSection(this.playBoard, this.solvedBoard, 'col', col)) {
        this.addCompletedSection({ type: 'col', index: col })
        checkEndGame = true
      }
      const boxIndex = GET_BOX_INDEX(row, col)
      if (sudokuEngine.checkSection(this.playBoard, this.solvedBoard, 'box', boxIndex)) {
        this.addCompletedSection({ type: 'box', index: boxIndex })
        checkEndGame = true
      }

      if (checkEndGame && sudokuEngine.checkIsBoardFinished(this.playBoard, this.solvedBoard)) {
        this.finishGame()  
      }
    },
    // endgame
    finishGame() {
      pauseTime()
      this.changeGameStatus('finished')
      this.updateScore('finish')
    },
  },
})
