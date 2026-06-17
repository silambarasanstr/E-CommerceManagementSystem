import CategoryCard from "../component/CategoryCard";
import { getCategories } from "../services/categoryServices";
import type { CategoryType } from "../types/category";

// import { useEffect, useMemo, useState, useCallback } from "react";
// import ProductCard from "../component/ProductCard";
// import { getAllProducts } from "../services/productService";
// import type { ProductType } from "../data/products";
// import { categories } from "../data/products";
// import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";

// // ─── Filter config ────────────────────────────────────────────────────────────

// const PRICE_OPTIONS = [
//   { value: "all", label: "All Prices" },
//   { value: "low", label: "Below ₹500" },
//   { value: "mid", label: "₹500 – ₹2,000" },
//   { value: "high", label: "₹2,000 – ₹10,000" },
//   { value: "premium", label: "Above ₹10,000" },
// ];

// const SORT_OPTIONS = [
//   { value: "featured", label: "Featured" },
//   { value: "price-low", label: "Price: Low to High" },
//   { value: "price-high", label: "Price: High to Low" },
//   { value: "rating", label: "Highest Rated" },
//   { value: "name", label: "Name A–Z" },
// ];

// const RATING_OPTIONS = [4, 3, 2];

// // ─── Collapsible sidebar section ─────────────────────────────────────────────

// const FilterSection = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => {
//   const [open, setOpen] = useState(true);
//   return (
//     <div className="border-b border-gray-100 last:border-0">
//       <button
//         onClick={() => setOpen((o) => !o)}
//         className="flex items-center justify-between w-full px-5 py-3.5 text-left"
//       >
//         <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
//           {title}
//         </span>
//         {open ? (
//           <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
//         ) : (
//           <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//         )}
//       </button>
//       {open && <div className="px-5 pb-4">{children}</div>}
//     </div>
//   );
// };

// // ─── Radio option ─────────────────────────────────────────────────────────────

// const RadioOption = ({
//   name,
//   value,
//   checked,
//   onChange,
//   children,
// }: {
//   name: string;
//   value: string | number;
//   checked: boolean;
//   onChange: () => void;
//   children: React.ReactNode;
// }) => (
//   <label className="flex items-center gap-2.5 cursor-pointer group">
//     <span
//       className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
//         checked ? "border-orange-500" : "border-gray-300 group-hover:border-gray-400"
//       }`}
//     >
//       {checked && (
//         <span className="block w-2 h-2 bg-orange-500 rounded-full" />
//       )}
//     </span>
//     <input
//       type="radio"
//       name={name}
//       value={value}
//       checked={checked}
//       onChange={onChange}
//       className="sr-only"
//     />
//     <span className={`text-sm ${checked ? "text-gray-900 font-medium" : "text-gray-600"}`}>
//       {children}
//     </span>
//   </label>
// );

// // ─── Main component ───────────────────────────────────────────────────────────

// const AllCategory = () => {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");
//   const [sortOption, setSortOption] = useState<string>("featured");
//   const [selectedPrice, setSelectedPrice] = useState<string>("all");
//   const [selectedRating, setSelectedRating] = useState<number>(0);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const data = await getAllProducts();
//       setProducts(data);
//     } catch (err) {
//       console.error("Error fetching products", err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const hasActiveFilters =
//     selectedCategory !== "all" ||
//     selectedPrice !== "all" ||
//     selectedRating !== 0;

//   const resetFilters = () => {
//     setSelectedCategory("all");
//     setSelectedPrice("all");
//     setSelectedRating(0);
//     setSortOption("featured");
//   };

//   const filteredProducts = useMemo(() => {
//     let filtered = [...products];

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter((p) => p.category === selectedCategory);
//     }

