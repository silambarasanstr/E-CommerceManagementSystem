import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItemTypes } from "../../types/cart";
import { getCart } from "../../services/cartService";
import type { AppDispatch } from "../../store/store";

export type CartState = {
  items: CartItemTypes[];
  itemCount: number;
  total: number;
  discount: number;
  grandTotal: number;
};

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
  discount: 0,
  grandTotal: 0,
};

export const loadCartFromAPI = () => async (dispatch: AppDispatch) => {
  try {
    const res = await getCart();
    dispatch(setCart(res.data.items));
    dispatch(calculateTotals());
  } catch (err) {
    console.error("Cart load failed");
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItemTypes[]>) => {
      state.items = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.total = 0;
      state.discount = 0;
      state.grandTotal = 0;
    },

    calculateTotals: (state) => {
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      state.discount = state.items.reduce((sum, item) => {
        if (!item.originalPrice || item.originalPrice <= item.price) {
          return sum;
        }

        return sum + (item.originalPrice - item.price) * item.quantity;
      }, 0);

      state.grandTotal = state.total;
    },
  },
});

export const { setCart, clearCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
