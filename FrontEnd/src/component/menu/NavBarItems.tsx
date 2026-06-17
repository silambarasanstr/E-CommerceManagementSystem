import { Link, useLocation } from "react-router-dom";

type NavBarItem = {
  id: string;
  label: string;
  href: string;
  img?: any;
};

type NavBarItemsProps = {
  items: NavBarItem[];
};

const NavBarItems = ({ items }: NavBarItemsProps) => {
  const location = useLocation();

  const hiderHeaderFooter = ["/"].includes(location.pathname);

  return (
    <div>
      {hiderHeaderFooter ? (
        <div className="hidden px-3 pt-3 md:block">
          <div className="flex p-2 text-center bg-white justify-evenly">
            {items.map((item) => (
              <div key={item.id}>
                <Link className="bg-white " to={item.href}>
                  <img src={item.img} alt={item.label}  />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-between text-center px-15 py-3 shadow bg-[#3e3e3e]">
          {items.map((item) => (
            <div key={item.id}>
              <Link className="text-white" to={item.href}>
                <span className="font-semibold">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBarItems;
