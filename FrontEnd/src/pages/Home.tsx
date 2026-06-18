import { useMemo, useEffect, useState } from "react";
import Banner from "../assets/banner.webp";
import Add1 from "../assets/add1.webp";
import Add2 from "../assets/add2.webp";
import Add3 from "../assets/add3.webp";
import Poster from "../assets/poster.webp";
import { getProducts } from "../services/productService";
import ProductSection from "../component/ProductSection";
import type { ProductType } from "../types/product";
import { getCategories } from "../services/categoryServices";
import CategorySection from "../component/CategorySection";
import type { CategoryType } from "../types/category";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productData);
        setCategory(categoryData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const featuredProducts = products?.filter((p) => p.isFeatured) ?? [];

  const PreviewProducts = featuredProducts.slice(0, 5);
  const PreviewCategories = category.slice(0, 5);

  useEffect(() => {
    document.title = "Home | Ecommerce";
  }, []);

  return (
    <div className="px-3 py-3 space-y-6">
      {/* Banner */}
      <div>
        <img
          src={Banner}
          className="object-cover w-full rounded-lg"
          alt="banner"
        />
      </div>

      <ProductSection
        title={"Featured Products"}
        products={PreviewProducts}
        poster={Poster}
      />

      <div className="grid grid-cols-1 gap-4 my-6 sm:grid-cols-2 md:grid-cols-3">
        {[Add1, Add2, Add3].map((ad, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden transition-shadow duration-300 rounded-lg shadow-md cursor-pointer group hover:shadow-lg"
          >
            <img
              src={ad}
              alt={`advertisement ${idx + 1}`}
              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <CategorySection
        title="Shop by Category"
        categories={PreviewCategories}
        poster={Poster}
        reverse={true}
      />
    </div>
  );
};

export default Home;
