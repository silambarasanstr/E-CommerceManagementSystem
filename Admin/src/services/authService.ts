//const API_URL = "https://e-commercemanagementsystem.onrender.com/api/login";
const API_URL = "http://localhost:4000/api/login";

type LoginFormType = {
  name?: string;
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginFormType) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to login");
  }

  return data;
};
