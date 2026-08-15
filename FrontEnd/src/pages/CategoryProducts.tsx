import { useParams, Link } from "react-router-dom";
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

  const decodedCategory = categoryName
    ? decodeURIComponent(categoryName)
    : "";

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
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-4 py-6 mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize">
            {decodedCategory} Products
          </h1>

          {!loading && !error && (
            <p className="text-sm text-gray-500">
              Showing {products.length} items
            </p>
          )}
        </div>

        {/* LOADING */}
        {loading && <LoadingState />}

        {/* ERROR */}
        {!loading && error && <ErrorState error={error} />}

        {/* EMPTY */}
        {!loading && !error && products.length === 0 && (
          <EmptyState
            message={`No products found in ${decodedCategory}`}
          />
        )}

        {/* PRODUCTS */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product?category=${encodeURIComponent(
                  decodedCategory
                )}`}
                className="block"
              >
                <div className="transition-all duration-200 bg-white border border-gray-200 rounded-sm shadow-sm cursor-pointer hover:shadow-lg group">

                  {/* IMAGE */}
                  <div className="relative w-full h-48 overflow-hidden bg-white">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="px-3 pb-3">
                    <h2 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-10">
                      {product.name}
                    </h2>

                    {product.price !== undefined && (
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        ₹{product.price}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-green-600">
                      Free Delivery
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;