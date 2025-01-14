export const formatTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours % 12 || 12;
  const ampm = hours < 12 ? "AM" : "PM";
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
