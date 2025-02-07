import type { Difficulty, DifficultyRange } from '@/types/sudokuTypes'

export const DIFFICULTIES: Difficulty[] = ['testing', 'beginner', 'intermediate', 'hard', 'expert']

export const DIFFICULTY_RANGES: Record<Difficulty, DifficultyRange> = {
  testing: { min: 15, max: 24 },
  beginner: { min: 41, max: 45 },
  intermediate: { min: 45, max: 49 },
  hard: { min: 49, max: 53 },
  expert: { min: 53, max: 57 },
}

export const INITIAL_HINT_REMAINING = 10
export const INITIAL_HINT_PENALTY = 3
export const NEXT_HINT_PENALTY = 1
