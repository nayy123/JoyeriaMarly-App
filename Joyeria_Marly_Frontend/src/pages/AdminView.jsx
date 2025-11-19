import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminView.css"; // Asegúrate de que los estilos se carguen correctamente

export default function AdminView() {
  const navigate = useNavigate();

  // Función para manejar el logout
  const handleLogout = () => {
    // Redirige a la página principal o a login
    navigate("/");
  };

  return (
    <div className="admin-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-buttons">
        <Link to="/admin/productos" className="btn-admin btn-products">
          Productos
        </Link>
        <Link to="/admin/clientes" className="btn-admin btn-customers">
          Clientes
        </Link>
        <Link to="/admin/boletas" className="btn-admin btn-invoices">
          Ventas por Boleta
        </Link>
        <Link to="/admin/facturas" className="btn-admin btn-reports">
          Ventas por Factura
        </Link>
      </div>

      {/* Botón para salir de la vista de administrador */}
      <div className="logout-container">
        <button onClick={handleLogout} className="btn-logout">
          Salir de la Vista Administrador
        </button>
      </div>
    </div>
  );
}
