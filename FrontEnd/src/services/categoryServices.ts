import { api } from "./api";
import type { CategoryType } from "../types/category";

export const getCategories = async () => {
  const response = await api<{ data: CategoryType[] }>("/categories");
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await api<CategoryType>(`/categories/${id}`);
  return response;
};

export const createCategory = (
  category: Omit<CategoryType, "_id" | "createdAt" | "updatedAt">,
) => {
  return api<CategoryType>("/categories", {
    method: "POST",
    body: JSON.stringify(category),
  });
};

export const updateCategory = (id: string, category: Partial<CategoryType>) => {
  return api<CategoryType>(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });
};

export const deleteCategory = (id: string) => {
  return api<{ message: string }>(`/categories/${id}`, {
    method: "DELETE",
  });
};
