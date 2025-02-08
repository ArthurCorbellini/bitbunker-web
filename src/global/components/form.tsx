import { CustomFormState } from "@/global/interfaces/custom-form-state.interfaces";
import { ChangeEvent, useState } from "react";

const defaultInputClassName = "flex h-9 w-full rounded-md px-3 py-1 mt-1 text-base bg-slate-800 hover:bg-slate-700 transition border border-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:pointer-events-none"

const InputText = ({ label, name, value, disabled, formState, addClassName }: {
  label: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  formState?: CustomFormState | null
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
      {errorLabel({ name, formState })}
    </div>
  );
}

const InputNumber = ({ label, name, value, disabled, formState, addClassName }: {
  label: string,
  name?: string,
  value?: string,
  disabled?: boolean,
  formState?: CustomFormState | null
  addClassName?: string
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      {errorLabel({ name, formState })}
    </div>
  );
}

const errorLabel = ({ name, formState }: {
  name?: string,
  formState?: CustomFormState | null
}) => {
  if (!name || !formState || !formState.formErrors) return;
  const errors = formState.formErrors[name];
  if (!errors) return;
  return (
    <p className="p-1 text-xs text-red-700">{errors[0]}</p>
  );
}

export {
  InputNumber,
  InputText
};

