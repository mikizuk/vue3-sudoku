import { defineStore } from 'pinia'

export const difficulties: Difficulty[] = ['testing', 'beginner', 'intermediate', 'hard', 'expert']
export type Difficulty = 'testing' | 'beginner' | 'intermediate' | 'hard' | 'expert'

interface SudokuState {
  isIntroShown: null | boolean
  isModalOpen: boolean
  difficulty: Difficulty
  difficulties: Difficulty[]
  isGameInprogress: boolean
  // isGamePaused: boolean;
}

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState => ({
    isIntroShown: null,
    isModalOpen: false,
    difficulty: 'beginner' as Difficulty,
    difficulties,
    isGameInprogress: false,
  }),

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
    // start & pause game
    startGame() {
      this.isGameInprogress = true
      // this.isIntroShown = false;
      this.hideIntro()
    },
  },
})
