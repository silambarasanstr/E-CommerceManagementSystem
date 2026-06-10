type TextareaProps = {
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  required?: boolean;
  disabled?: boolean;
  rows: number;
};

const Textarea = ({
  placeholder,

  name,
  value,
  onChange,
  required = false,
  disabled = false,
  rows,
}: TextareaProps) => {
  return (
    <div>
      <textarea
        className={`flex  w-full rounded-md border px-3 py-2 text-base bg-[#faf8f5] border-[#e5e7eb] text-[0.875rem]`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
      />
    </div>
  );
};

export default Textarea;
