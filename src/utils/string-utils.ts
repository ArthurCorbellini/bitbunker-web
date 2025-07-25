export const convertCurrency = (
  amount: string,
  currency: "BRL" | "USD"
): string => {
  const floatAmount = parseFloat(amount)
  const locale = currency === "BRL" ? "pt-BR" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(floatAmount)
}

export const formatDate = (
  dateString: string
): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Expected format: YYYY-MM-DDTHH:mm:ss");
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Converts a decimal number to a formatted percentage string.
 * 
 * @param value - A number (e.g., 0.75 = 75%).
 * @param fractionDigits - Optional number of decimal places to include (default: 0).
 * @returns A string representing the percentage (e.g., "75%", "45.3%").
 */
export function toPercent(value: number, fractionDigits = 0): string {
  if (isNaN(value)) return '0%'

  const percent = value * 100
  return `${percent.toFixed(fractionDigits)}%`
}
