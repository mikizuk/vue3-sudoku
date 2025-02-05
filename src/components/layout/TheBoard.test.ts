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
          isGamePaused: false,
          gameTime: 300,
          gameStatus: 'playing',
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

  it('renders the board with correct structure', () => {
    expect(wrapper.find('table.board').exists()).toBe(true)
    expect(wrapper.findAll('tr.board__row')).toHaveLength(9)
    expect(wrapper.findAll('td.board__cell')).toHaveLength(81)
    expect(wrapper.findAll('button.board__button')).toHaveLength(81)
  })

  it('applies blur class when game is paused', async () => {
    expect(wrapper.find('table.board').classes()).not.toContain('board--blurred')

    store.gameStatus = 'paused'
    await wrapper.vm.$nextTick()

    expect(wrapper.find('table.board').classes()).toContain('board--blurred')
  })

  it('applies blur class when game time is 0', async () => {
    expect(wrapper.find('table.board').classes()).not.toContain('board--blurred')

    store.gameTime = 0
    await wrapper.vm.$nextTick()

    expect(wrapper.find('table.board').classes()).toContain('board--blurred')
  })

  it('calls setSelectedCell when a cell is clicked', async () => {
    const setSelectedCellSpy = vi.spyOn(store, 'setSelectedCell')

    // Click first cell (0,0)
    await wrapper.findAll('button.board__button')[0].trigger('click')
    expect(setSelectedCellSpy).toHaveBeenCalledWith(0, 0)

    // Click cell at position (3,4)
    await wrapper.findAll('button.board__button')[31].trigger('click')
    expect(setSelectedCellSpy).toHaveBeenCalledWith(3, 4)
  })

  it('applies selected class to the correct cell', async () => {
    store.selectedCell = { row: 2, col: 3 }
    await wrapper.vm.$nextTick()

    const selectedButton = wrapper.findAll('button.board__button')[2 * 9 + 3]
    expect(selectedButton.classes()).toContain('board__cell--selected')

    const nonSelectedButton = wrapper.findAll('button.board__button')[0]
    expect(nonSelectedButton.classes()).not.toContain('board__cell--selected')
  })

  it('updates selected cell when store changes', async () => {
    expect(wrapper.find('.board__cell--selected').exists()).toBe(false)

    store.selectedCell = { row: 1, col: 1 }
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('button.board__button')[10].classes()).toContain('board__cell--selected')

    store.selectedCell = { row: 2, col: 2 }
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('button.board__button')[20].classes()).toContain('board__cell--selected')
  })

  it('maintains reactivity with store updates', async () => {
    store.gameStatus = 'paused'
    store.gameTime = 0
    store.selectedCell = { row: 4, col: 4 }
    await wrapper.vm.$nextTick()

    expect(wrapper.find('table.board').classes()).toContain('board--blurred')
    expect(wrapper.findAll('button.board__button')[40].classes()).toContain('board__cell--selected')
  })
})
