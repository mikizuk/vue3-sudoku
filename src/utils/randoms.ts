export const getRandomNumber = (min: number = 1, max: number = 9): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const shuffleArray = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5)
}
