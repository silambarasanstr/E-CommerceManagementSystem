import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { getMyOrders } from "../services/orderService";
import type { OrderType } from "../types/order";

const Orders: React.FC = () => {
  const { orders } = useAppSelector((state) => state.orders);

  const [order, setOrder] = useState<OrderType[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      console.log("API Response:", data);
      setOrder(data.data);
    } catch (error) {
      console.error("no found");
    }
  };

  console.log(order, "kkkkkk Orderservice");
  console.log(orders, "kkkkkk Redux");

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <Package size={64} className="mb-4 text-gray-300" />

        <h1 className="mb-2 text-2xl font-bold text-gray-800">No Orders Yet</h1>

        <p className="max-w-sm mb-6 text-gray-500">
          Looks like you haven't placed any orders yet. Start shopping and
          discover amazing products.
        </p>

        <Link
          to="/"
          className="px-5 py-3 text-sm font-medium text-white transition bg-orange-600 rounded-lg hover:bg-orange-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and track all your orders.
        </p>
      </div>

      <div className="space-y-4">
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <Link key={order.id} to={`/order/${order.id}`} className="block">
              <div className="p-5 transition-all bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
                      Order ID
                    </p>

                    <span className="px-3 py-1 font-mono text-sm bg-gray-100 rounded-md">
                      #{order.id}
                    </span>

                    <p className="mt-3 text-sm text-gray-500">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
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
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Orders;
