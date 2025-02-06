import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TheBoard from './TheBoard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useSudokuStore } from '@/stores/sudoku'

describe('TheBoard', () => {
  let wrapper: VueWrapper
  let store: ReturnType<typeof useSudokuStore>

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        sudoku: {
          solvedBoard: [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
          ],
          playBoard: [
            [1, null, 3, null, null, 6, null, null, null],
            [null, 5, null, null, 8, null, 1, null, null],
            [7, null, null, 1, null, null, null, 5, null],
            [null, null, 4, null, 6, null, null, 9, null],
            [null, 6, null, null, null, null, null, 3, null],
            [null, 9, null, null, 3, null, 5, null, null],
            [null, null, null, null, null, 8, null, null, 2],
            [null, null, 8, null, 1, null, null, 4, null],
            [null, null, null, 3, null, null, 6, null, 8],
          ],
          originalSolvedBoard: [
            [true, false, true, false, false, true, false, false, false],
            [false, true, false, false, true, false, true, false, false],
            [true, false, false, true, false, false, false, true, false],
            [false, false, true, false, true, false, false, true, false],
            [false, true, false, false, false, false, false, true, false],
            [false, true, false, false, true, false, true, false, false],
            [false, false, false, false, false, true, false, false, true],
            [false, false, true, false, true, false, false, true, false],
            [false, false, false, true, false, false, true, false, true],
          ],
          isGamePaused: false,
          gameTime: 300,
          gameStatus: 'playing',
          selectedCell: { row: -1, col: -1 },
        },
      },
    })
    wrapper = mount(TheBoard, {
      global: {
        plugins: [pinia],
      },
    })

    store = useSudokuStore()
  })

  // Rest of the tests remain the same...
  it('renders the board with correct structure', () => {
    expect(wrapper.find('table.board').exists()).toBe(true)
    expect(wrapper.findAll('tr.board__row')).toHaveLength(9)
    expect(wrapper.findAll('td.board__cell')).toHaveLength(81)
    expect(wrapper.findAll('button.board__button')).toHaveLength(81)
  })

  describe('Cell styling', () => {
    it('identifies selected cell correctly', async () => {
      store.selectedCell = { row: 2, col: 3 }
      await wrapper.vm.$nextTick()

      const selectedButton = wrapper.findAll('button.board__button')[2 * 9 + 3]
      expect(selectedButton.classes()).toContain('board__cell--selected')

      const nonSelectedButton = wrapper.findAll('button.board__button')[0]
      expect(nonSelectedButton.classes()).not.toContain('board__cell--selected')
    })

    it('identifies correct cells', async () => {
      // Set a correct value in an empty cell
      const row = 0
      const col = 1 // This cell is null in playBoard and false in originalSolvedBoard
      store.playBoard[row][col] = 2 // Matches solved board value
      await wrapper.vm.$nextTick()

      const correctButton = wrapper.findAll('button.board__button')[row * 9 + col]
      expect(correctButton.classes()).toContain('board__cell--correct')
    })

    it('identifies error cells', async () => {
      // Set an incorrect value in an empty cell
      const row = 0
      const col = 1
      store.playBoard[row][col] = 5 // Doesn't match solved board value (2)
      await wrapper.vm.$nextTick()

      const errorButton = wrapper.findAll('button.board__button')[row * 9 + col]
      expect(errorButton.classes()).toContain('board__cell--error')
    })

    it('identifies original cells', async () => {
      // Test an original cell (1,1) which has true in originalSolvedBoard
      const originalButton = wrapper.findAll('button.board__button')[1 * 9 + 1] // (1,1) position
      expect(originalButton.classes()).toContain('board__cell--original')

      // Test a non-original cell
      const nonOriginalButton = wrapper.findAll('button.board__button')[0 * 9 + 1] // (0,1) position
      expect(nonOriginalButton.classes()).not.toContain('board__cell--original')
    })

    it('handles empty cells correctly', async () => {
      // Test a cell that's initially empty (null)
      const emptyButton = wrapper.findAll('button.board__button')[0 * 9 + 1] // (0,1) position
      expect(emptyButton.classes()).not.toContain('board__cell--error')
      expect(emptyButton.classes()).not.toContain('board__cell--correct')
    })

    it('correctly handles combinations of states', async () => {
      const row = 0
      const col = 1
      // Set up a non-original cell that's selected and correct
      store.selectedCell = { row, col }
      store.playBoard[row][col] = 2 // Matches solved board value
      await wrapper.vm.$nextTick()

      const button = wrapper.findAll('button.board__button')[row * 9 + col]
      expect(button.classes()).toContain('board__cell--selected')
      expect(button.classes()).toContain('board__cell--correct')
      expect(button.classes()).not.toContain('board__cell--original')
      expect(button.classes()).not.toContain('board__cell--error')
    })
  })

  it('computes board blur state correctly', async () => {
    expect(wrapper.find('table.board').classes()).not.toContain('board--blurred')

    store.gameStatus = 'paused'
    await wrapper.vm.$nextTick()
    expect(wrapper.find('table.board').classes()).toContain('board--blurred')

    store.gameStatus = 'playing'
    store.gameTime = 0
    await wrapper.vm.$nextTick()
    expect(wrapper.find('table.board').classes()).toContain('board--blurred')
  })
})
