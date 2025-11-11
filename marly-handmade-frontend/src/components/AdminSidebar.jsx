import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  Users,
  Archive,
  ShoppingBag,
  FileText,
  PieChart,
  User,
  Menu,
  X,
  Book
} from "lucide-react";

function AdminSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: Home },
    { to: "/admin/products", label: "Products Register", icon: Package },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/inventory", label: "Inventory", icon: Archive },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
//    { to: "/admin/content", label: "Content Management", icon: FileText },
//    { to: "/admin/reports", label: "Reports / Analytics", icon: PieChart },
    { to: "/admin/complaints", label: "Complaints Book", icon: Book },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Botón hamburguesa para móvil - fixed para que siempre esté visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-9 left-4 z-50 bg-white border border-gray-300 p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Fixed en móvil, Static en desktop */}
      <aside
          className={`
            bg-white border-r border-gray-200 flex-shrink-0
            fixed left-0 z-40 w-[230px] lg:w-[230px]
            top-[200px] bottom-[200px]
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:static lg:block
            flex flex-col
          `}
        >
        {/* Navegación principal */}
        <nav className="flex-1 overflow-y-auto py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-6 py-3 text-sm font-medium
                  transition-all duration-200
                  ${active
                    // Se mantiene el fondo blanco para el activo como pediste anteriormente
                    ? "bg-white text-gray-900 border-l-4 border-gray-900"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon size={20} className={active ? "text-gray-900" : "text-gray-600"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Perfil en la parte inferior */}
        {/* <div className="border-t border-gray-200">
          <Link
            to="/admin/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <User size={20} className="text-gray-600" />
            <span>Profile</span>
          </Link>
        </div> */}
      </aside>

    </>
  );
}

export default AdminSidebar;