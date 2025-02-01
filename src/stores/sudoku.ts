import { defineStore } from "pinia";

interface SudokuState {
  isIntroShown: null | boolean;
}

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState =>  ({
    isIntroShown: null,
  }),

  actions: {
    showIntro() {
      this.isIntroShown = true;
    },
    hideIntro() {
      this.isIntroShown = false;
    }
  }
})