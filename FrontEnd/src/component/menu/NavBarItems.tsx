import { NavLink, useLocation, useNavigate } from "react-router-dom";
import type { CategoryType } from "../../types/category";
import Select from "../ui/Select";

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

  const handleCategoryChange = (value: string) => {
    if (value) navigate(`/category/${value}`);
  };

  return (
    <div className="w-full bg-white">
      {hideHeaderFooter ? (
        <div className="items-center hidden mx-auto md:flex max-w-7xl">
          {/* 🔹 Top bar (dropdown) */}
          <div className="gap-4 py-3 ">
            <Select
              options={categories.map((cat) => ({
                label: cat.name,
                value: cat.name,
              }))}
              onChange={handleCategoryChange}
              placeholder="Select Category"
            />
          </div>

          {/* 🔹 Menu items */}
          <div className="flex items-center justify-between w-full gap-6 px-6 py-2 scrollbar-hide">
            {items.map((item) => (
              <NavLink key={item.id} to={item.href}>
                <img
                  src={item.img}
                  alt={item.label}
                  className="object-contain w-14 h-14"
                />
                <span className="mt-1 text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 py-3 bg-gray-800 shadow ">
          <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
            {items.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className="text-sm font-medium text-white transition hover:text-yellow-300"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarItems;
