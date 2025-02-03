import { type Ref } from 'vue'
import { useTimer } from '@/composables/useTimer'
import { defineStore } from 'pinia'

export const difficulties: Difficulty[] = ['testing', 'beginner', 'intermediate', 'hard', 'expert']
export type Difficulty = 'testing' | 'beginner' | 'intermediate' | 'hard' | 'expert'
export type GameStatus = 'notStarted' | 'playing' | 'paused' | 'finished'

interface SudokuState {
  gameStatus: GameStatus
  isIntro: null | boolean
  isModalOpen: boolean
  difficulty: Difficulty
  difficulties: Difficulty[]
  hintsRemaining: number
  board: number[][]
  gameTime: Ref<number, number>
}
const { elapsedTime, startTime, pauseTime, resetTime } = useTimer()

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState => ({
    gameStatus: 'notStarted',
    isIntro: null,
    isModalOpen: false,
    difficulty: 'beginner' as Difficulty,
    difficulties,
    hintsRemaining: 10,
    board: Array(9)
      .fill(null)
      .map(() => Array(9).fill(0)),
    gameTime: elapsedTime,
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
      console.info('changeGameStatus', newStatus)
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
    // game controls
    startGame() {
      this.hideIntro()
      this.changeGameStatus('playing')
      startTime()
    },
    resetGame() {
      // TODO: reset whole game! mind current difficulty, reset points
      this.changeGameStatus('playing')
      resetTime()
      this.resetHintsNumber()
    },
    togglePause() {
      if (this.isGamePlaying) {
        this.gameStatus = 'paused'
        pauseTime()
      } else if (this.isGamePaused) {
        this.gameStatus = 'playing'
        startTime()
      }
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
  },
})
