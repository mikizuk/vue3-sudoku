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
  gameTime: Ref<number, number>
  solvedBoard: SudokuBoard
  playedBoard: SudokuBoard
  selectedCell: { row: number; col: number } | null
}
