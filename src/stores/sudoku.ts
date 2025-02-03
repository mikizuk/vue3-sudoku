import { defineStore } from 'pinia'

export const difficulties: Difficulty[] = ['testing', 'beginner', 'intermediate', 'hard', 'expert']
export type Difficulty = 'testing' | 'beginner' | 'intermediate' | 'hard' | 'expert'

interface SudokuState {
  isIntroShown: null | boolean
  isModalOpen: boolean
  difficulty: Difficulty
  difficulties: Difficulty[]
  isGameInprogress: boolean
  isPaused: boolean
  hintsRemaining: number
}

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState => ({
    isIntroShown: null,
    isModalOpen: false,
    difficulty: 'beginner' as Difficulty,
    difficulties,
    isGameInprogress: false,
    isPaused: false,
    hintsRemaining: 10,
  }),

  getters: {
    canUseHint(): boolean {
      return this.hintsRemaining > 0
      // and selected cell is empty TODO:
    },
  },

  actions: {
    // intro shown
    showIntro() {
      this.isIntroShown = true
    },
    hideIntro() {
      this.isIntroShown = false
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
      this.isGameInprogress = true
      // this.isIntroShown = false;
      this.hideIntro()
    },
    resetGame() {
      console.info('reset!')
      // reset whole game! // TODO:
      // reset hintsRemaining // TODO:
    },
    //  pause game
    togglePause() {
      this.isPaused = !this.isPaused
    },
    // hints
    useHint() {
      if (!this.canUseHint || this.isPaused) return

      this.hintsRemaining -= 1
      // give hint TODO:
      // add penalty TODO:
      // chnage score TODO:
      // fill the board TODO:
    },
  },
})
