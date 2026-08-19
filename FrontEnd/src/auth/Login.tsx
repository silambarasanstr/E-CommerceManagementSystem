import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../component/ui/input";
import Button from "../component/ui/button";
import { loginUser } from "../services/authService";
import { loginSuccess } from "../store/slices/authSlice";

type LoginFormType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fillCredentials = (email: string, password: string) => {
    setFormData({
      email,
      password,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // Store authentication data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Prepare user data for Redux
      const user = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      };

      // Update Redux state
      dispatch(loginSuccess(user));

      toast.success("Login successful!");

      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);

      toast.error(
        error?.response?.data?.message || "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d61fd] px-4 py-8">
      <div className="w-full max-w-sm p-5 bg-white border border-gray-200 shadow-lg rounded-xl">
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            Ecommerce Management System
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Login to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            autoComplete="username"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <Button
            type="submit"
            disabled={
              loading ||
              !formData.email ||
              !formData.password
            }
            className="flex w-full items-center justify-center bg-[#0d61fd] px-2 py-2 text-white"
          >
            {loading && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}

            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#0d61fd] hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>

        {/* Quick Login */}
        <div className="pt-4 mt-5 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Quick Login
            </p>

            <span className="text-[11px] text-gray-400">
              Click to autofill
            </span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() =>
                fillCredentials(
                  "admin@example.com",
                  "Admin@123",
                )
              }
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-2.5 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">
                  👨‍💼 Admin
                </p>

                <p className="text-[11px] text-gray-500">
                  admin@example.com
                </p>
              </div>

              <span className="rounded bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
                USE
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;