import type { ProductType } from "../types/product";
import PosterCard from "./home/PosterCard";
import SectionTitle from "./home/SectionTitle";
import ProductCard from "./ProductCard";

type ProductSectionProps = {
  products?: ProductType[];
  poster?: string;
  reverse?: boolean; // poster left or right
};

const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  poster,
  reverse,
}) => {
  return (
    <section className="w-full p-4 space-y-5 bg-white rounded-md md:p-6">
      <SectionTitle
        title="Latest Products"
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
          {/* Method 1 */}
          {!products || products.length === 0 ? (
            <p className="text-gray-500 ">No product available</p>
          ) : (
            products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                showAddToCart={false}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
