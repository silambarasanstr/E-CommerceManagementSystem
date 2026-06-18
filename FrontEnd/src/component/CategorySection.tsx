import type { CategoryType } from "../types/category";
import CategoryCard from "./CategoryCard";

type CategorySectionProps = {
  title?: string;
  categories: CategoryType[];
  poster?: string;
  reverse?: boolean;
};

const CategorySection = ({
  title,
  categories,
  poster,
  reverse,
}: CategorySectionProps) => {
  return (
    <section className="w-full p-4 space-y-5 bg-white rounded-md md:p-6">
      {title && (
        <h2 className="p-2 text-xl font-semibold bg-gray-100 md:text-1xl">
          {title}
        </h2>
      )}
      <div
        className={`flex gap-5 items-start ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        {poster && (
          <div className="justify-center hidden md:flex">
            <img src={poster} alt="poster" className="w-48 sm:w-60 md:w-52" />
          </div>
        )}
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories?.length === 0 ? (
            <p className="text-center text-gray-500">No category available</p>
          ) : (
            categories?.map((item) => (
              <CategoryCard key={item._id} category={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
