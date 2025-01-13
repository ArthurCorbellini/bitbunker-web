import { ChangeEventHandler } from "react";

const InputText = ({ label, value, onChange, addClassName }: {
  label: string,
  value: string,
  onChange: (newValue: string) => void;
  addClassName?: string
}) => {
  return (
    <div className={`p-1 w-full ${addClassName}`}>
      <label className="text-sm">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
        className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 mt-1 text-base border-gray-800" />
    </div>
  );
}

const InputNumber = ({ label, value, onChange, addClassName }: {
  label: string,
  value: string,
  onChange: (newValue: string) => void;
  addClassName?: string
}) => {
  const eventHandler: ChangeEventHandler<HTMLInputElement> = event => {
    onChange(event.target.value.replace(/\D/g, ''));
  };
  return (
    <div className={`p-1 w-full ${addClassName}`}>
      <label className="text-sm">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={eventHandler}
        className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 mt-1 text-base border-gray-800" />
    </div>
  );
}

export {
  InputNumber,
  InputText
};

