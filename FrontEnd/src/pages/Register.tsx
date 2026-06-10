import { useState } from "react";
import Label from "../component/ui/label";
import { Mail, User, Lock, EyeOff, Eye } from "lucide-react";
import Input from "../component/ui/input";
import Button from "../component/ui/button";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      setFormData(data);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0d61fd]  flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md border border-gray-200 p-6 pt-0 bg-white">
        <div className="p-6">
          <div className="text-center">
            <div className="text-2xl font-semibold">Create Account</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" text="Name" />

            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter Your Name"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" text="Email Address" />
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter Your Email"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" text="Password" />
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create a strong password"
                className="pl-10 pr-10"
              />
              <Button
                type="button"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0d61fd] text-white px-2 py-2"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
