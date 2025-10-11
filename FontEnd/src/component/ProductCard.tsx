import { Link } from "react-router-dom";
import type { ProductType } from "../data/products";
import WishlistButton from "./WishlistButton";

type ProductCardProps = {
  product: ProductType;
};

// Use Vite environment variable
const baseUrl = import.meta.env.VITE_API_URL;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative text-center rounded-md flex justify-center border border-gray-200 p-5">
      <div className="absolute top-2 right-2">
        <WishlistButton product={product} />
      </div>

      <Link to={`/product/${product._id}`}>
        {product.image ? (
          <img
            src={
              product.image.startsWith("http")
                ? product.image
                : `${baseUrl}${product.image}` // ✅ use baseUrl from env
            }
            alt={product.name}
            className="mb-4 h-[152px] object-contain"
          />
        ) : (
          <span>No Image</span>
        )}
        <h1 className="text-md font-[14px] mb-1 truncate w-36">{product.name}</h1>
        <p className="text-md font-semibold">From ₹ {product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
