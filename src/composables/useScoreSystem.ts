import { INITIAL_HINT_PENALTY } from '@/constants/constants'
import { ref, toValue } from 'vue'
import { useSudokuStore } from '@/stores/sudoku'
import { storeToRefs } from 'pinia'
/**
- Every correct cell will result in +5 points
- Every hint will result in -3 points
- Every next hint will be -1 from the previously subtracted hint points (i.e. if first hint has decreased 3 points,
the next will result in minus 4, the next next in minus 5, etc)
- Every error will result in -1 point.
 */

export function useScoreSystem() {
  const store = useSudokuStore()
  const { score } = storeToRefs(store)
  const hintUsed = ref(0)
  // const hintPenalty = () => {
  // INITIAL_HINT_PENALTY
  // NEXT_HINT_PENALTY
  // }

  // const error

  // const useHint = () => {
  //   let nextHintPenalty = 0
  // }

  const actualScore = toValue(score)
  console.info('actualScore', actualScore)

  return {
    actualScore,
  }
}
