import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import React, { useEffect, useCallback } from "react";
import {
  setCart,
  clearCart,
  calculateTotals,
} from "../store/slices/cartSlice";

import CartEmpty from "../component/cart/CartEmpty";
import CartItems from "../component/cart/CartItems";
import OrderSummary from "../component/cart/OrderSummary";

import {
  getCart,
  updateCartItem as updateCartItemAPI,
  removeFromCart as removeFromCartAPI,
  clearCart as clearCartAPI,
} from "../services/cartService";

const baseUrl = import.meta.env.VITE_API_URL;

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, total, itemCount, discount } = useAppSelector(
    (state) => state.cart,
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        dispatch(setCart(response.data.items));
        dispatch(calculateTotals());
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  const handleClearCart = useCallback(async () => {
    try {
      await clearCartAPI();
      dispatch(clearCart());
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }, [dispatch]);

  const handleRemoveItem = useCallback(
    async (_id: string) => {
      try {
        await removeFromCartAPI(_id);

        const response = await getCart();

        dispatch(setCart(response.data.items));
        dispatch(calculateTotals());
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    },
    [dispatch],
  );

  const handleUpdateQuantity = useCallback(
    async (_id: string, newQuantity: number) => {
      if (newQuantity < 1) return;

      try {
        await updateCartItemAPI(_id, newQuantity);

        const response = await getCart();

        dispatch(setCart(response.data.items));
        dispatch(calculateTotals());
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    },
    [dispatch],
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          <CartItems
            items={items}
            baseUrl={baseUrl}
            onClear={handleClearCart}
            onIncrease={handleUpdateQuantity}
            onDecrease={handleUpdateQuantity}
            onRemove={handleRemoveItem}
          />

          <OrderSummary
            quantity={itemCount}
            total={total}
            discount={discount}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;