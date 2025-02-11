import { useTimer } from '@/composables/useTimer'
import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import type {
  Cell,
  CompletedSection,
  Difficulty,
  GameAction,
  GameStatus,
  Records,
  SudokuState,
} from '@/types/sudokuTypes'
import { DIFFICULTIES, GET_BOX_INDEX, INITIAL_REMAINING_HINTS } from '@/constants/constants'
import { useSudokuEngine } from '@/composables/useSudokuEngine'
import { useScoreSystem } from '@/composables/useScoreSystem'
import { formatDate } from '@/utils/dates'

const { elapsedTime, startTime, pauseTime, resetTime } = useTimer()

const getLocalRecords = () => {
  if (localStorage.getItem('sudokuRecords')) {
    return JSON.parse(localStorage.getItem('sudokuRecords')!)
  } else {
    return {
      beginner: [],
      intermediate: [],
      hard: [],
      expert: [],
    }
  }
}

const setLocalRecords = (records: Records) => {
  localStorage.setItem('sudokuRecords', JSON.stringify(records))
}

export const useSudokuStore = defineStore('sudoku', {
  state: (): SudokuState => {
    const initialRecords = getLocalRecords()
    return {
      gameStatus: 'notStarted',
      isIntro: null,
      isModalOpen: false,
      selectedDifficulty: 'beginner' as Difficulty,
      actualGameDifficulty: 'beginner' as Difficulty,
      difficulties: DIFFICULTIES,
      hintsRemaining: INITIAL_REMAINING_HINTS,
      gameTime: elapsedTime,
      solvedBoard: Array(9)
        .fill(null)
        .map(() => Array(9).fill(null)),
      originalSolvedBoard: Array(9)
        .fill(null)
        .map(() => Array(9).fill(false)),
      playBoard: Array(9)
        .fill(null)
        .map(() => Array(9).fill(null)),
      selectedCell: { row: null, col: null },
      gameScore: 0,
      hintsUsed: 0,
      completedSections: [],
      gameScoreRecords: initialRecords,
    }
  },
  getters: {
    isGameOn(): boolean {
      return this.gameStatus !== 'notStarted'
    },
    canUseHint(): boolean {
      return this.hintsRemaining > 0
    },
    formattedTime(): string {
      const minutes = Math.floor(this.gameTime / 60)
      const seconds = this.gameTime % 60

      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    isGamePlaying(): boolean {
      return this.gameStatus === 'playing'
    },
    isGamePaused(): boolean {
      return this.gameStatus === 'paused'
    },
    isGameFinished(): boolean {
      return this.gameStatus === 'finished'
    },
  },

  actions: {
    // game control
    changeGameStatus(newStatus: GameStatus) {
      this.gameStatus = newStatus
    },
    // intro shown
    showIntro() {
      this.isIntro = true
    },
    hideIntro() {
      this.isIntro = false
    },
    // modal
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    // difficulty
    setSelectedDifficulty(newDiff: Difficulty) {
      this.selectedDifficulty = newDiff
    },
    setActualGameDifficulty(newDiff: Difficulty) {
      this.actualGameDifficulty = newDiff
    },
    // hints
    resetHintsNumber() {
      this.hintsRemaining = INITIAL_REMAINING_HINTS
    },
    deductHints() {
      this.hintsRemaining -= 1
    },
    resetHintsUsed() {
      this.hintsUsed = 0
    },
    // game controls
    togglePause() {
      if (this.isGamePlaying) {
        this.changeGameStatus('paused')
        pauseTime()
      } else if (this.isGamePaused) {
        this.changeGameStatus('playing')
        startTime()
      }
    },
    // cell actions
    setSelectedCell(cell: Cell) {
      if (this.isGamePaused || cell.row === null || cell.col === null) return

      if (!this.originalSolvedBoard[cell.row][cell.col]) {
        this.selectedCell = cell
      } else {
        this.clearSelectedCell()
      }
    },
    clearSelectedCell() {
      this.selectedCell = { row: null, col: null }
    },
    startGame() {
      this.generateNewGame(this.selectedDifficulty)
      this.hideIntro()
      startTime()
    },
    resetGame() {
      resetTime()
      this.updateScore('reset')
      this.resetHintsNumber()
      this.clearSelectedCell()
      this.resetHintsUsed()
      this.resetCompletedSections()
      this.generateNewGame(this.selectedDifficulty)
    },
    // game logic | sudoku engine
    generateNewGame(difficulty: Difficulty) {
      this.solvedBoard = Array(9)
        .fill(null)
        .map(() => Array(9).fill(null))
      this.originalSolvedBoard = Array(9)
        .fill(null)
        .map(() => Array(9).fill(false))
      this.playBoard = Array(9)
        .fill(null)
        .map(() => Array(9).fill(null))
      this.setActualGameDifficulty(difficulty)
      this.changeGameStatus('playing')

      const sudokuEngine = useSudokuEngine()
      this.solvedBoard = sudokuEngine.generateSolvedBoard()
      const { newBoard, originalBoard } = sudokuEngine.modifyBoardForPlay(this.solvedBoard, difficulty)
      this.playBoard = newBoard
      this.originalSolvedBoard = originalBoard
    },
    // user actions
    useHint() {
      const { row, col } = this.selectedCell
      if (
        !this.canUseHint ||
        !this.isGamePlaying ||
        row === null ||
        col === null ||
        this.playBoard[row][col] === this.solvedBoard[row][col] // is already a correct digit
      )
        return

      this.playBoard[row][col] = this.solvedBoard[row][col]

      this.updateScore('hint')
      this.deductHints()
      this.checkBoard(row, col)
    },
    onDigitClick(digit: number | null) {
      const { row, col } = this.selectedCell
      if (
        this.isGamePaused ||
        row === null ||
        col === null ||
        this.playBoard[row][col] === this.solvedBoard[row][col] // is already a correct digit
      )
        return

      this.playBoard[row][col] = digit

      if (digit === this.solvedBoard[row][col]) {
        // is corect digit entered
        this.updateScore('correct')
        this.checkBoard(row, col)
      } else {
        this.updateScore('error')
      }
    },
    // score system
    updateScore(action: GameAction) {
      const { correctGuess, wrongGuess, useHint, resetScore, calculateWinningScore } = useScoreSystem()

      switch (action) {
        case 'finish':
          calculateWinningScore(this.gameTime)
          this.clearSelectedCell()
          break
        case 'hint':
          useHint()
          this.clearSelectedCell()
          break
        case 'correct':
          correctGuess()
          this.clearSelectedCell()
          break
        case 'error':
          wrongGuess()
          break
        case 'reset':
          resetScore()
          break
      }
    },
    // check board & endgame
    addCompletedSection(section: CompletedSection) {
      this.completedSections.push(section)
    },
    resetCompletedSections() {
      this.completedSections.length = 0
    },
    checkBoard(row: number, col: number) {
      const sudokuEngine = useSudokuEngine()
      let checkEndGame = false

      if (sudokuEngine.checkSection(this.playBoard, this.solvedBoard, 'row', row)) {
        this.addCompletedSection({ type: 'row', index: row })
        checkEndGame = true
      }
      if (sudokuEngine.checkSection(this.playBoard, this.solvedBoard, 'col', col)) {
        this.addCompletedSection({ type: 'col', index: col })
        checkEndGame = true
      }
      const boxIndex = GET_BOX_INDEX(row, col)
      if (sudokuEngine.checkSection(this.playBoard, this.solvedBoard, 'box', boxIndex)) {
        this.addCompletedSection({ type: 'box', index: boxIndex })
        checkEndGame = true
      }

      if (checkEndGame && sudokuEngine.checkIsBoardFinished(this.playBoard, this.solvedBoard)) {
        this.finishGame()
      }
    },
    // endgame
    finishGame() {
      pauseTime()
      this.changeGameStatus('finished')
      this.updateScore('finish')
      this.updateScoreBoards()
    },
    updateScoreBoards() {
      let actualBoard = toRaw(this.gameScoreRecords[this.selectedDifficulty])
      const newRecord = toRaw({
        score: this.gameScore,
        time: this.gameTime,
        date: formatDate(new Date()),
      })
      actualBoard.push(newRecord)
      actualBoard = actualBoard.sort((a, b) => b.score - a.score)
      actualBoard = actualBoard.slice(0, 3)

      this.gameScoreRecords[this.selectedDifficulty] = actualBoard
      setLocalRecords(this.gameScoreRecords)
    },
  },
})
