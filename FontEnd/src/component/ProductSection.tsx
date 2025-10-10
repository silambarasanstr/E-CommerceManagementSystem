import type { ProductType } from "../data/products";
import ProductCard from "./ProductCard";

type ProductSectionProps = {
  categoryId: string;
  title: string;
  products: ProductType[];
  poster?: string;
  reverse?: boolean; // poster left or right
};

const ProductSection: React.FC<ProductSectionProps> = ({
  categoryId,
  title,
  products,
  poster,
  reverse,
}) => {
  return (
    <section className="w-full rounded-md bg-white p-4 md:p-6 space-y-5">
      <h2 className="text-xl md:text-1xl font-semibold bg-gray-100 p-2">
        {title}
      </h2>
      <div
        className={`flex gap-5 items-start ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        {poster && (
          <div className="hidden md:flex justify-center">
            <img src={poster} alt="poster" className="w-48 sm:w-60 md:w-52" />
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 flex-1">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No product available</p>
          ) : (
            products
              .filter((item) => item.category === categoryId)
              .slice(0, 5)
              .map((item) => <ProductCard key={item._id} product={item} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
