//const API_URL = "https://e-commercemanagementsystem.onrender.com/api/products";
const API_URL = "http://localhost:4000/api/products";

export type ProductPayloadType = {
  _id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  image?: File & string; // optional image file
};

export const searchProducts = async (params: {
  name?: string;
  category?: string;
}) => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const res = await fetch(`${API_URL}/search?${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<ProductPayloadType[]>;
};

export const categories = [
  { id: "mobiles", name: "Mobiles" },
  { id: "appliances", name: "Home Appliances" },
];

// Get all products
export const getProduct = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// Create product using FormData to handle image upload
export const createProduct = async (product: ProductPayloadType) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price.toString());
  if (product.originalPrice !== undefined)
    formData.append("originalPrice", product.originalPrice.toString());
  if (product.category) formData.append("category", product.category);
  if (product.description) formData.append("description", product.description);
  if (product.rating !== undefined)
    formData.append("rating", product.rating.toString());
  if (product.reviews !== undefined)
    formData.append("reviews", product.reviews.toString());
  if (product.inStock !== undefined)
    formData.append("inStock", product.inStock.toString());
  if (product.image) formData.append("image", product.image);

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData, // multipart/form-data
  });

  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
};

// Delete a product
export const deleteProduct = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};

// Update product using FormData to handle image upload
export const updateProduct = async (
  _id: string,
  product: ProductPayloadType
) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price.toString());
  if (product.originalPrice !== undefined)
    formData.append("originalPrice", product.originalPrice.toString());
  if (product.category) formData.append("category", product.category);
  if (product.description) formData.append("description", product.description);
  if (product.rating !== undefined)
    formData.append("rating", product.rating.toString());
  if (product.reviews !== undefined)
    formData.append("reviews", product.reviews.toString());
  if (product.inStock !== undefined)
    formData.append("inStock", product.inStock.toString());
  if (product.image) formData.append("image", product.image);

  const res = await fetch(`${API_URL}/${_id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

// Get single product by ID
export const getSingleProduct = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

// Get all products (duplicate function removed, same as getProduct)
export const getAllProducts = getProduct;
