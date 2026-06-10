import { useParams, useNavigate } from "react-router-dom";
//import { getSingleProduct } from "../services/productService";
import type { ProductType } from "../data/products";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Package,
  Tag,
} from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import WishlistButton from "../component/WishlistButton";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_API_URL;

// ─── Loading skeleton ─────────────────────────────────────────────────────────

const ProductSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-5xl px-4 py-8 mx-auto sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 animate-pulse">
        <div className="bg-white border border-gray-100 rounded-2xl h-96" />
        <div className="py-4 space-y-4">
          <div className="w-1/4 h-3 bg-gray-200 rounded" />
          <div className="w-3/4 h-6 bg-gray-200 rounded" />
          <div className="w-1/3 h-4 bg-gray-200 rounded" />
          <div className="w-1/4 h-8 mt-4 bg-gray-200 rounded" />
          <div className="w-full h-3 mt-6 bg-gray-200 rounded" />
          <div className="w-5/6 h-3 bg-gray-200 rounded" />
          <div className="w-4/6 h-3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Error state ──────────────────────────────────────────────────────────────

const ProductError = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
    <div className="text-center">
      <div className="mb-4 text-5xl">⚠️</div>
      <h2 className="mb-1 text-base font-semibold text-gray-800">
        Product not found
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        We couldn't load this product. It may have been removed.
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2 text-sm font-medium text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
      >
        Try again
      </button>
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const Products: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // const fetchProduct = useCallback(async () => {
  //   if (!id) return;
  //   setLoading(true);
  //   setError(false);
  //   try {
  //     const data = await getSingleProduct(id);
  //     if (!data) throw new Error("Not found");
  //     setProduct(data);
  //   } catch {
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   fetchProduct();
  // }, [fetchProduct]);

  // const handleAddToCart = useCallback(() => {
  //   if (!product) return;
  //   dispatch(
  //     addToCart({
  //       _id: product._id,
  //       name: product.name,
  //       price: product.price,
  //       image: product.image,
  //       category: product.category,
  //       quantity,
  //     }),
  //   );
  //   toast.success(`${product.name} added to cart`);
  //   setAddedToCart(true);
  //   setTimeout(() => setAddedToCart(false), 2000);
  // }, [dispatch, product, quantity]);

  // const updateQuantity = useCallback((n: number) => {
  //   if (n >= 1) setQuantity(n);
  // }, []);

  // ── Discount calculation ───────────────────────────────────────────────────
  // const discount =
  //   product?.originalPrice && product.originalPrice > product.price
  //     ? Math.round(
  //         ((product.originalPrice - product.price) / product.originalPrice) *
  //           100,
  //       )
  //     : null;

  // if (loading) return <ProductSkeleton />;
  // if (error || !product) return <ProductError onRetry={fetchProduct} />;

  // const imageUrl = product.image
  //   ? product.image.startsWith("http")
  //     ? product.image
  //     : `${baseUrl}${product.image}`
  //   : null;

  return (
    <div></div>
    // <div className="min-h-screen bg-gray-50">
    //   {/* ── Top bar ──────────────────────────────────────────────────────────── */}
    //   <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
    //     <div className="flex items-center max-w-5xl gap-3 px-4 py-3 mx-auto sm:px-6">
    //       <button
    //         onClick={() => navigate(-1)}
    //         className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
    //       >
    //         <ArrowLeft className="w-4 h-4" />
    //         Back
    //       </button>
    //       <span className="text-gray-300">/</span>
    //       <span className="text-sm text-gray-400 capitalize truncate">
    //         {product.category}
    //       </span>
    //       <span className="text-gray-300">/</span>
    //       <span className="max-w-xs text-sm text-gray-600 truncate">
    //         {product.name}
    //       </span>
    //     </div>
    //   </div>

    //   {/* ── Content ──────────────────────────────────────────────────────────── */}
    //   <div className="max-w-5xl px-4 py-8 mx-auto sm:px-6">
    //     <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
    //       {/* LEFT — Image */}
    //       <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
    //         {imageUrl ? (
    //           <div className="relative">
    //             {discount && (
    //               <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
    //                 {discount}% OFF
    //               </span>
    //             )}
    //             <img
    //               src={imageUrl}
    //               alt={product.name}
    //               className="w-full max-h-[420px] object-contain p-6"
    //             />
    //           </div>
    //         ) : (
    //           <div className="flex flex-col items-center justify-center text-gray-300 h-80">
    //             <Package className="w-16 h-16 mb-2" />
    //             <span className="text-sm">No image available</span>
    //           </div>
    //         )}
    //       </div>

    //       {/* RIGHT — Details */}
    //       <div className="space-y-5">
    //         {/* Category badge */}
    //         <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-600 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full capitalize">
    //           <Tag className="w-3 h-3" />
    //           {product.category}
    //         </span>

    //         {/* Name */}
    //         <h1 className="text-xl font-bold leading-snug text-gray-900">
    //           {product.name}
    //         </h1>

    //         {/* Rating */}
    //         <div className="flex items-center gap-2.5">
    //           <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
    //             <span>{product.rating}</span>
    //             <Star className="w-3 h-3 fill-white" />
    //           </div>
    //           <span className="text-sm text-gray-400">
    //             {product.reviews?.toLocaleString()} reviews
    //           </span>
    //           {/* Stock badge */}
    //           <span
    //             className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full ${
    //               product.inStock
    //                 ? "bg-green-50 text-green-700 border border-green-100"
    //                 : "bg-red-50 text-red-600 border border-red-100"
    //             }`}
    //           >
    //             {product.inStock ? "In Stock" : "Out of Stock"}
    //           </span>
    //         </div>

    //         {/* Price */}
    //         <div className="flex items-baseline gap-3">
    //           <span className="text-3xl font-bold text-gray-900">
    //             ₹{product.price.toLocaleString()}
    //           </span>
    //           {product.originalPrice &&
    //             product.originalPrice > product.price && (
    //               <>
    //                 <span className="text-base text-gray-400 line-through">
    //                   ₹{product.originalPrice.toLocaleString()}
    //                 </span>
    //                 <span className="text-sm font-semibold text-green-600">
    //                   Save ₹
    //                   {(product.originalPrice - product.price).toLocaleString()}
    //                 </span>
    //               </>
    //             )}
    //         </div>

    //         {/* Description */}
    //         <p className="text-sm leading-relaxed text-gray-600">
    //           {product.description}
    //         </p>

    //         <hr className="border-gray-100" />

    //         {/* Quantity + Add to Cart */}
    //         <div className="flex items-center gap-3">
    //           {/* Quantity stepper */}
    //           <div className="flex items-center overflow-hidden border border-gray-200 rounded-xl">
    //             <button
    //               onClick={() => updateQuantity(quantity - 1)}
    //               disabled={quantity <= 1}
    //               className="flex items-center justify-center h-10 text-gray-600 transition-colors w-9 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
    //             >
    //               <Minus className="w-3.5 h-3.5" />
    //             </button>
    //             <span className="w-10 text-sm font-semibold text-center text-gray-800">
    //               {quantity}
    //             </span>
    //             <button
    //               onClick={() => updateQuantity(quantity + 1)}
    //               disabled={!product.inStock}
    //               className="flex items-center justify-center h-10 text-gray-600 transition-colors w-9 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
    //             >
    //               <Plus className="w-3.5 h-3.5" />
    //             </button>
    //           </div>

    //           {/* Add to cart */}
    //           <button
    //             onClick={handleAddToCart}
    //             disabled={!product.inStock}
    //             className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
    //               addedToCart
    //                 ? "bg-green-600 text-white"
    //                 : "bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
    //             }`}
    //           >
    //             <ShoppingCart className="w-4 h-4" />
    //             {addedToCart ? "Added!" : "Add to Cart"}
    //           </button>
    //         </div>

    //         {/* Wishlist */}
    //         <WishlistButton product={product} showText />

    //         {/* Meta info */}
    //         <div className="text-sm border border-gray-100 divide-y divide-gray-100 bg-gray-50 rounded-xl">
    //           <div className="flex items-center gap-3 px-4 py-3">
    //             <span className="flex-shrink-0 w-20 text-gray-400">
    //               Category
    //             </span>
    //             <span className="font-medium text-gray-700 capitalize">
    //               {product.category}
    //             </span>
    //           </div>
    //           <div className="flex items-center gap-3 px-4 py-3">
    //             <span className="flex-shrink-0 w-20 text-gray-400">Stock</span>
    //             <span
    //               className={`font-medium ${product.inStock ? "text-green-700" : "text-red-600"}`}
    //             >
    //               {product.inStock ? "Available" : "Unavailable"}
    //             </span>
    //           </div>
    //           {product.rating !== undefined && (
    //             <div className="flex items-center gap-3 px-4 py-3">
    //               <span className="flex-shrink-0 w-20 text-gray-400">
    //                 Rating
    //               </span>
    //               <span className="font-medium text-gray-700">
    //                 {product.rating} / 5
    //               </span>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Products;
