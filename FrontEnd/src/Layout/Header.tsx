import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Menu, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { useState } from "react";
import NavBar from "../component/menu/NavBar";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const itemCount = useAppSelector((state) => state.cart.itemCount);
  const wishlistItemCount = useAppSelector((state) => state.wishlist.itemCount);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout());

    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container flex items-center gap-4 py-5 mx-auto bg-white max-w-7xl">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-foreground">
          Tech<span className="text-[#3e3e3e]">Store</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5 ml-auto">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 font-semibold">
                <User className="w-5 h-5" />
                <span className="text-sm">Hello, {user?.name ?? "User"}</span>
              </div>

              <button
                onClick={handleLogout}
                className="font-semibold text-red-600 cursor-pointer hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-2 font-semibold">
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <Heart className="w-5 h-5" />

            {wishlistItemCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                {wishlistItemCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCart className="w-5 h-5" />

            {itemCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? "✖" : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-64 h-full bg-white shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <NavBar />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
