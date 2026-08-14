import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import { getCategories } from "../services/categoryServices";
import type { ProductType } from "../types/product";
import ProductCard from "../component/products/ProductCard";
import EmptyState from "../component/ui/EmptyState";
import ErrorState from "../component/ui/ErrorState";
import LoadingState from "../component/ui/LoadingState";
import Checkbox from "../component/ui/checkbox";
import type { CategoryType } from "../types/category";
import { useSearchParams } from "react-router-dom";

const MIN = 0;
const MAX = 100000;
const DEBOUNCE_MS = 400;

const ratingOptions = [4, 3, 2, 1];
const discountOptions = [50, 40, 30, 20, 10];

function formatPrice(value: number) {
  return "₹" + value.toLocaleString("en-IN");
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);

  const [selectedAvailability, setSelectedAvailability] = useState<
    boolean | null
  >(null);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);

      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Debounce price changes so we don't fire a request on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          setError(null);

          const data = await getAllProducts({
            category,
            minPrice,
            maxPrice,
            brand:
              selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
            limit: 12,
          });

          let filteredProducts = data;

          if (selectedRatings.length > 0) {
            filteredProducts = data.filter((product) =>
              selectedRatings.some((rating) => product.rating >= rating),
            );
          }

          if (selectedDiscounts.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              selectedDiscounts.some(
                (discount) => (product.discount ?? 0) >= discount,
              ),
            );
          }

          if (selectedBrands.length === 0) {
            const uniqueBrands = [
              ...new Set(data.map((product) => product.brand)),
            ];
            setBrands(uniqueBrands);
          }

          if (selectedAvailability !== null) {
            filteredProducts = filteredProducts.filter(
              (product) => product.inStock === selectedAvailability,
            );
          }

          setProducts(filteredProducts);
        } catch (err: any) {
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [
    category,
    minPrice,
    maxPrice,
    selectedRatings,
    selectedDiscounts,
    selectedBrands,
    selectedAvailability,
  ]);

  const handleMinChange = (value: number) => {
    const newValue = Math.max(MIN, Math.min(value, maxPrice - 100));
    setMinPrice(newValue);
  };

  const handleMaxChange = (value: number) => {
    const newValue = Math.min(MAX, Math.max(value, minPrice + 100));
    setMaxPrice(newValue);
  };

  const handleCategoryToggle = (catName: string) => {
    if (category === catName) {
      // clicking the active category again clears the filter
      const next = new URLSearchParams(searchParams);
      next.delete("category");
      setSearchParams(next);
    } else {
      setSearchParams({ category: catName });
    }
  };

  const filteredBrands = brands.filter((b) => b);

  const visibleBrands = brands.slice(0, 5);

  return (
    <div className="px-3 py-4 mx-auto max-w-7xl">
      <div className="flex gap-4">
        <aside className="w-64 bg-white border border-gray-200 rounded">
          <div className="px-3 py-3 bg-blue-600 rounded-t">
            <h2 className="font-semibold text-[15px] text-white">Filters</h2>
          </div>

          <div className="p-4 text-sm border-b border-gray-100">
            <div className="mb-3 font-medium">CATEGORY</div>
            <div className="pb-3 space-y-0.5">
              {categoriesLoading ? (
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : (
                categories.map((cat) => (
                  <Checkbox
                    key={cat._id}
                    id={cat._id}
                    label={cat.name}
                    checked={category === cat.name}
                    onChange={() => handleCategoryToggle(cat.name)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="p-4 text-sm border-b border-gray-100">
            <div className="mb-3 font-medium">PRICE RANGE</div>

            <div className="flex items-center gap-2 mb-5">
              <input
                type="number"
                min={MIN}
                max={MAX}
                value={minPrice}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className="w-24 px-2 py-1 text-xs border rounded-md outline-none"
              />
              <span className="text-gray-400">to</span>
              <input
                type="number"
                min={MIN}
                max={MAX}
                value={maxPrice}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                className="w-24 px-2 py-1 text-xs border rounded-md outline-none"
              />
            </div>

            <div className="relative h-6">
              <div className="absolute top-2 left-0 right-0 h-1.5 rounded-full bg-gray-300" />
              <div
                className="absolute top-2 h-1.5 rounded-full bg-[#2874f0]"
                style={{
                  left: `${(minPrice / MAX) * 100}%`,
                  width: `${((maxPrice - minPrice) / MAX) * 100}%`,
                }}
              />
              <div
                className="absolute w-4 h-4 bg-white border-2 border-[#2874f0] rounded-full shadow pointer-events-none"
                style={{
                  left: `calc(${(minPrice / MAX) * 100}% - 8px)`,
                  top: "2px",
                }}
              />
              <div
                className="absolute w-4 h-4 bg-white border-2 border-[#2874f0] rounded-full shadow pointer-events-none"
                style={{
                  left: `calc(${(maxPrice / MAX) * 100}% - 8px)`,
                  top: "2px",
                }}
              />

              {/* Min thumb gets priority click access once it's past the midpoint,
                  so both thumbs stay reachable instead of the max thumb always winning */}
              <input
                type="range"
                min={MIN}
                max={MAX}
                value={minPrice}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className="absolute w-full h-6 opacity-0 cursor-pointer"
                style={{ zIndex: minPrice > MAX / 2 ? 5 : 3 }}
              />
              <input
                type="range"
                min={MIN}
                max={MAX}
                value={maxPrice}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                className="absolute w-full h-6 opacity-0 cursor-pointer"
                style={{ zIndex: 4 }}
              />
            </div>

            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <span>{formatPrice(minPrice)}</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
          </div>

          <div className="p-4 text-sm border-b border-gray-100">
            <div className="mb-3 font-medium">CUSTOMER RATINGS</div>

            <div className="space-y-2">
              {ratingOptions.map((rating) => (
                <Checkbox
                  key={rating}
                  id={`rating-${rating}`}
                  label={
                    <span className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold bg-green-600 text-white px-1.5 py-0.5 rounded">
                        {rating} ★
                      </span>
                      <span className="text-gray-600 text-[13px]">
                        &amp; above
                      </span>
                    </span>
                  }
                  checked={selectedRatings.includes(rating)}
                  onChange={() => {
                    if (selectedRatings.includes(rating)) {
                      setSelectedRatings(
                        selectedRatings.filter((r) => r !== rating),
                      );
                    } else {
                      setSelectedRatings([...selectedRatings, rating]);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="p-4 text-sm border-b border-gray-100">
            <div className="mb-3 font-medium">DISCOUNT</div>

            <div className="space-y-2">
              {discountOptions.map((discount) => (
                <Checkbox
                  key={discount}
                  id={`discount-${discount}`}
                  label={`${discount}% or more`}
                  checked={selectedDiscounts.includes(discount)}
                  onChange={() => {
                    if (selectedDiscounts.includes(discount)) {
                      setSelectedDiscounts(
                        selectedDiscounts.filter((d) => d !== discount),
                      );
                    } else {
                      setSelectedDiscounts([...selectedDiscounts, discount]);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="p-4 text-sm border-b border-gray-100">
            <div className="mb-3 font-medium">BRAND</div>

            <div className="space-y-2">
              {loading ? (
                <>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                </>
              ) : (
                visibleBrands.map((brand) => (
                  <Checkbox
                    key={brand}
                    id={brand}
                    label={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => {
                      if (selectedBrands.includes(brand)) {
                        setSelectedBrands(
                          selectedBrands.filter((b) => b !== brand),
                        );
                      } else {
                        setSelectedBrands([...selectedBrands, brand]);
                      }
                    }}
                  />
                ))
              )}
            </div>

            <div>
              {!showAllBrands && filteredBrands.length > 5 && (
                <button
                  onClick={() => setShowAllBrands(true)}
                  className="mt-2 text-[12px] text-[#2874f0] font-medium hover:underline"
                >
                  + {filteredBrands.length - 5} More
                </button>
              )}
            </div>
          </div>

          <div className="p-4 text-sm border-b border-gray-100">
            <div className="mb-3 font-medium">Availability</div>

            <div className="space-y-2">
              {/* In Stock */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={selectedAvailability === true}
                  onChange={() => setSelectedAvailability(true)}
                />
                <span>In Stock</span>
              </label>

              {/* Exclude Out of Stock */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={selectedAvailability === false}
                  onChange={() => setSelectedAvailability(false)}
                />
                <span>Exclude Out of Stock</span>
              </label>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} />
          ) : products.length === 0 ? (
            <EmptyState message="No products found." />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
