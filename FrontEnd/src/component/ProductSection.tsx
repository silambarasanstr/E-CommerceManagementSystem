import type { ProductType } from "../types/product";
import ProductCard from "./ProductCard";

type ProductSectionProps = {
  title?: string;
  products?: ProductType[];
  poster?: string;
  reverse?: boolean; // poster left or right
};

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  poster,
  reverse,
}) => {
  return (
    <section className="w-full p-4 space-y-5 bg-white rounded-md md:p-6">
      <h2 className="p-2 text-xl font-semibold bg-gray-100 md:text-1xl">
        {title}
      </h2>
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
          {products?.length === 0 ? (
            <p className="text-center text-gray-500">No product available</p>
          ) : (
            products?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
