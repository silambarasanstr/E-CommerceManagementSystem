import { useEffect, useState } from "react";
import Banner from "../assets/banner.webp";
import Add1 from "../assets/add1.webp";
import Add2 from "../assets/add2.webp";
import Add3 from "../assets/add3.webp";
import Poster from "../assets/poster.webp";
import { getProduct } from "../services/productService";
import { categories, type ProductType } from "../data/products";
import ProductSection from "../component/ProductSection";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduct();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6 px-3 py-3">
      {/* Banner */}
      <div>
        <img
          src={Banner}
          className="w-full object-cover rounded-lg"
          alt="banner"
        />
      </div>

      {/* Mobiles Section */}
      <ProductSection
        categoryId="mobiles"
        title={categories.find((c) => c.id === "mobiles")?.name || "Mobiles"}
        products={products}
        poster={Poster}
      />

      {/* Ads Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
        {[Add1, Add2, Add3].map((ad, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={ad}
              alt={`ad ${idx + 1}`}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Appliances Section */}
      <ProductSection
        categoryId="appliances"
        title={
          categories.find((c) => c.id === "appliances")?.name || "Appliances"
        }
        products={products}
        poster={Poster}
        reverse
      />
    </div>
  );
};

export default Home;
