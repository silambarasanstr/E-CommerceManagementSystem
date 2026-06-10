import { Link } from "react-router-dom";
import Button from "../component/ui/button";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  calculateTotals,
} from "../store/slices/cartSlice";
import { useCallback, useEffect } from "react";

const baseUrl = import.meta.env.VITE_API_URL;

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total, itemCount, tax, grandTotal, shipping } = useAppSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleRemoveItem = useCallback(
    (_id: number) => {
      dispatch(removeFromCart(_id));
    },
    [dispatch],
  );

  const handleUpdateQuantity = useCallback(
    (_id: number, newQuantity: number) => {
      if (newQuantity >= 1) {
        dispatch(updateQuantity({ _id, quantity: newQuantity }));
      }
    },
    [dispatch],
  );

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full">
              <ShoppingCart className="text-gray-400 w-9 h-9" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Your cart is empty
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between max-w-5xl px-4 py-3 mx-auto">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <span className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
            Your Cart
          </span>
          <span className="text-sm text-gray-400">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* LEFT — Cart Items */}
          <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">
                Cart Items
              </h2>
              <button
                onClick={handleClearCart}
                className="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  {/* Image */}
                  <div className="flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100 w-18 h-18 rounded-xl bg-gray-50">
                    {item?.image ? (
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `${baseUrl}${item.image}`
                        }
                        alt={item.name}
                        className="object-contain w-16 h-16 p-1"
                      />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-sm font-semibold text-gray-800 transition-colors hover:text-orange-500 line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">
                      {item.category}
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-700">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-sm font-semibold text-center text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                      className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total + remove */}
                  <div className="flex items-center gap-3 ml-2">
                    <span className="w-20 text-sm font-bold text-right text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="flex items-center justify-center w-8 h-8 text-red-400 transition-colors border border-gray-200 rounded-lg hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-[61px]">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">
                Order Summary
              </h2>
            </div>

            <div className="px-6 py-4 space-y-3">
              {[
                { label: "Subtotal", value: `₹${total.toFixed(2)}` },
                { label: "Tax (10%)", value: `₹${tax.toFixed(2)}` },
                {
                  label: "Shipping",
                  value: shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between text-sm text-gray-500"
                >
                  <span>{label}</span>
                  <span
                    className={`font-medium ${
                      value === "Free" ? "text-green-600" : "text-gray-700"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 border-dashed">
                <span className="text-sm font-bold text-gray-800">
                  Grand Total
                </span>
                <span className="text-lg font-bold text-orange-500">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="px-6 pb-6">
              <Button
                onClick={() => navigate("/checkout")}
                className="w-full py-3 text-sm font-semibold text-white transition-colors bg-orange-500 hover:bg-orange-600 rounded-xl"
              >
                Proceed to Checkout
              </Button>
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

export default Cart;
