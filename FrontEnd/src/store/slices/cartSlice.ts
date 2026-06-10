import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  _id: number;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
  category: string;
};

export type CartState = {
  items: CartItem[];
  itemCount: number;
  total: number;
  shipping: number;
  tax: number;
  grandTotal: number;
};

// 🔹 Load cart from localStorage
const loadCart = (): CartState => {
  try {
    const data = localStorage.getItem("cart");
    return data
      ? JSON.parse(data)
      : {
          items: [],
          itemCount: 0,
          total: 0,
          shipping: 0,
          tax: 0,
          grandTotal: 0,
        };
  } catch {
    return {
      items: [],
      itemCount: 0,
      total: 0,
      shipping: 0,
      tax: 0,
      grandTotal: 0,
    };
  }
};

const initialState: CartState = loadCart();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
        state.itemCount += 1;
      } else {
        exists.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state)); // ✅ persist
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.itemCount = state.items.length;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.total = 0;
      state.tax = 0;
      state.shipping = 0;
      state.grandTotal = 0;
      localStorage.removeItem("cart");
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ _id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    calculateTotals: (state) => {
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.shipping = state.total > 0 ? 10 : 0;
      state.tax = state.total * 0.1;
      state.grandTotal = state.total + state.shipping + state.tax;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
