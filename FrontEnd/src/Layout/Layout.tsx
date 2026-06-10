import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "../component/menu/NavBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <NavBar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto w-full ">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
