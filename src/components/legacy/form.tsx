import { CustomFormState } from "@/lib/types/custom-form-state-type";
import { ChangeEvent, useState } from "react";

const defaultInputClassName = "flex h-9 w-full rounded-md px-3 py-1 mt-1 text-base bg-slate-800 hover:bg-slate-700 transition border border-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:pointer-events-none"

export const InputText = ({ label, name, value, disabled, state, addClassName }: {
  label: string,
  name: string,
  value?: string,
  disabled?: boolean,
  state?: CustomFormState | null
  addClassName?: string
}) => {
  const defaultValue = state?.inputs?.[name] instanceof File ? undefined : state?.inputs?.[name];
  return (
    <div className={`p-1 ${addClassName}`}>
      <label className="text-sm">
        {label}
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        className={defaultInputClassName} />
      {errorLabel({ name, state })}
    </div>
  );
}

export const InputNumber = ({ label, name, value, disabled, state, addClassName }: {
  label: string,
  name: string,
  value?: string,
  disabled?: boolean,
  state?: CustomFormState | null
  addClassName?: string
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace(/\D/g, ''));
  };
  const defaultValue = state?.inputs?.[name] instanceof File ? undefined : state?.inputs?.[name];
  return (
    <div className={`p-1 ${addClassName}`}>
      <label className="text-sm">
        {label}
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        value={inputValue}
        disabled={disabled}
        onChange={handleChange}
        className={defaultInputClassName} />
      {errorLabel({ name, state })}
    </div>
  );
}

const errorLabel = ({ name, state }: {
  name?: string,
  state?: CustomFormState | null
}) => {
  if (!name || !state || !state.formErrors) return;
  const errors = state.formErrors[name];
  if (!errors) return;
  return (
    <p className="p-1 text-xs text-red-700">{errors[0]}</p>
  );
}
