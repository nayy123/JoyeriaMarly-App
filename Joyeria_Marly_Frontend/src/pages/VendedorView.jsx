import React from "react";
import { Link } from "react-router-dom";

export default function VendedorView() {
  return (
    <div className="admin-container">
      <h1 className="text-2xl font-semibold mb-8">Vista del Vendedor</h1>
      <Link to="/vendedor/ventas" className="btn-admin">
        Ver Ventas del Día
      </Link>
      <Link to="/vendedor/registro-venta" className="btn-admin">
        Registrar Venta
      </Link>
    </div>
  );
}
