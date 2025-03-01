import { useLocale } from "next-intl";
import { ChangeEvent, useState } from "react";

export const useNumberFormat = (emptyAllowed: boolean, value: string) => {
  const [formattedValue, setFormattedValue] = useState<string>(value);

  const locale = useLocale();

  let decimalSeparator = ".";
  let thousandSeparator = ",";

  if (locale === "pt") {
    decimalSeparator = ",";
    thousandSeparator = ".";
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regexAllowed = new RegExp(`[^0-9${decimalSeparator}]`, "g");
    let processedValue = e.target.value.replace(regexAllowed, "");

    // impede a inserção de mais de um separador decimal
    const parts = processedValue.split(decimalSeparator);
    if (parts.length > 2)
      processedValue = parts[0] + decimalSeparator + parts[1];

    // Se o primeiro caractere for ".", adiciona "0" à esquerda
    if (processedValue.startsWith(decimalSeparator))
      processedValue = "0" + processedValue;

    // Impede a inserção de zeros à esquerda para números inteiros
    if (!processedValue.includes(decimalSeparator) && processedValue.startsWith("0") && processedValue.length > 1)
      processedValue = processedValue.slice(1);

    // Permite "0." apenas quando for um número decimal
    if (processedValue.startsWith("0") && processedValue.indexOf(decimalSeparator) !== -1)
      processedValue = "0" + processedValue.slice(1);

    setFormattedValue(processedValue ? processedValue : emptyAllowed ? "" : "0");

    return processedValue.replace(",", ".");
  };

  const handleBlur = () => {
    let processedValue = formattedValue;

    // Remove os zeros à direita e o ponto decimal caso não haja valor após ele
    if (processedValue.includes(decimalSeparator)) {
      const regex = new RegExp(`(${decimalSeparator}\\d*?)0+$`, "g");
      processedValue = processedValue.replace(regex, "$1");
      if (processedValue.endsWith(decimalSeparator))
        processedValue = processedValue.slice(0, -1);
    }

    // Adicionar separador de milhar (aqui é para pontos como separadores de milhar)
    const [integerPart, decimalPart] = processedValue.split(decimalSeparator);
    // Formatar a parte inteira com separadores de milhar
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    // Reconstruir o valor final
    processedValue = decimalPart ? `${formattedIntegerPart}${decimalSeparator}${decimalPart}` : formattedIntegerPart;

    setFormattedValue(processedValue);
  }

  const handleFocus = () => {
    // Remove o separador de milhar
    const regexAllowed = new RegExp(`[^0-9${decimalSeparator}]`, "g");
    let processedValue = formattedValue.replace(regexAllowed, "");

    setFormattedValue(processedValue);
  }

  return {
    formattedValue,
    handleChange,
    handleBlur,
    handleFocus
  };
}