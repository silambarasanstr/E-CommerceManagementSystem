import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/order");
    }, 5000); // auto redirect after 5s
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container py-12 mx-auto text-center">
      {/* Success badge */}
      <div className="inline-block px-4 py-2 mb-4 text-sm font-medium text-green-700 bg-green-100 rounded-full">
        ✅ Order Placed Successfully
      </div>

      {/* Heading */}
      <h1 className="mb-3 text-2xl font-semibold">Thank you for your order!</h1>

      {/* Order ID */}
      <p className="mb-6 text-sm text-gray-600">
        Your order ID is{" "}
        <span className="font-medium text-gray-900">{orderId}</span>
      </p>

      {/* Redirect note with spinner */}
      <div className="flex items-center justify-center gap-2 mb-6 text-xs text-gray-500">
        <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
        Redirecting you to your orders in 5 seconds...
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <Link
          to="/order"
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          View Orders
        </Link>
        <Link
          to="/"
          className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
