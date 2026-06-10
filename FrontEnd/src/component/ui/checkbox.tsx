import { useId } from "react";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

const Checkbox = ({ label, checked, onChange, className }: CheckboxProps) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`flex items-center space-x-2 cursor-pointer ${
        className || ""
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-blue-500 cursor-pointer"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;
