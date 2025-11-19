import React, { useState } from "react";

const ventasBoletas = [
  { id: 1, cliente: "Juan Pérez", monto: 150, fecha: "2025-11-20" },
  { id: 2, cliente: "Ana García", monto: 300, fecha: "2025-11-19" },
];

export default function VentasPorBoleta() {
  const [ventas, setVentas] = useState(ventasBoletas);

  const handleDelete = (id) => {
    setVentas(ventas.filter((venta) => venta.id !== id));
  };

  return (
    <div className="admin-container">
      <h2 className="text-xl font-semibold mb-4">Ventas por Boleta</h2>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.cliente}</td>
              <td>${venta.monto}</td>
              <td>{venta.fecha}</td>
              <td>
                <button className="btn-edit">Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(venta.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-admin">Registrar Venta</button>
    </div>
  );
}
