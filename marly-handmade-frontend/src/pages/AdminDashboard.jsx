import { Link, Outlet, useLocation } from "react-router-dom";
import { Package, ShoppingBag, Users, BarChart, FileSpreadsheet } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { API_BASE_URL } from "../contexts/DashboardContext";

import { AuthContext } from "../contexts/AuthContext"; // Importamos el AuthContext
import { PedidoContext } from "../contexts/PedidoContext";
import { ProductoContext } from "../contexts/ProductoContext";
import { AdminContext } from "../contexts/AdminContext";

export default function AdminDashboard() {
  const { token } = useContext(AuthContext); // Usamos useContext para obtener el token
  const { reportes, listarPedidoPorestado, pedidos } =
    useContext(PedidoContext);
  const { productos } = useContext(ProductoContext);
  const { users, fetchUsers } = useContext(AdminContext);

  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    totalUsers: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

useEffect(() => {
  const fetchStats = async () => {
    if (!token || !token.token) {
      console.warn("Token no disponible. No se cargarán las estadísticas.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  fetchStats();
  listarPedidoPorestado(false);
  fetchUsers();
}, [token]);


  const adminCards = [
    {
      title: "Products",
      description: "Manage your product catalog",
      icon: Package,
      link: "/admin/products",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Orders",
      description: "View and manage orders",
      icon: ShoppingBag,
      link: "/admin/orders",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Users",
      description: "Manage user accounts",
      icon: Users,
      link: "/admin/users",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Analytics",
      description: "View sales and statistics",
      icon: BarChart,
      link: "/admin/analytics",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      

      <div
        className={`flex min-h-[calc(100vh-8rem)] bg-gray-50 transition-all duration-300
          ${sidebarOpen ? "lg:ml-[230px]" : "lg:ml-0"}`}
      >
        

        <main
          className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 lg:p-12"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <div className='max-w-7xl mx-auto'>
            {location.pathname === "/admin/dashboard" ||
            location.pathname === "/admin" ? (
              <>

                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      Admin Dashboard
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      Manage your Marly Handmade store
                    </p>
                  </div>

                  {/* 🔹 Botón Exportar Excel */}
                  <button
                    onClick={reportes}
                    className="mt-4 sm:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                  >
                    <FileSpreadsheet className="w-5 h-5" />
                    Exportar Excel
                  </button>
                </div>

                {/* Tarjetas principales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                  {adminCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <Link
                        key={card.title}
                        to={card.link}
                        className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group'
                      >
                        <div
                          className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className='w-6 h-6' />
                        </div>
                        <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>
                          {card.title}
                        </h3>
                        <p className='text-xs sm:text-sm text-gray-600'>
                          {card.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-gray-500 text-sm font-medium mb-2">

                      Total Products
                    </h4>
                    <p className='text-3xl font-bold text-gray-900'>
                      {productos.length}
                    </p>
                  </div>
                  <div className='bg-white rounded-lg shadow-sm p-6'>
                    <h4 className='text-gray-500 text-sm font-medium mb-2'>
                      Pending Orders
                    </h4>
                    <p className='text-3xl font-bold text-gray-900'>
                      {pedidos.length}
                    </p>
                  </div>
                  <div className='bg-white rounded-lg shadow-sm p-6'>
                    <h4 className='text-gray-500 text-sm font-medium mb-2'>
                      Total Users
                    </h4>
                    <p className='text-3xl font-bold text-gray-900'>
                      {users.length}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
