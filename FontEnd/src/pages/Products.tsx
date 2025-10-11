import { useParams } from "react-router-dom";
import { getSingleProduct } from "../services/productService";
import type { ProductType } from "../data/products";
import { useCallback, useEffect, useState } from "react";
import Button from "../component/ui/button";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import WishlistButton from "../component/WishlistButton";

// Use Vite environment variable
const baseUrl = import.meta.env.VITE_API_URL;

const Products: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const data = await getSingleProduct(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity,
      })
    );
  }, [dispatch, product, quantity]);

  const updateQuantity = useCallback((newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  }, []);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          
           {product.image ? (
          <img
            src={
              product.image.startsWith("http")
                ? product.image
                : `${baseUrl}${product.image}` // ✅ use baseUrl from env
            }
            alt={product.name}
            className="mb-4 w-full p-3 max-h-[400px] object-contain border border-gray-200"
          />
        ) : (
          <span>No Image</span>
        )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-[18px] mb-1">{product.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[12px] font-medium px-2 py-0.5 bg-green-600 text-white rounded inline-flex items-center gap-1">
              <span>{product.rating}</span>
              <Star className="h-3 w-3 fill-white" />
            </div>
            <div className="text-[14px] font-medium text-[#878787]">
              {product.reviews} Reviews
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-2xl font-bold text-foreground">
              ₹{product.price}
            </span>
            <span className="text-base text-[#878787] line-through">
              ₹ {product.originalPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-[#212121] text-sm mb-6">{product.description}</p>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button onClick={() => updateQuantity(quantity - 1)}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
              <Button onClick={() => updateQuantity(quantity + 1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="py-2 bg-[#3e3e3e] text-white flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Wishlist Button */}
          <div className="flex mb-3">
            <WishlistButton product={product} showText />
          </div>

          {/* Product Info */}
          <div className="border-t pt-5 border-gray-200">
            <dl className="space-y-2">
              <div className="flex">
                <dt className="font-medium text-foreground w-24">Category:</dt>
                <dd className="text-muted-foreground capitalize">{product.category}</dd>
              </div>
              <div className="flex">
                <dt className="font-medium text-foreground w-24">Stock:</dt>
                <dd>{product.inStock ? "Yes" : "No"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
