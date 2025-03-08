import { ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { useNumberFormat } from "./hooks/useNumberFormat";

interface InputNumberProps {
  value?: number | string;
  onChange?: (value?: number | string) => void;
  placeholder?: string;
  decimalPlaces?: number;
}

export const MyInputNumber: React.FC<InputNumberProps> = ({
  value, onChange, placeholder, decimalPlaces,
}) => {
  const { formatNumber } = useNumberFormat(decimalPlaces);
  const { formattedValue, numericValue } = formatNumber(value);
  const [outputValue, setOutputValue] = useState(placeholder !== undefined && !numericValue ? "" : formattedValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { formattedValue, numericValue } = formatNumber(e.target.value);

    setOutputValue(placeholder !== undefined && !numericValue ? "" : formattedValue);

    if (onChange)
      onChange(numericValue);
  }

  return (
    <Input
      type="text"
      value={outputValue}
      onChange={handleChange}
      placeholder={placeholder}
      inputMode="decimal"
      className="text-right placeholder:text-left" />
  );
};
