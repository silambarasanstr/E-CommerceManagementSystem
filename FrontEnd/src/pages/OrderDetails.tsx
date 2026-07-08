import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const order = useAppSelector((state) =>
    state.orders.orders.find((o) => o.id === orderId),
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Order Not Found
        </h1>

        <p className="mb-6 text-gray-500">
          The order you're looking for doesn't exist.
        </p>

        <Link
          to="/orders"
          className="px-5 py-2.5 text-sm font-medium text-white transition bg-orange-600 rounded-lg hover:bg-orange-700"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>

        <p className="mt-1 text-sm text-gray-500">
          View complete information about your order.
        </p>
      </div>

      {/* Order Info */}
      <div className="p-5 mb-5 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
              Order ID
            </p>

            <p className="font-mono font-semibold text-gray-900">#{order.id}</p>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
              Order Date
            </p>

            <p className="text-gray-700">
              {new Date(order.date).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
              Status
            </p>

            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                order.status,
              )}`}
            >
              {order.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="p-5 mb-5 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Shipping Address
        </h2>

        <div className="space-y-1 text-sm text-gray-700">
          <p className="font-medium">{order.shippingDetails.fullName}</p>

          <p>{order.shippingDetails.street}</p>

          <p>
            {order.shippingDetails.city} - {order.shippingDetails.pincode}
          </p>

          <p>Phone: {order.shippingDetails.phone}</p>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="p-5 mb-5 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Ordered Items
        </h2>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 transition border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="text-sm text-gray-500">
                  Price: ₹{item.price.toFixed(2)}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Total Products</span>
            <span>{order.items.length}</span>
          </div>

          <div className="pt-3 border-t">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Grand Total</span>

              <span>₹{order.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <Link
          to="/orders"
          className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
