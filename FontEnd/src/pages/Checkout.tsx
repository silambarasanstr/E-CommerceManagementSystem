import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";
import { placeOrder } from "../store/slices/ordersSlice";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total, tax, shipping, grandTotal } = useAppSelector(
    (state) => state.cart
  );

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(shippingDetails).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    setLoading(true); 

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
      })
    );

    setTimeout(() => {
      dispatch(clearCart());
      toast.success("Order Placed Successfully", {
        duration: 9000,
      });
      navigate(`/order-success/${orderId}`);
    }, 500); 
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-medium mb-4 border-b pb-2">
            Shipping Details
          </h2>
          <div className="space-y-3">
            {[
              { name: "name", label: "Full Name" },
              { name: "address", label: "Address" },
              { name: "city", label: "City" },
              { name: "pincode", label: "Pincode" },
              { name: "phone", label: "Phone Number" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.name === "phone" ? "tel" : "text"}
                  name={field.name}
                  placeholder={field.label}
                  value={(shippingDetails as any)[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-green-500 focus:outline-none text-sm"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 shadow rounded-xl p-5">
          <h2 className="text-xl font-medium mb-4 border-b pb-2">
            Order Summary
          </h2>

          <div className="mb-3">
            {items.map((item) => (
              <p key={item._id} className="flex justify-between text-sm">
                {item.name} x {item.quantity}{" "}
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </p>
            ))}
          </div>

          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₹{total.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (10%)</span>
              <span className="font-medium">₹{tax.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">₹{shipping.toFixed(2)}</span>
            </p>
            <hr />
            <p className="flex justify-between font-semibold text-base">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </p>
          </div>

          {/* Payment Method */}
          <div className="mt-3">
            <h3 className="text-sm font-medium mb-2">Payment Method</h3>
            <select className="w-full border rounded-md p-2 text-sm">
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={items.length === 0 || loading}
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            ) : null}
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
