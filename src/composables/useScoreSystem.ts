import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
import {
  CORRECT_GUESS_POINTS,
  GET_TOTAL_SCORE,
  INITIAL_HINT_PENALTY,
  NEXT_HINT_PENALTY,
  WINNING_SCORE,
  WRONG_GUESS_POINTS,
} from '@/constants/constants'

export function useScoreSystem() {
  const store = useSudokuStore()
  const { gameScore, hintsUsed } = storeToRefs(store)

  const correctGuess = () => {
    gameScore.value += CORRECT_GUESS_POINTS
  }
  const wrongGuess = () => {
    gameScore.value -= WRONG_GUESS_POINTS
  }
  const useHint = () => {
    const hintPenalty =
      hintsUsed.value === 0 ? INITIAL_HINT_PENALTY : INITIAL_HINT_PENALTY + hintsUsed.value * NEXT_HINT_PENALTY
    gameScore.value -= hintPenalty
    hintsUsed.value += 1
  }

  const resetScore = () => {
    gameScore.value = 0
  }

  const calculateWinningScore = (gameTime: number) => {
    gameScore.value = GET_TOTAL_SCORE(gameScore.value, gameTime)
  }

  return {
    correctGuess,
    wrongGuess,
    useHint,
    resetScore,
    calculateWinningScore
  }
}
