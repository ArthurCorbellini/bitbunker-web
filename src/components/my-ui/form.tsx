
const InputText = ({ label, addClassName }: {
  label: string,
  addClassName?: string
}) => {
  const className = `p-1 w-full ${addClassName}`;
  return (
    <div className={className}>
      <label className="text-sm">{label}</label>
      <input type="text" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 mt-1 text-base border-gray-800" />
    </div>
  );
}

export { InputText };

