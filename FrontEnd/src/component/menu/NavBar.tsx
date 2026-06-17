import NavBarItems from "./NavBarItems";
import Surf from "../../assets/micon1.webp";
import Mobi from "../../assets/micon2.webp";
import fash from "../../assets/micon3.webp";
import Elct from "../../assets/micon4.webp";
import Chair from "../../assets/micon5.webp";
import HomeApp from "../../assets/micon6.webp";
import Books from "../../assets/micon8.webp";

const navItems = [
  { id: "mobile", label: "Mobiles", href: "/category/mobiles", img: Mobi },
  {
    id: "electronics",
    label: "Electronics",
    href: "/category/electronics",
    img: HomeApp,
  },
  {
    id: "home-appliances-1",
    label: "Clothing",
    href: "/category/appliances",
    img: fash,
  },
  { id: "category", label: "All Category", href: "/category", img: fash },
  { id: "product", label: "Products", href: "/product", img: Elct },
  { id: "surfing", label: "Books", href: "/", img: Books },
  { id: "chairs", label: "Home & Kitchen", href: "/", img: Chair },
  { id: "home-appliances-2", label: "Home Appliances", href: "/", img: Elct },
];

const NavBar = () => {
  return <NavBarItems items={navItems} />;
};

export default NavBar;
