import React, { useState } from "react";
import { Link } from "react-router-dom";

const productos = [
  { id: 1, nombre: "Collar de plata", stock: 10, precio: 150 },
  { id: 2, nombre: "Anillo de oro", stock: 5, precio: 300 },
  { id: 3, nombre: "Pulsera de madera", stock: 20, precio: 50 },
];

export default function AdminProductos() {
  const [productosList, setProductosList] = useState(productos);

  const handleDelete = (id) => {
    setProductosList(productosList.filter((producto) => producto.id !== id));
  };

  return (
    <div className="admin-container">
      <h2 className="text-xl font-semibold mb-4">Productos</h2>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosList.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.stock}</td>
              <td>${producto.precio}</td>
              <td>
                <button className="btn-edit">Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(producto.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/productos/agregar" className="btn-admin">
        Agregar Producto
      </Link>
    </div>
  );
}
