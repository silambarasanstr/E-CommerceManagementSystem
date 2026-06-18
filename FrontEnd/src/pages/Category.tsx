import CategoryCard from "../component/CategoryCard";
import { getCategories } from "../services/categoryServices";
import type { CategoryType } from "../types/category";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCategories();
      setCategoryList(data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="mb-4 text-red-500">{error}</p>
        <button
          onClick={fetchCategories}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (categoryList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-gray-500">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl px-3 py-4 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shop By Category</h1>
        <p className="mt-1 text-gray-500">
          {categoryList.length} categor
          {categoryList.length === 1 ? "y" : "ies"} available
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categoryList.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.name}`}
          >
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;