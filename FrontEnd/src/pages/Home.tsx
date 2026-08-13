import BannerImage from "../assets/banner.webp";
import Add1 from "../assets/add1.webp";
import Add2 from "../assets/add2.webp";
import Add3 from "../assets/add3.webp";
import Poster from "../assets/poster.webp";

import ProductSection from "../component/products/ProductSection";
import CategorySection from "../component/category/CategorySection";
import BannerSlider from "../component/home/Banner";
import AdvertisementSection from "../component/home/AdvertisementSection";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { useHomeData } from "../hooks/useHomeData";

const Home: React.FC = () => {
  useDocumentTitle("Home | Ecommerce");

  const { products, categories, loading } = useHomeData();

  const featuredProducts = products.filter((p) => p.isFeatured);
  const previewProducts = featuredProducts.slice(0, 5);
  const previewCategories = categories.slice(0, 5);

  return (
    <div>
      <BannerSlider image={BannerImage} />

      <ProductSection
        products={previewProducts}
        poster={Poster}
        loading={loading}
      />

      <AdvertisementSection ads={[Add1, Add2, Add3]} />

      <CategorySection
        categories={previewCategories}
        poster={Poster}
        reverse={true}
        loading={loading}
      />
    </div>
  );
};

export default Home;
