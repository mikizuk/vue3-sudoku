export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
