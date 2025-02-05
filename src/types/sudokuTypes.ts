import { type Ref } from 'vue'

export type Difficulty = 'testing' | 'beginner' | 'intermediate' | 'hard' | 'expert'
export type GameStatus = 'notStarted' | 'playing' | 'paused' | 'finished'

export interface DifficultyRange {
  min: number
  max: number
}

export type SudokuBoard = number[][] | null[][]

export interface SudokuState {
  gameStatus: GameStatus
  isIntro: null | boolean
  isModalOpen: boolean
  difficulty: Difficulty
  difficulties: Difficulty[]
  hintsRemaining: number
  solvedBoard: SudokuBoard
  gameTime: Ref<number, number>
  // selectedCell: { row: number, col: number } | null
}
