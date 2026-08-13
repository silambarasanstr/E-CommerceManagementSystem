import type { ProductType } from "../../types/product";
import PosterCard from "../home/PosterCard";
import ProductCard from "./ProductCard";
import LoadingState from "../ui/LoadingState";
import EmptyState from "../ui/EmptyState";

import SectionTitle from "../home/SectionTitle";

type ProductSectionProps = {
  products?: ProductType[];
  poster?: string;
  reverse?: boolean;
  loading?: boolean;
};

const ProductSection: React.FC<ProductSectionProps> = ({
  products = [],
  poster,
  reverse = false,
  loading = false,
}) => {
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
          ) : products.length === 0 ? (
            <EmptyState message="No products available" />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {products.map((item) => (
                <ProductCard
                  key={item._id}
                  product={item}
                  showAddToCart={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
