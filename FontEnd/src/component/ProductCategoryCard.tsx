import { Link } from "react-router-dom";
import type { ProductType } from "../data/products";
import { Star } from "lucide-react";

type ProductCardProps = {
  product: ProductType;
};

// Use Vite environment variable
const baseUrl = import.meta.env.VITE_API_URL;

const ProductCategoryCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="relative flex flex-col sm:flex-row bg-white shadow p-5 rounded-lg justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4 flex-1">
          {/* Image */}
          <div className="flex-shrink-0 flex justify-center sm:justify-start border border-gray-200 p-5">
            {product.image ? (
              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `${baseUrl}${product.image}` // ✅ use baseUrl from env
                }
                alt={product.name}
                className="mb-4  w-[152px] h-[152px] object-contain "
              />
            ) : (
              <span>No Image</span>
            )}
          </div>

          {/* Product Info */}
          <div className=" flex flex-col ">
            <h1 className="text-md sm:text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h1>
            {/* ✅ Review and Ratings */}
            <div className="flex items-center gap-2 mb-3">
              <div className="text-[12px] font-medium px-2 py-0.5 bg-green-600 items-center text-white rounded inline-flex  gap-1">
                <span>{product?.rating}</span>
                <Star className={`h-3 w-3 gap-2 fill-white`} />
              </div>

              <div className="text-[14px] font-medium text-[#878787]">
                {product?.reviews} Reviews
              </div>
            </div>

            <div className="text-sm mt-3">
              <ul className="text-[#212121] text-[14px] font-normal">
                <li className="J+igdf">128 GB ROM</li>
                <li className="J+igdf">
                  15.49 cm (6.1 inch) Super Retina XDR Display
                </li>
                <li className="J+igdf">12MP + 12MP | 12MP Front Camera</li>
                <li className="J+igdf">
                  A15 Bionic Chip, 6 Core Processor Processor
                </li>
                <li className="J+igdf">
                  1 year warranty for phone and 1 year warranty for in Box
                  Accessories.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Price */}
        <div className="flex flex-col items-start sm:items-end ">
          <span className="text-lg sm:text-xl font-bold text-foreground">
            ₹{product.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCategoryCard;
