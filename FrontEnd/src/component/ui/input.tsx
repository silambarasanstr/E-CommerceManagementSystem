type InputProps = {
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?:string
  autoComplete?:string
};

const Input = ({
  placeholder,
  type,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  className,
  autoComplete 
}: InputProps) => {
  return (
    <div>
      <input
        className={`${className} flex h-10 w-full rounded-md border px-3 py-2 text-base bg-[#faf8f5] border-[#e5e7eb] text-[0.875rem]`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Input;
