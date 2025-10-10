import type { ProductType } from "../data/products";

const API_URL = "https://e-commercemanagementsystem.onrender.com/api/products";
//const API_URL = "http://localhost:4000/api/products";

// Get all products
export const getProduct = async (): Promise<ProductType[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// Create a new product
export const createProduct = async (
  product: Omit<ProductType, "_id">
): Promise<ProductType> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
};

// Delete a product by ID
export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};

// Update a product by ID
export const updateProduct = async (
  id: string,
  product: Omit<ProductType, "_id">
): Promise<ProductType> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

// Get single product by ID
export const getSingleProduct = async (id: string): Promise<ProductType> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

// Get all products (duplicate helper if needed)
export const getAllProducts = async (): Promise<ProductType[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
