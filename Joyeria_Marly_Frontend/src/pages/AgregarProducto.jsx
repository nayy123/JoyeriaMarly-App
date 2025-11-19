import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí agregar lógica para agregar un nuevo producto
    console.log("Producto agregado:", { nombre, stock, precio });
    navigate("/admin/productos");
  };

  return (
    <div className="admin-container">
      <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="mb-2 p-2 w-full"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="mb-4 p-2 w-full"
        />
        <button type="submit" className="btn-admin">
          Agregar Producto
        </button>
      </form>
    </div>
  );
}
