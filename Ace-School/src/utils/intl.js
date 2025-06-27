export const currencyFormatter = (amount) => {
  const formatted = new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amount);
  return formatted;
};
