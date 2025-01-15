
const InputText = ({ label, name, value, onChange, addClassName }: {
  label: string,
  name?: string,
  value?: string,
  onChange?: (newValue: string) => void;
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
        onChange={onChange ? event => onChange(event.target.value) : undefined}
        className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 mt-1 text-base border-gray-800" />
    </div>
  );
}

const InputNumber = ({ label, name, value, onChange, addClassName }: {
  label: string,
  name?: string,
  value?: string,
  onChange?: (newValue: string) => void;
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
        onChange={onChange ? event => onChange(event.target.value.replace(/\D/g, '')) : undefined}
        className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 mt-1 text-base border-gray-800" />
    </div>
  );
}

export {
  InputNumber,
  InputText
};

