
export type SelectOption = {
  label: string;
  value: string;
};


type SelectProps = {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Select: React.FC<SelectProps> = ({ options, value, onChange, placeholder = "Select option", }) => {
  return (
    <select
      className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
       {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
    </select>
  );
};

export default Select;
