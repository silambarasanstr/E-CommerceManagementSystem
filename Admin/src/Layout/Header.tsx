import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../component/ui/button";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-end gap-3 px-10 py-5">
      {token ? (
        <Button
          onClick={handleLogout}
          className="font-semibold cursor-pointer"
        >
          Logout
        </Button>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 font-semibold"
        >
          <User className="w-4 h-4" />
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;