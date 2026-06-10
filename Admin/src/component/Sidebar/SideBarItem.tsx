import { Link, useLocation } from "react-router-dom";

type SideBarItemType = {
  label: string;
  href: string;
};

type SideBarItemProps = {
  items: SideBarItemType[];
  onClick?: () => void;
};

const SideBarItem: React.FC<SideBarItemProps> = ({
  items,
  onClick,
}) => {
  const location = useLocation();

  return (
    <div className="flex flex-col p-4 space-y-2">
      {items.map((item) => {
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClick}
            className={`block px-4 py-2 rounded font-medium transition-colors duration-200 ${
              isActive
                ? "bg-gray-100 text-black"
                : "text-gray-800 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SideBarItem;