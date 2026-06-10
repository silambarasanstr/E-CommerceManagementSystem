const BASE_URL = import.meta.env.VITE_API_URL;

export const api = async <T>(
  endpoint: string,
  options?: RequestInit
) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json() as T;
};