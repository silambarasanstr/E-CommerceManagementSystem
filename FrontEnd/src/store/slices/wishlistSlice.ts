import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CategoryType } from "../../types/category";

export type WishlistItem = {
  _id: string; // ✅ required
  name: string;
  slug?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category?: CategoryType;
  brand?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  dateAdded: string;
};

export type WishlistState = {
  items: WishlistItem[];
  itemCount: number;
};

// 🔹 Load wishlist from localStorage when app starts
const loadWishlist = (): WishlistState => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : { items: [], itemCount: 0 };
  } catch {
    return { items: [], itemCount: 0 };
  }
};

const initialState: WishlistState = loadWishlist();

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // ✅ Add item to wishlist
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id,
      );
      if (!exists) {
        state.items.push(action.payload);
        state.itemCount = state.items.length;
        localStorage.setItem("wishlist", JSON.stringify(state)); // persist
      }
    },

    // ✅ Remove a single item from wishlist
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.itemCount = state.items.length;
      localStorage.setItem("wishlist", JSON.stringify(state)); // persist
    },

    // ✅ Clear the wishlist
    clearWishlist: (state) => {
      state.items = [];
      state.itemCount = 0;
      localStorage.removeItem("wishlist"); // clear storage
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
