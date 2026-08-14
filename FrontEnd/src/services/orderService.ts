import { api } from "./api";
import type { OrderType } from "../types/order";

type CreateOrderResponse = {
  message: string;
  order: OrderType;
};

export const getMyOrders = async (): Promise<OrderType[]> => {
  return api<OrderType[]>("/orders");
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
  return api<CreateOrderResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};
