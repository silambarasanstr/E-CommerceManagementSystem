import { Link } from "react-router-dom";
import type { ProductType } from "../../types/product";
import WishlistButton from "../wishlist/WishlistButton";
import { useAppDispatch } from "../../store/hooks";
import { memo, useState, useEffect } from "react";
import { addToCart as addToCartAPI } from "../../services/cartService";
import { setCart, calculateTotals } from "../../store/slices/cartSlice";
import { getCart } from "../../services/cartService";

type ProductCardProps = {
  product: ProductType;
  showAddToCart?: boolean;
};



const StockBadge = memo(({ product }: { product: ProductType }) => {
  if (!product.discount || product.discount <= 0) return null;

  return (
    <span className="absolute top-2 left-2 text-[11px] font-medium bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
      {product.discount}% off
    </span>
  );
});

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart = true,
}) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product._id]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await addToCartAPI(product._id, quantity);
      const response = await getCart();
      dispatch(setCart(response.data.items));
      dispatch(calculateTotals());
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div className="relative flex flex-col overflow-hidden transition-shadow duration-200 bg-white border border-gray-100 shadow-sm hover:shadow-md">
      {/* Wishlist */}
      <div className="absolute z-10 top-3 right-3">
        <WishlistButton product={product} />
      </div>

      {/* Image */}
      <Link
        to={`/product/${product._id}`}
        className="overflow-hidden rounded-t bg-gray-50 h-44"
      >
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-sm text-gray-400">No Image</span>
          )}
          <StockBadge product={product} />
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 gap-1 p-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-sm font-medium text-gray-800 truncate">
            {product.name}
          </h2>
        </Link>

        <p className="text-base font-semibold text-gray-900">
          ₹ {product.price}
        </p>

        {/* Stock */}
        <span
          className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${
            product.inStock
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>

        {/* Add to Cart */}
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`mt-2 w-full py-2 text-sm font-medium transition-colors ${
              product.inStock
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Unavailable"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
