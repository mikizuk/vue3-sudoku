import { defineStore } from "pinia";

type Difficulty = 'testing' | 'beginner' | 'intermediate' | 'hard' | 'expert';

interface SudokuState {
  isIntroShown: null | boolean;
  isModalOpen: boolean;
  difficulty: Difficulty;
}

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState =>  ({
    isIntroShown: null,
    isModalOpen: false,
    difficulty: 'intermediate'
  }),

  actions: {
    showIntro() {
      this.isIntroShown = true;
    },
    hideIntro() {
      this.isIntroShown = false;
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    }
  }
})