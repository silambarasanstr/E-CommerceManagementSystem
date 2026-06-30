

type PaymentOptionFieldProps = {
  value: "cod" | "online";
  selectedValue: "cod" | "online";
  title: string;
  description: string;
  icon: string;
  onChange: (value: "cod" | "online") => void;
};

const PaymentOptionField = ({
  value,
  selectedValue,
  title,
  description,
  icon,
  onChange,
}: PaymentOptionFieldProps) => {
  const isSelected = selectedValue === value;

  return (
    <label
      className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
        isSelected
          ? "border-green-500 bg-green-50"
          : "border-gray-200"
      }`}
    >
      <div className="flex gap-3">
        <input
          type="radio"
          name="paymentMethod"
          checked={isSelected}
          onChange={() => onChange(value)}
          className="mt-1 accent-green-600"
        />

        <div>
          <p className="font-medium">
            {icon} {title}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </label>
  );
};

export default PaymentOptionField;