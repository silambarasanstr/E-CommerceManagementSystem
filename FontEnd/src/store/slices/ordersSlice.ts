import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./cartSlice";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  tax: number;
  shipping: number;
  grandTotal: number;
  date: string;
  status: "pending" | "processing" | "delivered";
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
  };
};

type OrdersState = {
  orders: Order[];
};

// 🔹 Load from localStorage
const loadOrders = (): Order[] => {
  const data = localStorage.getItem("orders");
  return data ? JSON.parse(data) : [];
};

// 🔹 Save to localStorage
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
      saveOrders(state.orders); // ✅ persist to localStorage
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        saveOrders(state.orders); // ✅ persist after update
      }
    },
    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("orders"); // ✅ clear from storage
    },
  },
});

export const { placeOrder, updateOrderStatus, clearOrders } =
  ordersSlice.actions;
export default ordersSlice.reducer;
