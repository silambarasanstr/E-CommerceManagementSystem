import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../component/Sidebar/SideBar";
import Header from "./Header";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const appTitle = "Mobile Product Management System";

  return (
    <div className="flex min-h-screen bg-[#f5f6fa]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-800">
            {appTitle}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <h1 className="text-lg font-bold text-gray-800 truncate">
            {appTitle}
          </h1>

          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-2xl text-gray-700"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="h-full w-64 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-lg font-bold text-gray-800">
                  {appTitle}
                </h1>
              </div>

              <Sidebar onClick={() => setIsOpen(false)} />
            </div>
          </div>
        )}

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;