import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

type CartItemType = {
  _id: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  product?: {
    _id: string;
    name: string;
    image?: string;
  };
};

type Props = {
  item: CartItemType;
  baseUrl: string;
  onIncrease: (id: string, qty: number) => void;
  onDecrease: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
};

const CartItemRow = ({
  item,
  baseUrl,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) => {
  if (!item.product) {
    return null;
  }

  const imageSrc =
    item.product.image && item.product.image.startsWith("http")
      ? item.product.image
      : item.product.image
        ? `${baseUrl}${item.product.image}`
        : "";

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-4 border-b border-gray-200">
      {/* Image */}
      <div className="flex items-center justify-center w-16 h-16 overflow-hidden border border-gray-200 rounded-md shrink-0 bg-gray-50">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={item.product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-xl">📦</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/product/${item.product._id}`}
          className="text-sm font-semibold text-gray-800 hover:text-orange-500 line-clamp-1"
        >
          {item.product.name}
        </Link>

        <p className="mt-1 text-sm font-bold text-gray-700">
          ₹{item.price.toFixed(2)}
        </p>
        {item.originalPrice && item.originalPrice > item.price && (
          <p className="text-xs text-red-500">
            ₹{item.originalPrice.toFixed(2)}{" "}
            <span className="line-through">Original</span>
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item._id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="flex items-center justify-center w-8 h-8 border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-6 text-sm font-semibold text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => onIncrease(item._id, item.quantity + 1)}
          className="flex items-center justify-center w-8 h-8 border rounded-md hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Total + Remove */}
      <div className="flex items-center gap-3">
        <span className="w-20 text-sm font-bold text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>

        <button
          onClick={() => onRemove(item._id)}
          className="flex items-center justify-center w-8 h-8 text-red-500 border rounded-md hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItemRow;
