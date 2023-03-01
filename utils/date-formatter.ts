export function getTimeBetween(startDate: Date, endDate: Date): string {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;

  const diffMs = endDate.getTime() - startDate.getTime();

  if (diffMs < msPerMinute) {
    return "just now";
  } else if (diffMs < msPerHour) {
    const minutes = Math.floor(diffMs / msPerMinute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffMs < msPerDay) {
    const hours = Math.floor(diffMs / msPerHour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (diffMs < msPerWeek) {
    const days = Math.floor(diffMs / msPerDay);
    if (days === 1) {
      return `yesterday at ${endDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return `${days} days ago`;
    }
  } else {
    const weeks = Math.floor(diffMs / msPerWeek);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
}
