import { useState } from "react";

const InputText = ({ label, name, value, onChange, disabled, addClassName }: {
  label: string,
  name?: string,
  value?: string,
  onChange?: (newValue: string) => void;
  disabled?: boolean,
  addClassName?: string
}) => {
  return (
    <div className={`p-1 w-full ${addClassName}`}>
      <label className="text-sm">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange ? event => onChange(event.target.value) : undefined}
        className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 mt-1 text-base border-gray-800 disabled:opacity-50" />
    </div>
  );
}

const InputNumber = ({ label, name, value, disabled, addClassName }: {
  label: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  addClassName?: string
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const handleChange = (e: any) => {
    setInputValue(e.target.value.replace(/\D/g, ''));
  };
  return (
    <div className={`p-1 w-full ${addClassName}`}>
      <label className="text-sm">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={inputValue}
        disabled={disabled}
        onChange={handleChange}
        className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 mt-1 text-base border-gray-800 disabled:opacity-50" />
    </div>
  );
}

export {
  InputNumber,
  InputText
};

