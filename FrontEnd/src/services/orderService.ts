import { api } from "./api";
import type { OrderType } from "../types/order";

export const getMyOrders = async () => {
  return api<{ data: OrderType[] }>("/orders");
};

export const createOrder = async (orderData: {
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
}) => {
  return api("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};
