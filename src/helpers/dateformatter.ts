export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return formattedDate;
};
