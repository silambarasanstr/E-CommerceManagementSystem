import CategoryCard from "../component/CategoryCard";
import EmptyState from "../component/ui/EmptyState";
import ErrorState from "../component/ui/ErrorState";
import LoadingState from "../component/ui/LoadingState";
import { getCategories } from "../services/categoryServices";
import type { CategoryType } from "../types/category";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (categories.length === 0)
    return <EmptyState message="No categories found." />;

  return (
    <div className="max-w-screen-xl px-3 py-4 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shop By Category</h1>
        <p className="mt-1 text-gray-500">
          {categories.length} categor
          {categories.length === 1 ? "y" : "ies"} available
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category._id} to={`/category/${category.name}`}>
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
