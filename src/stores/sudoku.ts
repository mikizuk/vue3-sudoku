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
}

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState => ({
    gameStatus: 'notStarted',
    isIntro: null,
    isModalOpen: false,
    difficulty: 'beginner' as Difficulty,
    difficulties,
    hintsRemaining: 10,
  }),

  getters: {
    isGameOn(): boolean {
      return this.gameStatus !== 'notStarted'
    },
    canUseHint(): boolean {
      return this.hintsRemaining > 0
      // and selected cell is empty TODO:
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
    // modal open
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    // difficulty
    setDifficulty(level: Difficulty) {
      this.difficulty = level
    },
    // start & reset game
    startGame() {
      this.hideIntro()
      this.changeGameStatus('playing')
    },
    resetGame() {
      console.info('reset!')
      // reset whole game! // TODO:
      // reset hintsRemaining // TODO:
    },
    //  pause game
    togglePause() {
      if (this.isGamePlaying) {
        this.gameStatus = 'paused'
      } else if (this.isGamePaused) {
        this.gameStatus = 'playing'
      }
    },
    // hints
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
