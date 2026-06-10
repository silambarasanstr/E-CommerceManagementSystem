// Sidebar.tsx
import SideBarItem from "./SideBarItem";

const SideItems = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Orders", href: "/orders" },
  { label: "Inventory", href: "/inventory" },
  { label: "Customers", href: "/customers" },
  { label: "Analytics", href: "/analytics" },
  
];

type SidebarProps = {
  onClick?: () => void;
};

const Sidebar = ({ onClick }: SidebarProps) => {
  return (
    <div>
      <SideBarItem items={SideItems} onClick={onClick} />
    </div>
  );
};

export default Sidebar;
