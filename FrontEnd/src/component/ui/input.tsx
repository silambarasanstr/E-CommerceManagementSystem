type InputProps = {
  label: string;
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
};

const Input = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className,
  autoComplete,
}: InputProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-xs font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        className={`w-full rounded-lg border
          px-3 py-2
          text-sm
          placeholder:text-gray-400
          outline-none
          transition-all duration-200 
          ${className} 
           ${
             error
               ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
               : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
           }`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
