import CartItemRow from "./CartItemRow";

type Props = {
  title?: string;
  items: any[];
  baseUrl: string;
  onClear: () => void;
  onIncrease: (id: string, qty: number) => void;
  onDecrease: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
};

const CartItems = ({
  title = "Cart Items",
  items,
  baseUrl,
  onClear,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>

        <button
          onClick={onClear}
          className="px-3 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50"
        >
          Clear All
        </button>
      </div>

      {/* Items */}
      <div>
        {items.map((item) => (
          <CartItemRow
            key={item._id}
            item={item}
            baseUrl={baseUrl}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItems;
