// import { useMemo, useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getProducts } from "../services/productService";
// import type { ProductType } from "../data/products";
// import ProductCategoryCard from "../component/ProductCategoryCard";
// import { ArrowLeft, LayoutGrid } from "lucide-react";

// // ─── Loading skeleton ─────────────────────────────────────────────────────────

// const CategorySkeleton = () => (
//   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//     {Array.from({ length: 6 }).map((_, i) => (
//       <div
//         key={i}
//         className="overflow-hidden bg-white border border-gray-100 rounded-2xl animate-pulse"
//       >
//         <div className="bg-gray-100 h-52" />
//         <div className="p-4 space-y-2.5">
//           <div className="w-3/4 h-3 bg-gray-100 rounded" />
//           <div className="w-1/2 h-3 bg-gray-100 rounded" />
//           <div className="w-1/3 h-4 mt-3 bg-gray-100 rounded" />
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // ─── Main component ───────────────────────────────────────────────────────────

// const Category: React.FC = () => {
//   const { name } = useParams<{ name?: string }>();
//   const navigate = useNavigate();
//   const categoryName = name ?? "";

//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const data = await getProduct();
//       setProducts(data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // const categoryProducts = useMemo(() => {
//   //   if (!categoryName) return products;
//   //   return products.filter((p) => p.category === categoryName);
//   // }, [categoryName, products]);

//   return (
//     // <div className="min-h-screen bg-gray-50">

//     //   {/* ── Top bar ──────────────────────────────────────────────────────────── */}
//     //   <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
//     //     <div className="flex items-center justify-between max-w-5xl px-4 py-3 mx-auto sm:px-6">
//     //       <button
//     //         onClick={() => navigate(-1)}
//     //         className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
//     //       >
//     //         <ArrowLeft className="w-4 h-4" />
//     //         Back
//     //       </button>

//     //       <span className="text-sm font-semibold text-gray-700 capitalize">
//     //         {categoryName || "All Products"}
//     //       </span>

//     //       {/* Right slot: count when loaded, empty spacer otherwise to keep title centered */}
//     //       <span className="text-sm text-gray-400 min-w-[60px] text-right">
//     //         {!loading && !error
//     //           ? `${categoryProducts.length} ${categoryProducts.length === 1 ? "item" : "items"}`
//     //           : ""}
//     //       </span>
//     //     </div>
//     //   </div>

//     //   {/* ── Page header ──────────────────────────────────────────────────────── */}
//     //   {!loading && !error && categoryProducts.length > 0 && (
//     //     <div className="max-w-5xl px-4 pb-2 mx-auto pt-7 sm:px-6">
//     //       <h1 className="text-xl font-bold text-gray-900 capitalize">
//     //         {categoryName || "All Products"}
//     //       </h1>
//     //       <p className="mt-1 text-sm text-gray-400">
//     //         Showing {categoryProducts.length}{" "}
//     //         {categoryProducts.length === 1 ? "product" : "products"}
//     //         {categoryName ? ` in "${categoryName}"` : ""}
//     //       </p>
//     //     </div>
//     //   )}

//     //   {/* ── Content ──────────────────────────────────────────────────────────── */}
//     //   <div className="max-w-5xl px-4 py-6 mx-auto sm:px-6">

//     //     {/* Loading */}
//     //     {loading && <CategorySkeleton />}

//     //     {/* Error */}
//     //     {!loading && error && (
//     //       <div className="flex flex-col items-center justify-center py-24 text-center">
//     //         <div className="mb-4 text-5xl">⚠️</div>
//     //         <h3 className="mb-1 text-base font-semibold text-gray-800">
//     //           Failed to load products
//     //         </h3>
//     //         <p className="mb-5 text-sm text-gray-500">
//     //           Something went wrong. Please try again.
//     //         </p>
//     //         <button
//     //           onClick={fetchProducts}
//     //           className="px-5 py-2 text-sm font-medium text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
//     //         >
//     //           Retry
//     //         </button>
//     //       </div>
//     //     )}

//     //     {/* Empty */}
//     //     {!loading && !error && categoryProducts.length === 0 && (
//     //       <div className="flex flex-col items-center justify-center py-24 text-center">
//     //         <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
//     //           <LayoutGrid className="text-gray-400 w-7 h-7" />
//     //         </div>
//     //         <h3 className="mb-1 text-base font-semibold text-gray-800">
//     //           No products found
//     //         </h3>
//     //         <p className="mb-5 text-sm text-gray-500">
//     //           There are no products in{" "}
//     //           <span className="font-medium capitalize">
//     //             {categoryName || "this category"}
//     //           </span>{" "}
//     //           yet.
//     //         </p>
//     //         <button
//     //           onClick={() => navigate("/")}
//     //           className="px-5 py-2 text-sm font-medium text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
//     //         >
//     //           Browse all products
//     //         </button>
//     //       </div>
//     //     )}

//     //     {/* Products grid */}
//     //     {!loading && !error && categoryProducts.length > 0 && (
//     //       <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1">
//     //         {categoryProducts.map((p) => (
//     //           <ProductCategoryCard key={p._id} product={p} />
//     //         ))}
//     //       </div>
//     //     )}

//     //   </div>
//     // </div>

//     <div></div>
//   );
// };

// export default Category;