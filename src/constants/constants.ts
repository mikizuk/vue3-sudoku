import type { Difficulty, DifficultyRange } from '@/types/sudokuTypes'

export const DIFFICULTIES: Difficulty[] = ['testing', 'beginner', 'intermediate', 'hard', 'expert']

export const DIFFICULTY_RANGES: Record<Difficulty, DifficultyRange> = {
  testing: { min: 5, max: 6 },
  beginner: { min: 41, max: 45 },
  intermediate: { min: 45, max: 49 },
  hard: { min: 49, max: 53 },
  expert: { min: 53, max: 57 },
}

export const WRONG_GUESS_POINTS = 1
export const CORRECT_GUESS_POINTS = 5
export const INITIAL_REMAINING_HINTS = 10
export const INITIAL_HINT_PENALTY = 3
export const NEXT_HINT_PENALTY = 1

export const GET_BOX_ROW_INDEX = (row: number) => Math.floor(row / 3) * 3
export const GET_BOX_COL_INDEX = (col: number) => Math.floor(col / 3)
export const GET_BOX_INDEX = (row: number, col: number) => GET_BOX_ROW_INDEX(row) + GET_BOX_COL_INDEX(col)