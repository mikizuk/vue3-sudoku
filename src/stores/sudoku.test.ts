import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSudokuStore } from '@/stores/sudoku'

import type { Cell } from '@/types/sudokuTypes'

vi.mock('@/composables/useTimer', () => ({
  useTimer: () => ({
    elapsedTime: vi.fn(() => 0),
    startTime: vi.fn(),
    pauseTime: vi.fn(),
    resetTime: vi.fn(),
  }),
}))

vi.mock('@/composables/useSudokuEngine', () => ({
  useSudokuEngine: () => ({
    generateSolvedBoard: () =>
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(5)),
    modifyBoardForPlay: () => ({
      newBoard: Array(9)
        .fill(null)
        .map(() => Array(9).fill(null)),
      originalBoard: Array(9)
        .fill(null)
        .map(() => Array(9).fill(false)),
    }),
  }),
}))

describe('Sudoku Store', () => {
  let store: ReturnType<typeof useSudokuStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    store = useSudokuStore()
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(store.gameStatus).toBe('notStarted')
      expect(store.isIntro).toBeNull()
      expect(store.isModalOpen).toBe(false)
      expect(store.selectedDifficulty).toBe('beginner')
      expect(store.actualGameDifficulty).toBe('beginner')
      expect(store.hintsRemaining).toBe(10)
      expect(store.selectedCell).toEqual({ row: null, col: null })
    })
  })

  describe('Getters', () => {
    it('should determine if game is on', () => {
      expect(store.isGameOn).toBe(false)
      store.changeGameStatus('playing')
      expect(store.isGameOn).toBe(true)
    })

    it('should determine if hints can be used', () => {
      expect(store.canUseHint).toBe(true)
      store.hintsRemaining = 0
      expect(store.canUseHint).toBe(false)
    })

    it('should format time correctly', () => {
      store.gameTime = 65
      expect(store.formattedTime).toBe('01:05')
    })

    it('should determine game playing status', () => {
      expect(store.isGamePlaying).toBe(false)
      store.changeGameStatus('playing')
      expect(store.isGamePlaying).toBe(true)
    })

    it('should determine game paused status', () => {
      expect(store.isGamePaused).toBe(false)
      store.changeGameStatus('paused')
      expect(store.isGamePaused).toBe(true)
    })
  })

  describe('Game Control Actions', () => {
    it('should change game status', () => {
      store.changeGameStatus('playing')
      expect(store.gameStatus).toBe('playing')
    })

    it('should handle intro visibility', () => {
      store.showIntro()
      expect(store.isIntro).toBe(true)
      store.hideIntro()
      expect(store.isIntro).toBe(false)
    })

    it('should toggle modal', () => {
      store.toggleModal()
      expect(store.isModalOpen).toBe(true)
      store.toggleModal()
      expect(store.isModalOpen).toBe(false)
    })
  })

  describe('Difficulty Management', () => {
    it('should set selected difficulty', () => {
      store.setSelectedDifficulty('expert')
      expect(store.selectedDifficulty).toBe('expert')
    })

    it('should set actual game difficulty', () => {
      store.setActualGameDifficulty('hard')
      expect(store.actualGameDifficulty).toBe('hard')
    })
  })

  describe('Hint System', () => {
    it('should reset hints number', () => {
      store.hintsRemaining = 5
      store.resetHintsNumber()
      expect(store.hintsRemaining).toBe(10)
    })

    it('should not use hint when game is paused', () => {
      store.changeGameStatus('paused')
      store.useHint()
      expect(store.hintsRemaining).toBe(10)
    })
  })

  describe('Game Controls', () => {
    it('should toggle pause', () => {
      store.changeGameStatus('playing')
      store.togglePause()
      expect(store.gameStatus).toBe('paused')
      store.togglePause()
      expect(store.gameStatus).toBe('playing')
    })
  })

  describe('Cell Management', () => {
    it('should set selected cell', () => {
      const cell: Cell = { row: 1, col: 1 }
      store.setSelectedCell(cell)
      expect(store.selectedCell).toEqual(cell)
    })

    it('should not set selected cell when game is paused', () => {
      store.changeGameStatus('paused')
      const cell: Cell = { row: 1, col: 1 }
      store.setSelectedCell(cell)
      expect(store.selectedCell).toEqual({ row: null, col: null })
    })

    it('should clear selected cell', () => {
      store.setSelectedCell({ row: 1, col: 1 })
      store.clearSelectedCell()
      expect(store.selectedCell).toEqual({ row: null, col: null })
    })
  })

  describe('Digit Actions', () => {
    // it('should handle digit click', () => {
    //   store.changeGameStatus('playing')
    //   store.setSelectedCell({ row: 1, col: 1 })
    //   store.onDigitClick(5)
    //   expect(store.playBoard[1][1]).toBe(5)
    // })

    it('should not handle digit click when game is paused', () => {
      store.changeGameStatus('paused')
      store.setSelectedCell({ row: 1, col: 1 })
      store.onDigitClick(5)
      expect(store.playBoard[1][1]).toBeNull()
    })
  })

  describe('Game Flow', () => {
    it('should start game', () => {
      store.startGame()
      expect(store.gameStatus).toBe('playing')
      expect(store.isIntro).toBe(false)
    })

    it('should reset game', () => {
      store.resetGame()
      expect(store.hintsRemaining).toBe(10)
      expect(store.selectedCell).toEqual({ row: null, col: null })
      expect(store.gameStatus).toBe('playing')
    })

    it('should generate new game', () => {
      store.generateNewGame('expert')
      expect(store.actualGameDifficulty).toBe('expert')
      expect(store.gameStatus).toBe('playing')
      expect(store.solvedBoard).toBeDefined()
      expect(store.playBoard).toBeDefined()
      expect(store.originalSolvedBoard).toBeDefined()
    })
  })

  describe('Game End & Score Handling', () => {
    it('should finish game and update state', () => {
      store.finishGame()
      expect(store.gameStatus).toBe('finished')
    })

    it('should update scoreboards correctly', () => {
      store.gameScore = 1000
      store.gameTime = 300
      store.updateScoreBoards()

      const records = store.gameScoreRecords[store.selectedDifficulty]
      expect(records.length).toBeGreaterThan(0)
      expect(records[0].score).toBe(1000)
      expect(records[0].time).toBe(300)
    })
  })
})
