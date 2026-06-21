import { Link } from "react-router-dom";
import type { ProductType } from "../types/product";
import WishlistButton from "./WishlistButton";
import { addToCart } from "../store/slices/cartSlice";
import { useAppDispatch } from "../store/hooks";

type ProductCardProps = {
  product: ProductType;
  showAddToCart?: boolean;
};

const baseUrl = "http://localhost:4000";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart = true,
}) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(addToCart({ ...product, quantity: 1 }));
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
        {product.image ? (
          <img
            src={
              product.image.startsWith("http")
                ? product.image
                : `${baseUrl}${product.image}`
            }
            alt={product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-sm text-gray-400">No Image</span>
        )}
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

        {/* Badge */}
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
            className={`mt-2 w-full py-2  text-sm font-medium transition-colors ${
              product.inStock
                ? "bg-gray-900 text-white hover:bg-gray-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
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
