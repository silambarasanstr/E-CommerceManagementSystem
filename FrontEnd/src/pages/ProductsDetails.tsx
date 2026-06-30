import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { ProductType } from "../types/product";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCart, calculateTotals } from "../store/slices/cartSlice";
import { addToCart as addToCartAPI, getCart } from "../services/cartService";

import LoadingState from "../component/ui/LoadingState";
import ErrorState from "../component/ui/ErrorState";
import EmptyState from "../component/ui/EmptyState";
import ProductInfo from "../component/products/ProductInfo";
import ProductPurchasePanel from "../component/products/ProductPurchasePanel";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const isAlreadyInCart = cartItems.some(
    (item) => item._id === product?._id,
  );

  const fetchProduct = useCallback(async () => {
    if (!id) {
      setError("Invalid Product ID");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await getProductById(id);
      setProduct(res.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const updateQuantity = useCallback((value: number) => {
    setQuantity(Math.max(1, value));
  }, []);

  const discount =
    product?.originalPrice && product?.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100,
        )
      : product?.discount || 0;

  const handleAddToCart = async () => {
    if (!product || !product.inStock) return;

    try {
      // 1. API call (source of truth)
      await addToCartAPI(product._id, quantity);

      // 2. sync cart from backend
      const response = await getCart();

      dispatch(setCart(response.data.items));
      dispatch(calculateTotals());
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product,
        quantity,
      },
    });
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!product) return <EmptyState message="No product found" />;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-4 py-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[40%_60%]">
          {/* LEFT */}
          <ProductPurchasePanel
            product={product}
            isAlreadyInCart={isAlreadyInCart}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
          />

          {/* RIGHT */}
          <ProductInfo
            product={product}
            quantity={quantity}
            discount={discount}
            updateQuantity={updateQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;