
export const getFormattedTimestamp = (timestamp: Date): string => {
  const hours = timestamp.getHours().toString().padStart(2, '0');
  const minutes = timestamp.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
  }


export const getLastSeenMessage = (timestamp: string): string | undefined => {
  if (!timestamp) return undefined;
  const now = new Date();
  const lastSeen = new Date(timestamp);
  const timeDiff = now.getTime() - lastSeen.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (timeDiff < minute) {
    return "Last seen less than a minute ago";
  } else if (timeDiff < hour) {
    const minutes = Math.floor(timeDiff / minute);
    return `Last seen ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (timeDiff < day) {
    const hours = Math.floor(timeDiff / hour);
    return `Last seen ${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(timeDiff / day);
    return `Last seen ${days} day${days > 1 ? "s" : ""} ago`;
  }
}