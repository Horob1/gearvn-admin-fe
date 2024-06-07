export const convertDate = (timestamp: number) => {
  const date = new Date(timestamp);
  // Extract the date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const year = date.getFullYear() % 100; // Get the last two digits of the year

  // Format the date as dd mm yy
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year.toString().padStart(2, "0")}`;
};
