import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OrderType } from "../../types/order";

type OrdersState = {
  orders: OrderType[];
};

const loadOrders = (): OrderType[] => {
  const data = localStorage.getItem("orders");
  return data ? JSON.parse(data) : [];
};

const saveOrders = (orders: OrderType[]) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const initialState: OrdersState = {
  orders: loadOrders(),
};

export const ordersSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    setOrders: (state, action: PayloadAction<OrderType[]>) => {
      state.orders = action.payload;
      saveOrders(state.orders);
    },

    placeOrder: (state, action: PayloadAction<OrderType>) => {
      state.orders.push(action.payload);
      saveOrders(state.orders);
    },

    updateOrderStatus: (
      state,
      action: PayloadAction<{
        _id: string;
        orderStatus: OrderType["orderStatus"];
      }>,
    ) => {
      const order = state.orders.find(
        (order) => order._id === action.payload._id,
      );

      if (order) {
        order.orderStatus = action.payload.orderStatus;
        saveOrders(state.orders);
      }
    },

    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("orders");
    },
  },
});

export const {
  setOrders,
  placeOrder,
  updateOrderStatus,
  clearOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;