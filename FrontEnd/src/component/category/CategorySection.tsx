import type { CategoryType } from "../../types/category";
import CategoryCard from "./CategoryCard";
import PosterCard from "../home/PosterCard";
import SectionTitle from "../home/SectionTitle";
import LoadingState from "../ui/LoadingState";
import EmptyState from "../ui/EmptyState";

type CategorySectionProps = {
  title?: string;
  categories: CategoryType[];
  poster?: string;
  reverse?: boolean;
  loading?: boolean;
};

const CategorySection = ({
  categories,
  poster,
  reverse,
  loading = false,
}: CategorySectionProps) => {
  return (
    <section className="p-4 space-y-5 bg-white rounded-md md:p-6">
      <SectionTitle
        title="Latest Products"
        className="text-3xl font-bold bg-white"
      />
      <div
        className={`flex items-start gap-5 ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        {/* Poster */}
        {poster && (
          <div className="shrink-0">
            <PosterCard poster={poster} />
          </div>
        )}

        {/* Products */}
        <div className="flex-1">
          {loading ? (
            <LoadingState />
          ) : categories.length === 0 ? (
            <EmptyState message="No categories available" />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {categories.map((item) => (
                <CategoryCard key={item._id} category={item} showView={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
