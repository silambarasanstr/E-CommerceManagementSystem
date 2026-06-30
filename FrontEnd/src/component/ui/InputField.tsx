import React from "react";

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const InputField = ({
  label,
  name,
  value,
  placeholder,
  type = "text",
  onChange,
  className = "",
}: InputFieldProps) => {
  return (
    <div className={className}>
      <label className="block mb-1.5 text-xs font-semibold text-gray-500 uppercase">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
    </div>
  );
};

export default InputField;