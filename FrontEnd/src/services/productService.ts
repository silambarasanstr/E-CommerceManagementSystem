import { api } from "./api";
import type { ProductType } from "../types/product";

// type GetAllProductsParams = {
//   search?: string;
//   category?: string;
//   brand?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   sort?: string;
//   page?: number;
//   limit?: number;
// };

type ProductFilters = {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
};

export const getProducts = async () => {
  const response = await api<{ data: ProductType[] }>("/products");
  return response.data;
};

// export const getAllProductsParams = async (
//   params: GetAllProductsParams = {},
// ) => {
//   const query = new URLSearchParams();

//   Object.entries(params).forEach(([key, value]) => {
//     if (value !== undefined && value !== null && value !== "") {
//       query.append(key, String(value));
//     }
//   });

//   const response = await api<{ data: ProductType[] }>(
//     `/products/all?${query.toString()}`,
//   );

//   return response.data;
// };

export const getAllProducts = async ({
  search = "",
  category = "",
  brand = "",
  minPrice,
  maxPrice,
  sort = "",
  page = 1,
  limit = 12,
}: ProductFilters = {}) => {
  const response = await api<{ data: ProductType[] }>(
    `/products/all?search=${search}&category=${category}&brand=${brand}&minPrice=${minPrice ?? ""}&maxPrice=${maxPrice ?? ""}&sort=${sort}&page=${page}&limit=${limit}`,
  );

  return response.data;
};

export const getProductById = async (id: string) => {
  return api<ProductType>(`/products/all/${id}`);
};

export const createProduct = async (
  product: Omit<ProductType, "_id" | "createdAt" | "updatedAt">,
) => {
  return api<ProductType>("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (
  id: string,
  product: Partial<ProductType>,
) => {
  return api<ProductType>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id: string) => {
  return api<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
};
