import React from "react";
import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
  const { orders } = useAppSelector((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-xl font-semibold mb-3">No Orders Yet</h1>
        <p className="text-gray-600 text-sm mb-5">
          You haven’t placed any orders.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-semibold mb-5">Your Orders</h1>

      <div className="space-y-4">
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <Link
              to={`/orders/${order.id}`}
              key={order.id}
              className="block hover:shadow transition rounded-md"
            >
              <div className="border rounded-md p-4 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-base font-medium">
                    Order ID: <span className="text-gray-700">{order.id}</span>
                  </h2>
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
                </div>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(order.date).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Orders;
