export const formatDate = (dateObj: { $date: string } | string) => {
  const rawDate = typeof dateObj === "string" ? dateObj : dateObj.$date;
  return new Date(rawDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
