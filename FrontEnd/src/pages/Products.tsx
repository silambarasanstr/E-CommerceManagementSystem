import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import { getCategories } from "../services/categoryServices";
import type { ProductType } from "../types/product";
import ProductCard from "../component/ProductCard";
import EmptyState from "../component/ui/EmptyState";
import ErrorState from "../component/ui/ErrorState";
import LoadingState from "../component/ui/LoadingState";
import Checkbox from "../component/ui/checkbox";
import type { CategoryType } from "../types/category";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts({
        category,
        // brand,
        // minPrice,
        // maxPrice,
        // sort,
        // page,
        limit: 12,
      });

      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (products.length === 0) return <EmptyState message="No products found." />;

  

  return (
    <div className="max-w-screen-xl px-3 py-4 mx-auto">
      <div className="flex gap-4">
        <aside className="w-64 px-4 py-3 bg-white border border-gray-200">
          {/* <ProductSidebar /> */}
          <div>
            <h2 className="font-semibold text-[15px]">Filters</h2>
          </div>

          <div className="px-4 text-sm border-b border-gray-100">
            <div className="pb-3 space-y-0.5">
              {categories.map((cat) => (
                <Checkbox
                  key={cat._id}
                  id={cat._id}
                  label={cat.name}
                  checked={category === cat.name}
                  onChange={() => {
                    setSearchParams({
                      category: cat.name,
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
