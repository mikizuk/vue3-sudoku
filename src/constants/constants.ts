import type { Difficulty, DifficultyRange } from '@/types/sudokuTypes'

export const DIFFICULTIES: Difficulty[] = ['testing', 'beginner', 'intermediate', 'hard', 'expert']

export const DIFFICULTYRANGES: Record<Difficulty, DifficultyRange> = {
  testing: { min: 15, max: 24 },
  beginner: { min: 41, max: 45 },
  intermediate: { min: 45, max: 49 },
  hard: { min: 49, max: 53 },
  expert: { min: 53, max: 57 },
}
