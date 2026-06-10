import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";
import { placeOrder } from "../store/slices/ordersSlice";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

type ShippingDetails = {
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
};

const SHIPPING_FIELDS: {
  name: keyof ShippingDetails;
  label: string;
  colSpan?: boolean;
}[] = [
  { name: "name", label: "Full Name", colSpan: true },
  { name: "address", label: "Street Address", colSpan: true },
  { name: "city", label: "City" },
  { name: "pincode", label: "Pincode" },
  { name: "phone", label: "Phone Number", colSpan: true },
];

const PAYMENT_OPTIONS = [
  {
    value: "cod",
    label: "Cash on Delivery",
    desc: "Pay when your order arrives",
    icon: "💵",
  },
  {
    value: "online",
    label: "Online Payment",
    desc: "UPI, card, or net banking",
    icon: "💳",
  },
];

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, total, tax, shipping, grandTotal } = useAppSelector(
    (state) => state.cart
  );

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-6xl">🛒</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Your cart is empty
          </h2>
          <p className="mb-6 text-gray-500">
            Add some items before checking out.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<ShippingDetails> = {};
    (Object.keys(shippingDetails) as (keyof ShippingDetails)[]).forEach(
      (key) => {
        if (!shippingDetails[key].trim()) {
          newErrors[key] = "This field is required";
        }
      }
    );
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const orderId = uuidv4();
      dispatch(
        placeOrder({
          id: orderId,
          items,
          total,
          tax,
          shipping,
          grandTotal,
          date: new Date().toISOString(),
          status: "pending",
          shippingDetails,
          paymentMethod,
        })
      );
      dispatch(clearCart());
      toast.success("Order placed successfully!", { duration: 9000 });
      navigate(`/order-success/${orderId}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between max-w-5xl px-4 py-3 mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
            Checkout
          </span>
          <span className="text-sm text-gray-400">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* LEFT — Shipping + Payment */}
          <div className="space-y-5">

            {/* Delivery Address */}
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <span className="flex items-center justify-center text-sm font-bold text-green-600 rounded-full w-7 h-7 bg-green-50">
                  1
                </span>
                <h2 className="text-base font-semibold text-gray-800">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 p-6">
                {SHIPPING_FIELDS.map((field) => (
                  <div key={field.name} className={field.colSpan ? "col-span-2" : "col-span-1"}>
                    <label
                      htmlFor={field.name}
                      className="block mb-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      type={field.name === "phone" ? "tel" : "text"}
                      name={field.name}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={shippingDetails[field.name]}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors[field.name]
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300 focus:bg-white"
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-500" role="alert">
                        <svg className="flex-shrink-0 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <span className="flex items-center justify-center text-sm font-bold text-green-600 rounded-full w-7 h-7 bg-green-50">
                  2
                </span>
                <h2 className="text-base font-semibold text-gray-800">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">
                {PAYMENT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === opt.value
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      checked={paymentMethod === opt.value}
                      onChange={() => setPaymentMethod(opt.value as "cod" | "online")}
                      className="mt-0.5 accent-green-600"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                        <span>{opt.icon}</span>
                        {opt.label}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-[61px]">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">Order Summary</h2>
            </div>

            {/* Items list */}
            <div className="px-6 py-4 space-y-3 overflow-y-auto max-h-56">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="px-6 pb-4 space-y-2.5 border-t border-gray-100 pt-4">
              {[
                { label: "Subtotal", value: total },
                { label: "Tax (10%)", value: tax },
                { label: "Shipping", value: shipping },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm text-gray-500">
                  <span>{label}</span>
                  <span className="font-medium text-gray-700">₹{value.toFixed(2)}</span>
                </div>
              ))}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 border-dashed">
                <span className="text-sm font-bold text-gray-800">Grand Total</span>
                <span className="text-lg font-bold text-green-600">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Place Order · ₹{grandTotal.toFixed(2)}
                  </>
                )}
              </button>
              <p className="mt-3 text-xs text-center text-gray-400">
                🔒 Secure checkout · Free returns within 7 days
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;