import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { useNumberFormat } from "./hooks/useNumberFormat";

interface NumberProps {
  value?: number;
  onChange?: (value?: number) => void;
}

interface StringProps {
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
}

type InputNumberProps =
  | ({ inputType?: "number" } & NumberProps)
  | ({ inputType: "string" } & StringProps);

export const MyInputNumber: React.FC<InputNumberProps> = ({
  inputType = "number",
  ...props
}) => {
  if (inputType === "number")
    return <MyInputTypeNumber {...(props as NumberProps)} />;
  return <MyInputTypeString {...(props as StringProps)} />;
};

const MyInputTypeString: React.FC<StringProps> = ({
  value, onChange, placeholder,
}) => {
  const {
    formattedValue,
    handleChange,
    handleBlur,
    handleFocus
  } = useNumberFormat(true, value ?? "");

  const handleChangeThis = (e: ChangeEvent<HTMLInputElement>) => {
    const v = handleChange(e);
    if (onChange) onChange(v);
  }

  return (
    <Input
      type="text"
      value={formattedValue}
      onChange={handleChangeThis}
      onBlur={handleBlur}
      onFocus={handleFocus}
      placeholder={placeholder}
      inputMode="decimal"
      style={formattedValue ? { textAlign: "right" } : {}} />
  );
};

const MyInputTypeNumber: React.FC<NumberProps> = ({
  value, onChange,
}) => {
  const {
    formattedValue,
    handleChange,
    handleBlur,
    handleFocus
  } = useNumberFormat(false, value + "");

  const handleChangeThis = (e: ChangeEvent<HTMLInputElement>) => {
    const v = handleChange(e);
    if (!onChange) return;
    if (!v) {
      onChange(0);
      return;
    }
    onChange(Number(v));
  }

  return (
    <Input
      type="text"
      value={formattedValue}
      onChange={handleChangeThis}
      onBlur={handleBlur}
      onFocus={handleFocus}
      inputMode="decimal"
      style={formattedValue ? { textAlign: "right" } : {}} />
  );
};
