export const formatThaiDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString("en", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
