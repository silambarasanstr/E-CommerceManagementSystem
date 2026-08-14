import { Link } from "react-router-dom";
import type { CategoryType } from "../../types/category";

type CategoryCardProps = {
  category: CategoryType;
  showView?: boolean;
};

const baseUrl = "http://localhost:4000";

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  showView = true,
}) => {
  return (
    <Link to={`/category/${category._id}`} className="block h-full group">
      <div className="relative flex flex-col overflow-hidden transition-shadow duration-200 bg-white border border-gray-300 shadow-sm rounded-2xl hover:shadow-md">
        {/* Image */}
        <div className="overflow-hidden bg-gray-100 aspect-4/3">
          {category.image ? (
            <img
              src={
                category.image.startsWith("http")
                  ? category.image
                  : `${baseUrl}${category.image}`
              }
              alt={category.name}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
            {category.name}
          </h2>

          {category.description && (
            <p className="mt-2 text-sm leading-6 text-gray-500 line-clamp-3 min-h-18">
              {category.description}
            </p>
          )}

          {showView && (
            <div className="flex items-center text-sm font-medium text-blue-600">
              View Category
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
