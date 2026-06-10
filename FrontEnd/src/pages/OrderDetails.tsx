import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = useAppSelector((state) =>
    state.orders.orders.find((o) => o.id === orderId)
  );

  if (!order) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-xl font-semibold mb-3">Order Not Found</h1>
        <Link
          to="/orders"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-semibold mb-5">Order Details</h1>

      <div className="border rounded-md p-5 shadow-sm bg-white mb-6">
        <p className="text-sm mb-1">
          <span className="font-medium">Order ID:</span> {order.id}
        </p>
        <p className="text-sm mb-1">
          <span className="font-medium">Date:</span>{" "}
          {new Date(order.date).toLocaleString()}
        </p>
        <p className="text-sm mb-3">
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              order.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "processing"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {order.status.toUpperCase()}
          </span>
        </p>

        {/* Shipping Details */}
        <div className="mt-3">
          <h2 className="font-medium text-base mb-2">Shipping Details</h2>
          <p className="text-sm">{order.shippingDetails.name}</p>
          <p className="text-sm">{order.shippingDetails.address}</p>
          <p className="text-sm">
            {order.shippingDetails.city} - {order.shippingDetails.pincode}
          </p>
          <p className="text-sm">Phone: {order.shippingDetails.phone}</p>
        </div>

        {/* Items */}
        <div className="mt-4">
          <h2 className="font-medium text-base mb-2">Items</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {order.items.map((item) => (
              <li key={item._id}>
                {item.name} x {item.quantity} - ₹
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <p className="font-semibold mt-4 text-base">
          Grand Total: ₹{order.grandTotal.toFixed(2)}
        </p>
      </div>

      <Link
        to="/orders"
        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm"
      >
        Back to Orders
      </Link>
    </div>
  );
};

export default OrderDetails;
