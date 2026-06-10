import { configureStore } from "@reduxjs/toolkit";

import wishlistSlice from "./slices/wishlistSlice";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";

import ordersSlice from "./slices/ordersSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
    cart: cartSlice,
    auth: authSlice,
    orders: ordersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
