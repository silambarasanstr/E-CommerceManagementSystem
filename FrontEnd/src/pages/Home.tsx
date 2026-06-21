import BannerImage from "../assets/banner.webp";
import Add1 from "../assets/add1.webp";
import Add2 from "../assets/add2.webp";
import Add3 from "../assets/add3.webp";
import Poster from "../assets/poster.webp";
import ProductSection from "../component/ProductSection";
import CategorySection from "../component/CategorySection";
import BannerSlider from "../component/home/Banner";
import useDocumentTitle from "../hooks/useDocumentTitle";
import AdvertisementSection from "../component/home/AdvertisementSection";
import { useHomeData } from "../hooks/useHomeData";
import ErrorState from "../component/ui/ErrorState";
import LoadingState from "../component/ui/LoadingState";
import EmptyState from "../component/ui/EmptyState";

const Home: React.FC = () => {
  useDocumentTitle("Home | Ecommerce");
  const { products, categories, loading, error } = useHomeData();

  // Testing only
  // const testProducts: any[] = [];
  // const testCategories = categories;

  const featuredProducts = products.filter((p) => p.isFeatured) ?? [];
  const previewProducts = featuredProducts.slice(0, 5);
  const previewCategories = categories.slice(0, 5);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (products.length === 0 && categories.length === 0) {
    return <EmptyState message="No data available" />;
  }

  return (
    <div className="px-3 py-3 space-y-6">
      <BannerSlider image={BannerImage} />

      <ProductSection products={previewProducts} poster={Poster} />

      <AdvertisementSection ads={[Add1, Add2, Add3]} />

      <CategorySection
        categories={previewCategories}
        poster={Poster}
        reverse={true}
      />
    </div>
  );
};

export default Home;
