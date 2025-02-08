import { type Ref } from 'vue'

export type Difficulty = 'testing' | 'beginner' | 'intermediate' | 'hard' | 'expert'
export type GameStatus = 'notStarted' | 'playing' | 'paused' | 'finished'
export type GameAction = 'correct' | 'error' | 'hint' | 'reset'
export type SectionType = 'row' | 'col' | 'box'

export interface DifficultyRange {
  min: number
  max: number
}

export interface Cell {
  row: number | null
  col: number | null
}

export interface CompletedSection {
  type: SectionType
  index: number
}

export type SudokuBoard = number[][] | null[][]

export interface SudokuState {
  gameStatus: GameStatus
  isIntro: null | boolean
  isModalOpen: boolean
  selectedDifficulty: Difficulty
  actualGameDifficulty: Difficulty
  difficulties: Difficulty[]
  hintsRemaining: number
  gameTime: Ref<number, number>
  solvedBoard: SudokuBoard
  originalSolvedBoard: SudokuBoard
  playBoard: SudokuBoard
  selectedCell: Cell
  gameScore: number
  hintsUsed: number
  completedSections: CompletedSection[]
}
