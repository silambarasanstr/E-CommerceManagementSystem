import { useEffect, useState } from "react";
import Banner from "../assets/banner.webp";
import Add1 from "../assets/add1.webp";
import Add2 from "../assets/add2.webp";
import Add3 from "../assets/add3.webp";
import Poster from "../assets/poster.webp";
import { getProducts } from "../services/productService";
import type { Product } from "../types/product";
import { categories, type ProductType } from "../data/products";
import ProductSection from "../component/ProductSection";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

      {/* Mobiles Section */}
      {/* <ProductSection
        categoryId="mobiles"
        title={categories.find((c) => c.id === "mobiles")?.name || "Mobiles"}
        products={products}
        poster={Poster}
      /> */}

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

      {/* <ProductSection
        // title={
        //   categories.find((c) => c.id === "appliances")?.name || "Appliances"
        // }
         products={products}
        poster={Poster}
        // reverse
      /> */}
    </div>
  );
};

export default Home;
