import { useLocale } from "next-intl";
import { ChangeEvent, ComponentProps, forwardRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/shadcn-utils";

const formatNumber = (
  locale: string,
  decimalPlaces: number,
  rawValue?: number | string,
) => {
  let input = (rawValue + "").replace(/\D/g, "");
  if (!input) input = "0";

  const divisor = Math.pow(10, decimalPlaces);

  const stringValue = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(parseFloat(input) / divisor);
  const numericValue = parseFloat(input) / divisor;

  return { stringValue, numericValue };
};

type InputBaseProps = {
  inputType?: "string" | "number";
  decimalPlaces?: number;
} & Omit<ComponentProps<typeof Input>, "onChange" | "value">;

interface InputStringProps extends InputBaseProps {
  value?: string;
  onChange?: (value: string) => void;
}

interface InputNumberProps extends InputBaseProps {
  value?: number;
  onChange?: (value: number) => void;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({
    decimalPlaces = 0,
    value,
    onChange,
    className,
    ...props
  }, ref) => {
    const locale = useLocale();
    const { stringValue } = formatNumber(locale, decimalPlaces, value);
    const [outputValue, setOutputValue] = useState(stringValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { stringValue, numericValue } = formatNumber(locale, decimalPlaces, e.target.value);
      setOutputValue(stringValue);
      onChange?.(numericValue);
    }

    return (
      <Input
        type="text"
        inputMode="decimal"
        className={cn("text-right", className)}
        value={outputValue}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);

const InputString = forwardRef<HTMLInputElement, InputStringProps>(
  ({
    decimalPlaces = 0,
    value,
    onChange,
    className,
    ...props
  }, ref) => {
    const locale = useLocale();
    const { stringValue } = formatNumber(locale, decimalPlaces, value);
    const [outputValue, setOutputValue] = useState(stringValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { stringValue } = formatNumber(locale, decimalPlaces, e.target.value);
      setOutputValue(stringValue);
      onChange?.(stringValue);
    }

    return (
      <Input
        type="text"
        inputMode="decimal"
        className={cn("text-right", className)}
        value={outputValue}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);

export const MyInputNumber = forwardRef<HTMLInputElement, InputStringProps | InputNumberProps>(
  ({
    inputType = "number",
    ...props
  }, ref) => {
    if (inputType === "number")
      return <InputNumber ref={ref} {...props as InputNumberProps} />
    return <InputString ref={ref} {...props as InputStringProps} />
  }
);
