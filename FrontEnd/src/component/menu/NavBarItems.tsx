import { Link, useLocation, useNavigate } from "react-router-dom";
import type { CategoryType } from "../../types/category";

type NavBarItem = {
  id: string;
  label: string;
  href: string;
  img?: any;
};

type NavBarItemsProps = {
  items: NavBarItem[];
  categories: CategoryType[];
};

const NavBarItems = ({ items, categories }: NavBarItemsProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideHeaderFooter = location.pathname === "/";

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) navigate(`/category/${value}`);
  };

  return (
    <div className="w-full bg-white">
      {hideHeaderFooter ? (
        <div className="items-center hidden mx-auto md:flex max-w-7xl">
          {/* 🔹 Top bar (dropdown) */}
          <div className="gap-4 py-3 ">
            <select
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none "
              onChange={handleCategoryChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 🔹 Menu items */}
          <div className="flex items-center justify-between w-full gap-6 px-6 py-2 overflow-x-auto">
            {items.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="flex flex-col items-center min-w-[90px] hover:scale-105 transition"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="object-contain w-14 h-14"
                />
                <span className="mt-1 text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 py-3 bg-gray-800 shadow ">
          <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="text-sm font-medium text-white transition hover:text-yellow-300"
            >
              {item.label}
            </Link>
          ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default NavBarItems;
