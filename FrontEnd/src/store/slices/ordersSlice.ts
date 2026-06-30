import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItemTypes } from "../../types/cart";

export type Order = {
  id: string;
  items: CartItemTypes[];
  total: number;
  grandTotal: number;
  date: string;
  status: "pending" | "processing" | "delivered";
  paymentMethod: "cod" | "online";
  shippingDetails: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };
};

type OrdersState = {
  orders: Order[];
};

const loadOrders = (): Order[] => {
  const data = localStorage.getItem("orders");
  return data ? JSON.parse(data) : [];
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const initialState: OrdersState = {
  orders: loadOrders(),
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      saveOrders(state.orders);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>,
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        saveOrders(state.orders);
      }
    },
    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("orders");
    },
  },
});

export const { placeOrder, updateOrderStatus, clearOrders } =
  ordersSlice.actions;
export default ordersSlice.reducer;
