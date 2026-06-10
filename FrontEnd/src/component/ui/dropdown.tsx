import { useState } from "react";

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
  placeholder?: string;
};

const Dropdown = ({
  label,
  options,
  onSelect,
  placeholder = "Select...",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(null);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option); // ✅ Optional chaining for safety
  };

  return (
    <div className="relative inline-block w-64">
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-left bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-expanded={isOpen}
      >
        {selected ? selected.label : placeholder}
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