//     if (selectedPrice !== "all") {
//       filtered = filtered.filter((p) => {
//         switch (selectedPrice) {
//           case "low":     return p.price < 500;
//           case "mid":     return p.price >= 500 && p.price <= 2000;
//           case "high":    return p.price > 2000 && p.price <= 10000;
//           case "premium": return p.price > 10000;
//           default:        return true;
//         }
//       });
//     }

//     if (selectedRating > 0) {
//       filtered = filtered.filter((p) => (p.rating ?? 0) >= selectedRating);
//     }

//     switch (sortOption) {
//       case "price-low":  filtered.sort((a, b) => a.price - b.price); break;
//       case "price-high": filtered.sort((a, b) => b.price - a.price); break;
//       case "rating":     filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
//       case "name":       filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
//     }

//     return filtered;
//   }, [products, selectedCategory, selectedPrice, selectedRating, sortOption]);

//   // ── Sidebar content (shared between desktop + mobile drawer) ───────────────

//   const SidebarContent = () => (
//     <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">

//       {/* Header */}
//       <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//         <span className="text-sm font-semibold text-gray-800">Filters</span>
//         {hasActiveFilters && (
//           <button
//             onClick={resetFilters}
//             className="text-xs font-medium text-orange-500 transition-colors hover:text-orange-600"
//           >
//             Reset all
//           </button>
//         )}
//       </div>

//       {/* Categories */}
//       <FilterSection title="Category">
//         <div className="space-y-2.5">
//           <RadioOption
//             name="category"
//             value="all"
//             checked={selectedCategory === "all"}
//             onChange={() => setSelectedCategory("all")}
//           >
//             All Products
//           </RadioOption>
//           {categories.map((cat) => (
//             <RadioOption
//               key={cat.id}
//               name="category"
//               value={cat.id}
//               checked={selectedCategory === cat.id}
//               onChange={() => setSelectedCategory(cat.id)}
//             >
//               {cat.name}
//             </RadioOption>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Price */}
//       <FilterSection title="Price Range">
//         <div className="space-y-2.5">
//           {PRICE_OPTIONS.map((opt) => (
//             <RadioOption
//               key={opt.value}
//               name="price"
//               value={opt.value}
//               checked={selectedPrice === opt.value}
//               onChange={() => setSelectedPrice(opt.value)}
//             >
//               {opt.label}
//             </RadioOption>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Rating */}
//       <FilterSection title="Customer Rating">
//         <div className="space-y-2.5">
//           <RadioOption
//             name="rating"
//             value="0"
//             checked={selectedRating === 0}
//             onChange={() => setSelectedRating(0)}
//           >
//             All Ratings
//           </RadioOption>
//           {RATING_OPTIONS.map((r) => (
//             <RadioOption
//               key={r}
//               name="rating"
//               value={r}
//               checked={selectedRating === r}
//               onChange={() => setSelectedRating(r)}
//             >
//               {r}★ & above
//             </RadioOption>
//           ))}
//         </div>
//       </FilterSection>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ── Top bar ─────────────────────────────────────────────────────────── */}
//       <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
//         <div className="flex items-center justify-between gap-4 px-4 py-3 mx-auto max-w-7xl sm:px-6">
//           <div>
//             <h1 className="text-base font-semibold text-gray-800">All Products</h1>
//             {!loading && (
//               <p className="text-xs text-gray-400 mt-0.5">
//                 {filteredProducts.length}{" "}
//                 {filteredProducts.length === 1 ? "product" : "products"}
//                 {hasActiveFilters && " · filtered"}
//               </p>
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Sort (desktop) */}
//             <div className="items-center hidden gap-2 sm:flex">
//               <span className="text-xs text-gray-500 whitespace-nowrap">Sort by</span>
//               <select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//               >
//                 {SORT_OPTIONS.map((o) => (
//                   <option key={o.value} value={o.value}>{o.label}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Mobile filter toggle */}
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
//             >
//               <SlidersHorizontal className="w-4 h-4" />
//               Filters
//               {hasActiveFilters && (
//                 <span className="w-2 h-2 rounded-full bg-orange-500 ml-0.5" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Mobile sidebar drawer ────────────────────────────────────────────── */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setSidebarOpen(false)}
//           />
//           <div className="absolute top-0 right-0 h-full overflow-y-auto shadow-xl w-80 bg-gray-50">
//             <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
//               <span className="font-semibold text-gray-800">Filters & Sort</span>
//               <button onClick={() => setSidebarOpen(false)}>
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>
//             <div className="p-4 space-y-4">
//               {/* Sort (mobile) */}
//               <div className="px-5 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
//                 <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase">Sort By</p>
//                 <div className="space-y-2.5">
//                   {SORT_OPTIONS.map((o) => (
//                     <RadioOption
//                       key={o.value}
//                       name="sort-mobile"
//                       value={o.value}
//                       checked={sortOption === o.value}
//                       onChange={() => setSortOption(o.value)}
//                     >
//                       {o.label}
//                     </RadioOption>
//                   ))}
//                 </div>
//               </div>
//               <SidebarContent />
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="w-full py-3 text-sm font-semibold text-white transition-colors bg-orange-500 hover:bg-orange-600 rounded-xl"
//               >
//                 Show {filteredProducts.length} products
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Main layout ──────────────────────────────────────────────────────── */}
//       <div className="flex items-start gap-6 px-4 py-6 mx-auto max-w-7xl sm:px-6">

