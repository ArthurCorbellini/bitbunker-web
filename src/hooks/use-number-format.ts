import { useLocale } from "next-intl";

function getDecimalSeparator(locale: string): string {
  const numberWithDecimal = 1.1;
  const formatted = new Intl.NumberFormat(locale).format(numberWithDecimal);
  return formatted.replace(/\d/g, "")[0] || ".";
}

export const useNumberFormat = () => {
  const locale = useLocale();
  const decimalSeparator = getDecimalSeparator(locale);

  const formatPercent = (value: number, fractionDigits = 0): string => {
    if (isNaN(value)) return "0%";

    const percentValue = value * 100;
    let formatted = percentValue.toFixed(fractionDigits);

    if (decimalSeparator !== ".") {
      formatted = formatted.replace(".", decimalSeparator);
    }

    return `${formatted}%`;
  };

  return {
    formatPercent,
  };
};
