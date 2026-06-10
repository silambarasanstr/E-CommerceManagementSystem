import { api } from "./api";
import type { ProductType } from "../types/product";

export const getProducts = async (): Promise<ProductType[]> => {
  const response = await api<{ data: ProductType[] }>("/products");
  return response.data;
};

export const getProductById = async (id: string): Promise<ProductType> => {
  return api<ProductType>(`/products/${id}`);
};

export const createProduct = async (
  product: Omit<ProductType, "_id" | "createdAt" | "updatedAt">,
): Promise<ProductType> => {
  return api<ProductType>("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (
  id: string,
  product: Partial<ProductType>,
): Promise<ProductType> => {
  return api<ProductType>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (
  id: string,
): Promise<{ message: string }> => {
  return api<{ message: string }>(`/products/${id}`, {
    method: "DELETE",
  });
};
