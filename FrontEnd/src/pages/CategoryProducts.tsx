import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ErrorState from "../component/ui/ErrorState";
import LoadingState from "../component/ui/LoadingState";
import EmptyState from "../component/ui/EmptyState";

type Product = {
  _id: string;
  name: string;
  price?: number;
  image?: string;
};

const CategoryProducts = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryName) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const decodedCategory = decodeURIComponent(categoryName);
        const data = await getAllProducts({
          category: decodedCategory,
          limit: 12,
        });
        setProducts(data || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (products.length === 0) return <EmptyState message="No products found." />;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-screen-xl px-4 py-6 mx-auto">
        {/* HEADER */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize">
            {categoryName} Products
          </h1>
          <p className="text-sm text-gray-500">
            Showing {products.length} items
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="transition-all duration-200 bg-white border border-gray-200 rounded-sm shadow-sm cursor-pointer hover:shadow-lg group"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48 overflow-hidden bg-white">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="px-3 pb-3">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                  {product.name}
                </h2>

                {/* PRICE */}
                {product.price !== undefined && (
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    ₹{product.price}
                  </p>
                )}

                {/* SMALL BADGE (optional Flipkart feel) */}
                <p className="mt-1 text-xs text-green-600">Free Delivery</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
