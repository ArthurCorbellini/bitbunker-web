import { useLocale } from "next-intl";

function getDecimalSeparator(locale: string): string {
  const numberWithDecimal = 1.1;
  const formatted = new Intl.NumberFormat(locale).format(numberWithDecimal);
  return formatted.replace(/\d/g, "")[0] || ".";
}

export const useNumberFormat = (
  decimalPlaces: number = 0,
  currency: string = "BRL"
) => {
  const locale = useLocale();
  const divisor = Math.pow(10, decimalPlaces);
  const decimalSeparator = getDecimalSeparator(locale);

  const format = (input: string) => {
    return new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(parseFloat(input) / divisor);
  };

  const formatNumber = (rawValue?: number | string) => {
    let input = (rawValue + "").replace(/\D/g, "");
    if (!input) input = "0";

    const formattedValue = format(input);
    const numericValue = parseFloat(input) / divisor;

    return { formattedValue, numericValue };
  };

  const formatStringNumber = (rawValue?: string) => {
    const input = (rawValue + "").replace(/\D/g, "");
    if (input === "") {
      return { formattedValue: "", numericValue: "" };
    }

    const formattedValue = format(input);
    const numericValue = (parseFloat(input) / divisor).toString();

    return { formattedValue, numericValue };
  };

  const formatPercent = (value: number, fractionDigits = 0): string => {
    if (isNaN(value)) return "0%";

    const percentValue = value * 100;
    let formatted = percentValue.toFixed(fractionDigits);

    if (decimalSeparator !== ".") {
      formatted = formatted.replace(".", decimalSeparator);
    }

    return `${formatted}%`;
  };

  const formatCurrency = (
    value: number,
    customDecimalPlaces: number = decimalPlaces
  ): string => {
    if (isNaN(value)) return "0";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: customDecimalPlaces,
      maximumFractionDigits: customDecimalPlaces,
    }).format(value);
  };

  return {
    formatNumber,
    formatStringNumber,
    formatPercent,
    formatCurrency,
  };
};
