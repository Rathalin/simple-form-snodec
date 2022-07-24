export function getTimeFromDateString(dateString: string) {
  return new Date(dateString).toLocaleString('en-US', {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
