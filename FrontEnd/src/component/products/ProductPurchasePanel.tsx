import { Package, ShoppingCart } from "lucide-react";
import type { ProductType } from "../../types/product";

type Props = {
  product: ProductType;
  isAlreadyInCart: boolean;
  handleAddToCart: () => void;
  handleBuyNow: () => void;
};

const ProductPurchasePanel = ({
  product,
  isAlreadyInCart,
  handleAddToCart,
  handleBuyNow,
}: Props) => {
  return (
    <div className="sticky self-start top-20">
      {/* Image Box */}
      <div className="p-4 bg-white border border-gray-300 rounded">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-112.5"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 h-112.5">
            <Package size={60} />
            <p>No Image Available</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAlreadyInCart}
          className="flex items-center justify-center gap-2 py-4 font-semibold text-white bg-orange-500 rounded disabled:opacity-60"
        >
          <ShoppingCart size={18} />
          {isAlreadyInCart ? "ADDED" : "ADD"}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={!product.inStock}
          className="py-4 font-semibold text-white bg-orange-600 rounded"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default ProductPurchasePanel;
