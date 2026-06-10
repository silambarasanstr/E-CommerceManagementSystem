import NavBarItems from "./NavBarItems";
import Surf from "../../assets/micon1.webp";
import Mobi from "../../assets/micon2.webp";
import fash from "../../assets/micon3.webp";
import Elct from "../../assets/micon4.webp";
import Chair from "../../assets/micon5.webp";
import HomeApp from "../../assets/micon6.webp";
import Booking from "../../assets/micon7.webp";
import Bike from "../../assets/micon8.webp";

const navItems = [
  { id: "mobile", label: "Mobile", href: "/category/mobiles", img: Mobi },
  { id: "home-appliances-1", label: "Home Appliances", href: "/category/appliances", img: HomeApp },
  { id: "category", label: "Category", href: "/category", img: fash },
  { id: "product", label: "Product", href: "/product", img: fash },
  { id: "surfing", label: "Surfing", href: "/", img: Surf },
  { id: "chairs", label: "Chairs", href: "/", img: Chair },
  { id: "home-appliances-2", label: "Home Appliances", href: "/", img: Elct },
  { id: "booking", label: "Booking", href: "/", img: Booking },
  { id: "bike-accessories", label: "Bike Accessories", href: "/", img: Bike },
];

const NavBar = () => {
  return <NavBarItems items={navItems} />;
};

export default NavBar;
