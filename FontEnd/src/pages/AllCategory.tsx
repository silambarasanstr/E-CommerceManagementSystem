import { useEffect, useMemo, useState } from "react";
import ProductCard from "../component/ProductCard";
import { getAllProducts } from "../services/productService";
import type { ProductType } from "../data/products";
import { categories } from "../data/products";

const AllCategory = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("featured");

  // 🔥 new filters
  const [selectedPrice, setSelectedPrice] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error Fetch Product", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // ✅ Category Filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // ✅ Price Filter
    if (selectedPrice !== "all") {
      filtered = filtered.filter((product) => {
        switch (selectedPrice) {
          case "low":
            return product.price < 500;
          case "mid":
            return product.price >= 500 && product.price <= 2000;
          case "high":
            return product.price > 2000 && product.price <= 10000;
          case "premium":
            return product.price > 10000;
          default:
            return true;
        }
      });
    }

    // ✅ Rating Filter
    if (selectedRating > 0) {
      filtered = filtered.filter(
        (product) => (product.rating ?? 0) >= selectedRating
      );
    }

    // ✅ Sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, selectedPrice, selectedRating, sortOption]);

  return (
    <div className="px-6 py-5">
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>
      <div className="flex gap-5 items-start">
        {/* Sidebar */}
        <aside className="lg:w-64 bg-white p-5 sticky top-20 h-fit">
          <div className="bg-card rounded-lg shadow-card">
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Categories</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">All Products</span>
                </label>
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Price</h4>
              <div className="space-y-2 text-sm">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value="all"
                    checked={selectedPrice === "all"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="mr-2"
                  />
                  All Prices
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value="low"
                    checked={selectedPrice === "low"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="mr-2"
                  />
                  Below ₹500
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value="mid"
                    checked={selectedPrice === "mid"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="mr-2"
                  />
                  ₹500 – ₹2000
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value="high"
                    checked={selectedPrice === "high"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="mr-2"
                  />
                  ₹2000 – ₹10000
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value="premium"
                    checked={selectedPrice === "premium"}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="mr-2"
                  />
                  Above ₹10000
                </label>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">
                Customer Ratings
              </h4>
              <div className="space-y-2 text-sm">
                {[4, 3, 2].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="mr-2"
                    />
                    {rating}★ & above
                  </label>
                ))}
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value="0"
                    checked={selectedRating === 0}
                    onChange={() => setSelectedRating(0)}
                    className="mr-2"
                  />
                  All Ratings
                </label>
              </div>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3">Sort By</h4>
              <select
                className="w-full p-2 border border-gray-200 rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-5 w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((ele) => (
              <ProductCard key={ele._id} product={ele} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found with selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
