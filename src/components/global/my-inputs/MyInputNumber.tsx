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
  emptyAllowed?: boolean;
}

type InputNumberProps =
  | ({ fieldType: "number" } & NumberProps)
  | ({ fieldType: "string" } & StringProps);

export const MyInputNumber: React.FC<InputNumberProps> = ({
  fieldType,
  ...props
}) => {
  if (fieldType === "number")
    return <MyInputTypeNumber {...(props as NumberProps)} />;
  return <MyInputTypeString {...(props as StringProps)} />;
};

const MyInputTypeString: React.FC<StringProps> = ({
  value, onChange, placeholder, emptyAllowed = true
}) => {
  const {
    formattedValue,
    handleChange,
    handleBlur,
    handleFocus
  } = useNumberFormat(emptyAllowed, value ?? "");

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
