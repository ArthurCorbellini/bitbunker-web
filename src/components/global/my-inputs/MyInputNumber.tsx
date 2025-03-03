import { ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { useNumberFormat } from "./hooks/useNumberFormat";

interface CommonProps {
  decimalPlaces?: number;
}

interface NumberProps extends CommonProps {
  value?: number;
  onChange?: (value?: number) => void;
}

interface StringProps extends CommonProps {
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
  emptyAllowed?: boolean;
}

type InputNumberProps =
  | ({ fieldType: "number" } & NumberProps)
  | ({ fieldType?: "string" } & StringProps);

export const MyInputNumber: React.FC<InputNumberProps> = ({
  fieldType = "string",
  ...props
}) => {
  if (fieldType === "number")
    return <MyInputTypeNumber {...(props as NumberProps)} />;
  return <MyInputTypeString {...(props as StringProps)} />;
};

const MyInputTypeString: React.FC<StringProps> = ({
  value,
  onChange,
  placeholder,
  emptyAllowed = true,
  decimalPlaces
}) => {
  const { formatNumber } = useNumberFormat(decimalPlaces);
  const { formattedValue } = formatNumber(value ?? "");
  const [outputValue, setOutputValue] = useState(formattedValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { formattedValue, numericValue } = formatNumber(e.target.value);

    setOutputValue(emptyAllowed && !numericValue ? "" : formattedValue);

    if (onChange)
      onChange(numericValue + "");
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

const MyInputTypeNumber: React.FC<NumberProps> = ({
  value,
  onChange,
  decimalPlaces
}) => {
  const { formatNumber } = useNumberFormat(decimalPlaces);
  const { formattedValue } = formatNumber(value + "");
  const [outputValue, setOutputValue] = useState(formattedValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { formattedValue, numericValue } = formatNumber(e.target.value);

    setOutputValue(formattedValue);

    if (onChange)
      onChange(numericValue);
  }

  return (
    <Input
      type="text"
      value={outputValue}
      onChange={handleChange}
      inputMode="decimal"
      className="text-right" />
  );
};
