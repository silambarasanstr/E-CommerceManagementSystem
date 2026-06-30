import { api } from "./api";
import type { CartResponse } from "../types/cart";

export const getCart = async () => {
  return api<{ success: boolean; data: CartResponse }>("/cart");
};

export const addToCart = async (productId: string, quantity: number) => {
  return api<{ message: string; data: CartResponse }>("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  return api<{ message: string; data: CartResponse }>(`/cart/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
};

export const removeFromCart = async (itemId: string) => {
  return api<{ message: string; data: CartResponse }>(`/cart/${itemId}`, {
    method: "DELETE",
  });
};

export const clearCart = async () => {
  return api<{ message: string; data: CartResponse }>("/cart", {
    method: "DELETE",
  });
};
