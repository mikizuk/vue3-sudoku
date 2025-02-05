import { useTimer } from '@/composables/useTimer'
import { defineStore } from 'pinia'
import type { Difficulty, GameStatus, SudokuState } from '@/types/sudokuTypes'
import { DIFFICULTIES } from '@/constants/constants'
import { useSudokuEngine } from '@/composables/useSudokuEngine'

const { elapsedTime, startTime, pauseTime, resetTime } = useTimer()

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState => ({
    gameStatus: 'notStarted',
    isIntro: null,
    isModalOpen: false,
    difficulty: 'beginner' as Difficulty,
    difficulties: DIFFICULTIES,
    hintsRemaining: 10,
    solvedBoard: Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
    gameTime: elapsedTime,
    // selectedCell: null
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
    setDifficulty(level: Difficulty) {
      this.difficulty = level
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
    startGame() {
      console.info('START GAME!!')
      this.hideIntro()
      startTime()
      this.generateNewGame(this.difficulty)
    },
    resetGame() {
      if (this.isGamePaused) return

      console.info('RESET GAME!!')
      this.resetHintsNumber()
      resetTime()
      // reset points TODO:
      this.generateNewGame(this.difficulty)
    },
    // game logic
    generateNewGame(difficulty: Difficulty) {
      console.info('GENERATE BOARD !!', difficulty)
      this.changeGameStatus('playing')
      this.createSolvedBoard()
      // this.createPlayableBoard()
    },
    // sudoku engine
    createSolvedBoard() {
      const sudokuEngine = useSudokuEngine()
      this.solvedBoard = sudokuEngine.generateSolvedBoard()
    },
    createPlayableBoard() {
      console.info('CREATE PLAYER BOARD !!')
    },
  },
})
