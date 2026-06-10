type LoginFormType = {
  name?: string;
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginFormType) => {
  const res = await fetch("http://localhost:4000/api/login", {
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

export const registerUser = async ({
  name,
  email,
  password,
}: LoginFormType) => {
  const res = await fetch("http://localhost:4000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to register");
  }

  return data;
};
