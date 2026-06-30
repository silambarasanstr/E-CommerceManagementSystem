import { Minus, Plus, Star } from "lucide-react";
import type { ProductType } from "../../types/product";

type Props = {
  product: ProductType;
  quantity: number;
  discount: number;
  updateQuantity: (value: number) => void;
};

const ProductInfo = ({
  product,
  quantity,
  discount,
  updateQuantity,
}: Props) => {
  return (
    <div className="p-6 bg-white rounded">
      {/* Category */}
      <div className="text-sm text-gray-500">
        {typeof product.category === "object"
          ? product.category?.name
          : product.category}
      </div>

      {/* Product Name */}
      <h1 className="mb-3 text-2xl font-medium">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-green-600 rounded">
          {product.rating ?? 0}
          <Star size={14} fill="white" />
        </span>

        <span className="text-sm text-gray-500">
          {product.reviews ?? 0} Ratings
        </span>
      </div>

      {/* Price */}
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-semibold">₹{product.price}</span>

          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}

          {discount > 0 && (
            <span className="font-semibold text-green-600">
              {discount}% off
            </span>
          )}
        </div>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Quantity</h3>

        <div className="flex items-center border rounded w-fit">
          <button
            onClick={() => updateQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="p-3 hover:bg-gray-100 disabled:opacity-50"
          >
            <Minus size={18} />
          </button>

          <span className="w-12 text-center">{quantity}</span>

          <button
            onClick={() => updateQuantity(quantity + 1)}
            className="p-3 hover:bg-gray-100"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="mb-3 font-semibold">Description</h3>
        <p className="leading-7 text-gray-600">{product.description}</p>
      </div>

      {/* Stock */}
      <div className="mt-6">
        {product.inStock ? (
          <span className="text-green-600">✓ In Stock</span>
        ) : (
          <span className="text-red-600">✗ Out of Stock</span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;