//         {/* Desktop sidebar */}
//         <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-[61px]">
//           <SidebarContent />
//         </aside>

//         {/* Product grid */}
//         <div className="flex-1 min-w-0">

//           {/* Loading skeleton */}
//           {loading && (
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <div key={i} className="overflow-hidden bg-white border border-gray-100 rounded-2xl animate-pulse">
//                   <div className="bg-gray-100 h-44" />
//                   <div className="p-4 space-y-2">
//                     <div className="w-3/4 h-3 bg-gray-100 rounded" />
//                     <div className="w-1/2 h-3 bg-gray-100 rounded" />
//                     <div className="w-1/3 h-4 mt-3 bg-gray-100 rounded" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Error state */}
//           {!loading && error && (
//             <div className="flex flex-col items-center justify-center py-24 text-center">
//               <div className="mb-4 text-5xl">⚠️</div>
//               <h3 className="mb-1 text-base font-semibold text-gray-800">
//                 Failed to load products
//               </h3>
//               <p className="mb-5 text-sm text-gray-500">
//                 Something went wrong while fetching. Please try again.
//               </p>
//               <button
//                 onClick={fetchProducts}
//                 className="px-5 py-2 text-sm font-medium text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
//               >
//                 Retry
//               </button>
//             </div>
//           )}

//           {/* Empty filtered state */}
//           {!loading && !error && filteredProducts.length === 0 && (
//             <div className="flex flex-col items-center justify-center py-24 text-center">
//               <div className="mb-4 text-5xl">🔍</div>
//               <h3 className="mb-1 text-base font-semibold text-gray-800">
//                 No products match your filters
//               </h3>
//               <p className="mb-5 text-sm text-gray-500">
//                 Try adjusting or clearing your active filters.
//               </p>
//               <button
//                 onClick={resetFilters}
//                 className="px-5 py-2 text-sm font-medium text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}

//           {/* Products */}
//           {!loading && !error && filteredProducts.length > 0 && (
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredProducts.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllCategory;

import React, { useEffect, useState } from "react";

const Category = () => {
  const [categoryProducts, setCategoryProducts] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products by category
  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategoryProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category when the component mounts
  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="mb-4 text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (categoryProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  // Render the category page
  return (
    <div className="max-w-screen-xl px-3 py-4 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shop By Category</h1>
        <p className="mt-1 text-gray-500">
          {categoryProducts.length} categor{categoryProducts.length === 1 ? "y" : "ies"} available
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categoryProducts.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Category;
