import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { ProductType } from "../types/product";

import { useCallback, useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart, Star, Package, Tag } from "lucide-react";

import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import toast from "react-hot-toast";

const Products: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(false);

    try {
      const data = await getProductById(id);
      if (!data) throw new Error("Not found");
      setProduct(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const updateQuantity = (n: number) => {
    if (n >= 1) setQuantity(n);
  };

  // const handleAddToCart = () => {
  //   if (!product) return;

  //   dispatch(
  //     addToCart({
  //       _id: product._id,
  //       name: product.name,
  //       price: product.price,
  //       image: product.image,
  //       category: product.category?.name, // ✅ FIX HERE
  //       quantity,
  //     })
  //   );

  //   toast.success(`${product.name} added to cart`);
  //   setAddedToCart(true);
  //   setTimeout(() => setAddedToCart(false), 2000);
  // };

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (error || !product)
    return <p className="p-10 text-center text-red-500">Product not found</p>;

  return (
  <div className="min-h-screen bg-gray-100">
    <div className="px-4 py-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[40%_60%]">
        {/* LEFT SIDE */}
        <div className="sticky self-start top-20">
          <div className="p-4 bg-white border border-gray-300 rounded">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-[450px]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 h-[450px]">
                <Package size={60} />
                <p>No Image Available</p>
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              disabled={!product.inStock}
              className="flex items-center justify-center gap-2 py-4 font-semibold text-white transition bg-orange-500 hover:bg-orange-600"
            >
              <ShoppingCart size={20} />
              ADD TO CART
            </button>

            <button className="py-4 font-semibold text-white transition bg-orange-600 hover:bg-orange-700">
              BUY NOW
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 bg-white rounded">
          {/* Category */}
          <div className="mb-2 text-sm text-gray-500">
            {product.category?.name}
          </div>

          {/* Product Name */}
          <h1 className="mb-3 text-2xl font-medium text-gray-800">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-green-600 rounded">
              {product.rating}
              <Star size={14} fill="white" />
            </span>

            <span className="text-sm font-medium text-gray-500">
              {product.reviews} Ratings & Reviews
            </span>
          </div>

          {/* Price */}
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold">
                ₹{product.price.toLocaleString()}
              </span>

              <span className="text-lg text-gray-400 line-through">
                ₹{Math.round(product.price * 1.3).toLocaleString()}
              </span>

              <span className="font-semibold text-green-600">
                30% off
              </span>
            </div>
          </div>

          {/* Offers */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Available Offers</h3>

            <ul className="space-y-2 text-sm">
              <li>
                🎉 Bank Offer - 10% Instant Discount on Credit Cards
              </li>

              <li>
                🎉 Special Price - Get extra discount on this item
              </li>

              <li>
                🎉 Free Delivery on orders above ₹499
              </li>
            </ul>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="mb-2 font-semibold">Quantity</h3>

            <div className="flex items-center border rounded w-fit">
              <button
                onClick={() => updateQuantity(quantity - 1)}
                disabled={quantity <= 1}
                className="p-3 hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>

              <span className="text-center w-14">
                {quantity}
              </span>

              <button
                onClick={() => updateQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Delivery */}
          <div className="pb-5 mb-5 border-b">
            <h3 className="mb-2 font-semibold">
              Delivery
            </h3>

            <p className="text-sm text-gray-600">
              Delivery in 3-5 business days 🚚
            </p>
          </div>

          {/* Highlights */}
          <div className="pb-5 mb-5 border-b">
            <h3 className="mb-3 font-semibold">
              Highlights
            </h3>

            <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
              <li>Premium Quality Product</li>
              <li>Easy Return Policy</li>
              <li>Secure Payment</li>
              <li>Fast Delivery</li>
            </ul>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-3 font-semibold">
              Description
            </h3>

            <p className="leading-7 text-gray-600">
              {product.description}
            </p>
          </div>

          {/* Stock */}
          <div className="mt-6">
            {product.inStock ? (
              <span className="font-medium text-green-600">
                ✓ In Stock
              </span>
            ) : (
              <span className="font-medium text-red-600">
                ✗ Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Products;
