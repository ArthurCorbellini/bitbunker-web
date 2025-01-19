import { useState } from "react";

const defaultInputClassName = "flex h-9 w-full rounded-md px-3 py-1 mt-1 text-base bg-slate-800 hover:bg-slate-700 transition border border-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:pointer-events-none"

const InputText = ({ label, name, value, disabled, formState, addClassName }: {
  label: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  formState?: any
  addClassName?: string
}) => {
  return (
    <div className={`p-1 ${addClassName}`}>
      <label className="text-sm">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        className={defaultInputClassName} />
      {name && formState[name] && <p className="p-1 text-xs text-red-700">{formState[name][0]}</p>}
    </div>
  );
}

const InputNumber = ({ label, name, value, disabled, formState, addClassName }: {
  label: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  formState?: any
  addClassName?: string
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const handleChange = (e: any) => {
    setInputValue(e.target.value.replace(/\D/g, ''));
  };
  return (
    <div className={`p-1 ${addClassName}`}>
      <label className="text-sm">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={inputValue}
        disabled={disabled}
        onChange={handleChange}
        className={defaultInputClassName} />
      {name && formState[name] && <p className="p-1 text-xs text-red-700">{formState[name][0]}</p>}
    </div>
  );
}

export {
  InputNumber,
  InputText
};

