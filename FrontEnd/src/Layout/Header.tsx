import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../component/ui/search";
import { ShoppingCart, Heart, Menu, User } from "lucide-react";
import { useAppSelector } from "../store/hooks";

import { useCallback, useState } from "react";
import NavBar from "../component/menu/NavBar";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount } = useAppSelector((state) => state.cart);
  const { itemCount: wishlistItemCount } = useAppSelector(
    (state) => state.wishlist
  );
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
      }
    },
    [searchQuery, navigate]
  );

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login"); // redirect to login
  };

  return (
    <header className="sticky top-0 z-50 bg-white ">
      <div className="container mx-auto px-7 py-5 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-foreground">
          Flip<span className="text-[#3e3e3e]">Kart</span>
        </Link>

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:block w-full max-w-2xl"
        >
          <SearchInput
            placeholder="Search for Products, Brands and More..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Right-side actions */}
        <div className="ml-auto flex items-center gap-5">
          {isAuthenticated ? (
            <div className="font-semibold flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm">Hello, {user?.name}</span>
            </div>
          ) : (
            <Link to="/login" className="font-semibold flex items-center gap-2">
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}

          <Link to="/wishlist" className="relative">
            <Heart className="w-5 h-5" />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {wishlistItemCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="font-semibold flex items-center gap-2 relative"
          >
            <ShoppingCart size="20" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="font-semibold cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>

          <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : <Menu className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-64 bg-white h-full shadow-md"
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
