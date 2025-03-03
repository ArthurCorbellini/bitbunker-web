import { useLocale } from "next-intl";

export const useNumberFormat = (
  decimalPlaces: number = 0
) => {
  const locale = useLocale();
  const divisor = Math.pow(10, decimalPlaces);

  const formatNumber = (rawValue?: number | string) => {
    let input = (rawValue + "").replace(/\D/g, "");
    if (!input)
      input = "0";

    const formattedValue = new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(parseFloat(input) / divisor);

    return { formattedValue, numericValue: parseFloat(input) / divisor };
  }

  return {
    formatNumber
  };
}