type Props = {
  total: number;
  discount: number;
  onCheckout: () => void;
  quantity: number;
};

const OrderSummary = ({ total, discount, quantity, onCheckout }: Props) => {
  const summary = [
    { key: "price", label: `Subtotal (${quantity} items)`, value: total },
    { key: "discount", label: "Discount", value: discount, isDiscount: true },
  ];

  const finalTotal = total;

  return (
    <div className="bg-white border border-gray-200 lg:sticky lg:top-24">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg">Order Summary</h2>
      </div>

      <div className="px-6 py-4 space-y-3">
        {summary.map((item) => (
          <div
            key={item.key}
            className="flex justify-between text-sm text-gray-600"
          >
            <span>{item.label}</span>
            <span
              className={item.isDiscount ? "text-green-600 font-semibold" : ""}
            >
              {item.isDiscount ? "-" : ""}₹{item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-green-600">₹{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={onCheckout}
          className="w-full py-3 text-white font-semibold bg-orange-500 rounded hover:bg-orange-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
