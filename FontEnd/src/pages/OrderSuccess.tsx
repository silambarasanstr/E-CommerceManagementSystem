import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 5000); // auto redirect after 5s
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mx-auto py-12 text-center">
      {/* Success badge */}
      <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
        ✅ Order Placed Successfully
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-3">Thank you for your order!</h1>

      {/* Order ID */}
      <p className="text-sm text-gray-600 mb-6">
        Your order ID is{" "}
        <span className="font-medium text-gray-900">{orderId}</span>
      </p>

      {/* Redirect note with spinner */}
      <div className="flex justify-center items-center gap-2 text-xs text-gray-500 mb-6">
        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        Redirecting you to your orders in 5 seconds...
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <Link
          to="/orders"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          View Orders
        </Link>
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
