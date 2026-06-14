import { Link } from "react-router-dom";
import type { CategoryType } from "../types/category";

type CategoryCardProps = {
  title?: string;
  category: CategoryType;
};

const baseUrl = "http://localhost:4000";

const ProductCategoryCard: React.FC<CategoryCardProps> = ({
  category,
  title,
}) => {
  return (
    <>
      <h2 className="p-2 text-xl font-semibold bg-gray-100 md:text-1xl">
        {title}
      </h2>
      <Link to={`/category/${category._id}`} className="block group">
        <div className="flex flex-col gap-4 p-5 transition-shadow duration-200 bg-white rounded-lg shadow sm:flex-row hover:shadow-md">
          {/* Image */}
          <div className="flex items-center justify-center flex-shrink-0 w-full h-40 overflow-hidden border border-gray-200 rounded-md sm:w-40 bg-gray-50">
            {category.image ? (
              <img
                src={
                  category.image.startsWith("http")
                    ? category.image
                    : `${baseUrl}${category.image}`
                }
                alt={category.name}
                className="object-contain w-full h-full p-2"
              />
            ) : (
              <span className="text-sm text-gray-400">No Image</span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-base font-semibold text-gray-800 transition-colors duration-150 sm:text-xl group-hover:text-blue-600">
                {category.name}
              </h2>
              {category.description && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCategoryCard;
