// UserManagement.jsx
import React, { useState } from "react";
import { useAdmin } from "../contexts/AdminContext.jsx";

function UserManagement() {
  const { users, loading, error } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getPurchaseHistory = () => [
    { code: "PUR001", date: "2024-05-15", product: "Golden Sun Necklace", category: "Jewelry", price: 850.0, method: "Credit Card", status: "Completed" },
    { code: "PUR002", date: "2024-04-22", product: "Silver Moon Ring", category: "Jewelry", price: 320.0, method: "PayPal", status: "Completed" },
    { code: "PUR003", date: "2024-03-18", product: "Emerald Earrings", category: "Jewelry", price: 1200.0, method: "Debit Card", status: "Completed" },
  ];

  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Cargando usuarios...</div>;
  if (error) return <div style={{ padding: "40px" }}>Error: {error}</div>;

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>


      <main style={{ flex: 1, padding: "40px", backgroundColor: "#f5f5f5",  minHeight: "100vh", overflowX: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "36px", margin: 0, color: "#333", fontWeight: "400" }}>Gestión de Usuarios</h1>
        </div>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "20px", padding: "10px", width: "300px", fontSize: "14px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        {/* Tabla de usuarios */}
        <div style={{ background: "white", borderRadius: "8px", border: "1px solid #e0e0e0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f8f8f8", borderBottom: "2px solid #e0e0e0" }}>
              <tr>
                {["No", "Username", "Nombre", "Email", "Registrado", "Acciones"].map((th) => (
                  <th key={th} style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "500", color: "#666" }}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "15px", color: "#666" }}>No hay usuarios</td>
                </tr>
              )}
              {currentUsers.map((user, i) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #f0f0f0", backgroundColor: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "15px 12px", fontSize: "14px", color: "#333" }}>{startIndex + i + 1}</td>
                  <td style={{ padding: "15px 12px", fontSize: "14px", color: "#333" }}>{user.username}</td>
                  <td style={{ padding: "15px 12px", fontSize: "14px", color: "#333" }}>{user.name}</td>
                  <td style={{ padding: "15px 12px", fontSize: "14px", color: "#333" }}>{user.email}</td>
                  <td style={{ padding: "15px 12px", fontSize: "14px", color: "#333" }}>{user.registered}</td>
                  <td style={{ padding: "15px 12px" }}>
                    <button onClick={() => setSelectedUser(user)} style={{ backgroundColor: "#997C71", color: "#F5E3C3", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: "8px 12px", border: "1px solid #ddd", background: "white", cursor: currentPage === 1 ? "not-allowed" : "pointer", borderRadius: "4px" }}>«</button>
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ padding: "8px 12px", border: "1px solid #ddd", background: "white", cursor: currentPage === 1 ? "not-allowed" : "pointer", borderRadius: "4px" }}>‹</button>
          {[...Array(totalPages)].map((_, idx) => (
            <button key={idx} onClick={() => setCurrentPage(idx + 1)} style={{ padding: "8px 12px", border: "1px solid #ddd", background: currentPage === idx + 1 ? "#997C71" : "#F5E3C3", color: currentPage === idx + 1 ? "white" : "#333", cursor: "pointer", borderRadius: "4px" }}>{idx + 1}</button>
          ))}
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{ padding: "8px 12px", border: "1px solid #ddd", background: "white", cursor: currentPage === totalPages ? "not-allowed" : "pointer", borderRadius: "4px" }}>›</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: "8px 12px", border: "1px solid #ddd", background: "white", cursor: currentPage === totalPages ? "not-allowed" : "pointer", borderRadius: "4px" }}>»</button>
        </div>

        {/* Detalle del usuario seleccionado */}
        {selectedUser && (
          <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "white" }}>
            <h2 style={{ marginBottom: "15px", color: "#333" }}>Detalle de {selectedUser.name}</h2>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Registrado:</strong> {selectedUser.registered}</p>

            {/* /<h3 style={{ marginTop: "20px" }}>Historial de Compras</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f8f8f8", borderBottom: "2px solid #e0e0e0" }}>
                  <tr>
                    {["Código", "Fecha", "Producto", "Categoría", "Precio", "Método", "Estado"].map((th) => (
                      <th key={th} style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "500", color: "#666" }}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {getPurchaseHistory().map((purchase) => (
                    <tr key={purchase.code} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.code}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.date}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.product}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.category}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>S/ {purchase.price.toFixed(2)}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.method}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{purchase.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}

            <button style={{ marginTop: "20px", backgroundColor: "#997C71", color: "#F5E3C3", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }} onClick={() => setSelectedUser(null)}>
              Cerrar
            </button>
            </div>
        )}
      </main>
    </div>
  );
}

export default UserManagement;
