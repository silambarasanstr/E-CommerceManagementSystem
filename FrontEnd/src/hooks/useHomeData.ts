import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryServices";
import type { ProductType } from "../types/product";
import type { CategoryType } from "../types/category";

export const useHomeData = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(), 
          getCategories(),
        ]);

        setProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        setError("Failed to fetch home data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
  };
};
