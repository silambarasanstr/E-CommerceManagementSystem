import React from "react";
import type { CartItemTypes } from "../../types/cart";

type ItemType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type OrderSummaryProps = {
  items: CartItemTypes[];

  grandTotal: number;
  loading?: boolean;
  onPlaceOrder?: () => void;
  buttonText?: string;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,

  grandTotal,
  loading = false,
  onPlaceOrder,
  buttonText,
}) => {
  return (
    <div className="bg-white border border-gray-200 lg:sticky lg:top-24">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="font-semibold">Order Summary</h2>
      </div>

      {/* Items */}
      <div className="px-6 py-4 space-y-3 overflow-y-auto max-h-56">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between">
            <div>
              <p className="text-sm font-medium">{item?.product?.name}</p>
              <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold">
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-6 py-4 space-y-2 border-t border-gray-200 border-dashed">
        <div className="flex justify-between font-bold text-green-600">
          <span>Grand Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-6">
        <button
          onClick={onPlaceOrder}
          disabled={loading}
          className="w-full py-3 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading
            ? "Placing Order..."
            : buttonText || `Place Order · ₹${grandTotal.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
