// Format number to USD
export function formatDollarAmount(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

// Formats date to local time and provides hour, minute, second
export function formatDate(date) {
  const dateObj = new Date(date);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate = dateObj.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: tz,
  });
  const formattedTime = formattedDate;
  return formattedTime;
}

// Formats date to local time and provides Month, Day, Year
export function formatDateMDY(date) {
  const dateObj = new Date(date);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedDate = dateObj.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
    timeZone: tz,
  });
  return formattedDate;
}
