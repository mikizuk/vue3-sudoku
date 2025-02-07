# Vue3 Sudoku

A Sudoku game built with Vue 3 and Vite and Pinia. This project provides a simple and interactive Sudoku puzzle experience in the browser.

**[Demo link](https://mickey-sudoku.netlify.app)**

## Features

- Multiple difficulty levels
- Interactive grid with real-time input validation
- Smart hint system
- Timer and scoring system
- Records table with persistence
- Available digits tracking
- Mobile-responsive design

## Game Rules and Specifications

### Core Rules

- All classical Sudoku rules must be followed
- Each game is randomly generated, ensuring a unique experience
- Pre-filled cells cannot be edited
- Real-time error detection and validation

### Difficulty Levels

The game features 4 ranks with varying numbers of pre-filled cells (out of 81):

- Beginner: 36-40 cells visible
- Intermediate: 32-36 cells visible
- Hard: 28-32 cells visible
- Expert: 24-28 cells visible

### Hint System

- Available hints are indicated by a bulb icon
- Maximum of 10 hints per game
- Each hint reveals a correct cell value

### Scoring System

The scoring system consists of two parts:

#### Part 1: During Gameplay

- +5 points for each correct cell
- -3 points for the first hint
- Each subsequent hint increases the penalty by 1 point
  (e.g., -3, -4, -5, etc.)
- -1 point for each error

#### Part 2: Time Bonus

- Base time bonus of 500 points
- Final time bonus = 500 - elapsed time in seconds
- Added to Part 1 score upon successful completion

### Records System

- Maintains top 3 highest scores for each rank
- Persists across page refreshes
- Only successful game completions are eligible
- Tracks scores across all difficulty levels

### Interface Features

- Available digits display shows remaining numbers
- Numbers become grayed out when all instances are placed
- Real-time error highlighting
- Active cell highlighting takes precedence over error highlighting

## Tech Stack

- Vue 3 with Composition API
- TypeScript for type safety
- Vite as build tool
- Pinia: State management for Vue 3
- Vitest for unit testing
- ESLint for code quality

## Recommended IDE Setup

VSCode + Volar (disable Vetur for best experience)

### Type Support for `.vue` Imports in TypeScript

Since TypeScript does not handle `.vue` imports by default, we use `vue-tsc` for type checking. Install Volar to enable TypeScript support in `.vue` files.

## Project Setup

```bash
# Install dependencies
npm install

# Compile and hot-reload for development
npm run dev

# Type-check, compile and minify for production
npm run build

# Run unit tests
npm run test:unit

# Lint with ESLint
npm run lint
```

## Configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## How to Play

1. Select a difficulty level (Beginner to Expert, actually one more is added)
2. Click on any empty cell in the grid
3. Enter a number from 1-9
4. Use the hint button (bulb icon) if you need assistance
5. Monitor available digits display for remaining numbers
6. Complete the grid to earn your score and time bonus
7. Check the Records table to see if you made it to the top 3!

## Controls

- Mouse/Touch: Select cells and input numbers
- Delete/Backspace: Clear a cell
- Hint button: Request a hint (maximum 10)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

For bugs, feature requests, or other issues:

- Open an issue on GitHub
- Start a discussion in the repository
- Submit a pull request
