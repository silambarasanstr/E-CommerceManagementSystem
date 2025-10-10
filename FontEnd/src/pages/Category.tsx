import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";
import type { ProductType } from "../data/products";
import ProductCategoryCard from "../component/ProductCategoryCard";

const Category: React.FC = () => {
  const params = useParams();
  const categoryName = params.name || ""; // fallback if undefined
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category (or show all if no category given)
  const categoryProducts = useMemo(() => {
    if (!categoryName) return products;
    return products.filter((p) => p.category === categoryName);
  }, [categoryName, products]);

  return (
    <div className="px-6 py-5">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-6 capitalize">
        {categoryName || "All Products"}
      </h2>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {categoryProducts.map((p) => (
            <ProductCategoryCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default Category;
