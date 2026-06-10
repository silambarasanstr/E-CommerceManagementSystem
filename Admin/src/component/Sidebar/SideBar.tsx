import SideBarItem from "./SideBarItem";

const sideItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Products", href: "/products" },
];

type SidebarProps = {
  onClick?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onClick }) => {
  return (
    <div>
      <SideBarItem items={sideItems} onClick={onClick} />
    </div>
  );
};

export default Sidebar;