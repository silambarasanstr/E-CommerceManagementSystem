import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Label from "../component/ui/label";
import Input from "../component/ui/input";
import Button from "../component/ui/button";
import { loginUser } from "../services/authService";

type LoginFormType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      navigate(from, { replace: true }); // redirect to attempted page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center ">
      {/* Login Form */}
      <div className="w-full max-w-md bg-white p-5 border border-[#e5e7eb] shadow rounded">
        <div className="flex flex-col items-center justify-center p-6">
          <div className="text-2xl font-semibold">Sign In Admin</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" text="Email Address" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password" text="Password" />
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full px-2 py-2 text-white">
            Sign In
          </Button>
        </form>

        <div className="mt-6 p-4 bg-[#f5f6fa] rounded-lg">
          <p className="mb-2 text-sm font-medium text-foreground">
            Demo Credentials:
          </p>
          <p className="text-xs text-muted-foreground">
            Email: admin@example.com
            <br />
            Password: 12345
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
