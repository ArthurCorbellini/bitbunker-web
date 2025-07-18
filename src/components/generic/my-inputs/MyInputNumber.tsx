import { ChangeEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useNumberFormat } from "./hooks/useNumberFormat";

interface InputBaseProps {
  decimalPlaces?: number;
}

interface InputStringProps extends InputBaseProps {
  type: "string";
  placeholder?: string;
  value?: string;
  onChange?: (value?: string) => void;
}

interface InputNumberProps extends InputBaseProps {
  type: "number";
  value?: number;
  onChange?: (value?: number) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  decimalPlaces,
}) => {
  const { formatNumber } = useNumberFormat(decimalPlaces);
  const { formattedValue } = formatNumber(value);
  const [outputValue, setOutputValue] = useState(formattedValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { formattedValue, numericValue } = formatNumber(e.target.value);
    setOutputValue(formattedValue);
    onChange?.(numericValue);
  }

  useEffect(() => {
    const { formattedValue } = formatNumber(value);
    setOutputValue(formattedValue);
  }, [value]);

  return (
    <Input
      type="text"
      value={outputValue}
      onChange={handleChange}
      inputMode="decimal"
      className="text-right" />
  );
};

const InputString: React.FC<InputStringProps> = ({
  value,
  onChange,
  decimalPlaces,
  placeholder,
}) => {
  const { formatStringNumber } = useNumberFormat(decimalPlaces);
  const { formattedValue } = formatStringNumber(value);
  const [outputValue, setOutputValue] = useState(formattedValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { formattedValue, numericValue } = formatStringNumber(e.target.value);
    setOutputValue(formattedValue);
    onChange?.(numericValue);
  }

  useEffect(() => {
    const { formattedValue } = formatStringNumber(value);
    setOutputValue(formattedValue);
  }, [value]);

  return (
    <Input
      type="text"
      value={outputValue}
      onChange={handleChange}
      inputMode="decimal"
      className="text-right placeholder:text-left"
      placeholder={placeholder} />
  );
};

export const MyInputNumber: React.FC<InputStringProps | InputNumberProps> = ({
  type,
  ...props
}) => {
  if (type === "string")
    return <InputString {...props as InputStringProps} />
  return <InputNumber {...props as InputNumberProps} />
};
