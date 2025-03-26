import { useLocale } from "next-intl";

export const useNumberFormat = (
  decimalPlaces: number = 0
) => {
  const locale = useLocale();
  const divisor = Math.pow(10, decimalPlaces);

  const format = (input: string) => {
    return new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(parseFloat(input) / divisor);
  }

  const formatNumber = (rawValue?: number | string) => {
    let input = (rawValue + "").replace(/\D/g, "");
    if (!input)
      input = "0";

    const formattedValue = format(input);
    const numericValue = parseFloat(input) / divisor;

    return { formattedValue, numericValue };
  }

  const formatStringNumber = (rawValue?: string) => {
    const input = (rawValue + "").replace(/\D/g, "");
    if (input === "")
      return { formattedValue: "", numericValue: "" }

    const formattedValue = format(input);
    const numericValue = (parseFloat(input) / divisor).toString();

    return { formattedValue, numericValue };
  }

  return {
    formatNumber,
    formatStringNumber
  };
}