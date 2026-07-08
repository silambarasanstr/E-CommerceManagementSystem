type CheckboxProps = {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  count?: number;
  handleFilter?: () => void;
};

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  className,
  count,
}: CheckboxProps) => {
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
        className="w-3 h-3 cursor-pointer accent-blue-500"
      />
      <span className="text-gray-700">{label}</span>
      {count !== undefined && (
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
