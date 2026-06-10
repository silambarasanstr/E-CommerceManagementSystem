import React, { useState } from "react";
import { AxiosError } from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Label from "../component/ui/label";
import Input from "../component/ui/input";
import Button from "../component/ui/button";
import { Mail, Lock, Loader2 } from "lucide-react";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

type LoginFormType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      toast.success("Login successfully!", {
        duration: 9000,
      });
      navigate(from, { replace: true }); // redirect to attempted page
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[#0d61fd] flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-5 border border-[#e5e7eb] shadow">
          <div className="flex flex-col items-center justify-center p-6">
            <div className="text-2xl font-semibold">Sign In</div>
            <div className="text-[#847062] mt-3">
              Enter your credentials to access your account
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" text="Email Address" />
              <div className="relative">
                <Mail className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="pl-10"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" text="Password" />
              <div className="relative">
                <Lock className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-white bg-[#0d61fd] px-2 py-2 flex justify-center items-center"
              disabled={loading || !formData.email || !formData.password} // 👈 extra check
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium transition-colors text-primary hover:text-primary/80"
              >
                Create one here
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-[#f2ebe3] rounded-lg">
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
    </div>
  );
};

export default Login;
