import { type Ref } from 'vue'

export type Difficulty = 'testing' | 'beginner' | 'intermediate' | 'hard' | 'expert'
export type GameStatus = 'notStarted' | 'playing' | 'paused' | 'finished'

export interface DifficultyRange {
  min: number
  max: number
}

export interface SudokuState {
  gameStatus: GameStatus
  isIntro: null | boolean
  isModalOpen: boolean
  difficulty: Difficulty
  difficulties: Difficulty[]
  hintsRemaining: number
  board: number[][]
  gameTime: Ref<number, number>
  // selectedCell: { row: number, col: number } | null
}
