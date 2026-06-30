import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { setCart, calculateTotals } from "../store/slices/cartSlice";
import { getCart } from "../services/cartService";

const GlobalCartLoader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await getCart();

        dispatch(setCart(res.data.items));
        dispatch(calculateTotals());
      } catch (err) {
        console.error("Cart sync failed");
      }
    };

    loadCart();
  }, [dispatch]);

  return null;
};

export default GlobalCartLoader;