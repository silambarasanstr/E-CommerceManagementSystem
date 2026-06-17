import { useMemo, useEffect, useState } from "react";
import Banner from "../assets/banner.webp";
import Add1 from "../assets/add1.webp";
import Add2 from "../assets/add2.webp";
import Add3 from "../assets/add3.webp";
import Poster from "../assets/poster.webp";
import { getProducts } from "../services/productService";
import type { ProductType } from "../types/product";
import type { CategoryType } from "../types/category";
import ProductSection from "../component/ProductSection";
import CategoryCard from "../component/CategoryCard";
import { getCategories } from "../services/categoryServices";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  //const [category, setCategory] = useState<CategoryType | null>(null);
  const [category, setCategory] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch products by category when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategories();
        setCategory(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategory();
  }, []);

  const featuredProducts = useMemo(
    () => products.filter((p) => p.isFeatured),
    [products],
  );



 const previewCategories = useMemo(
    () => category.slice(0, 4),
    [category]
  );

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
        products={featuredProducts.slice(0, 5)}
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
              alt={`ad ${idx + 1}`}
              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {previewCategories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
