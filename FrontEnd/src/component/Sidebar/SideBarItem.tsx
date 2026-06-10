import { Link, useLocation } from "react-router-dom";

type SideBarItemType = {
  label: string;
  href: string;
};

type SideBarItemProps = {
  items: SideBarItemType[];
  onClick?: () => void;
};

const SideBarItem: React.FC<SideBarItemProps> = ({ items, onClick }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col space-y-2 p-4">
      <div className="">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={onClick}
              className={`block px-4 py-2 rounded font-medium transition ${
                isActive ? "bg-[#0000000a] " : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarItem;
