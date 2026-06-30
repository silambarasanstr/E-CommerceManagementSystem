import type { CategoryType } from "../../types/category";
import CategoryCard from "./CategoryCard";
import PosterCard from "../home/PosterCard";
import SectionTitle from "../home/SectionTitle";

type CategorySectionProps = {
  title?: string;
  categories: CategoryType[];
  poster?: string;
  reverse?: boolean;
};

const CategorySection = ({
  categories,
  poster,
  reverse,
}: CategorySectionProps) => {
  return (
    <section className="w-full p-4 space-y-5 bg-white rounded-md md:p-6">
      <SectionTitle
        title="Shop By Category"
        className="text-3xl font-bold bg-white"
      />
      <div
        className={`flex gap-5 items-start ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        <PosterCard
          poster={poster}
          alt="Advertisement"
          className="w-48 sm:w-60 md:w-52"
        />
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {!categories || categories?.length === 0 ? (
            <p className="text-gray-500 ">No category available</p>
          ) : (
            categories.map((item) => (
              <CategoryCard key={item._id} category={item} showView={false} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
