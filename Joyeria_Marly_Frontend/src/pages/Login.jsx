import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/Auth.context";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(""); // Estado para el rol seleccionado
  const navigate = useNavigate();

  // Función para manejar la selección del rol
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar las credenciales de prueba para el administrador
    if (role === "administrador" && username === "admin" && password === "admin123") {
      navigate("/admin");
      return;
    }

    // Llamada al login para otros roles
    const success = await login({ username, password });

    if (!success) {
      setErrorMessage("Usuario o contraseña incorrectos.");
      setPassword("");
    } else {
      setErrorMessage("");

      // Redirigir según el rol seleccionado
      if (role === "comprador") {
        navigate("/comprador");
      } else if (role === "artesano") {
        navigate("/artesano");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>

          {/* Selección del rol */}
          {!role ? (
            <div className="role-selection">
              <h3>Elige tu rol</h3>
              <button onClick={() => handleRoleSelect("comprador")}>Comprador</button>
              <button onClick={() => handleRoleSelect("artesano")}>Artesano</button>
              <button onClick={() => handleRoleSelect("administrador")}>Administrador</button>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit}>
              {/* Mostrar el rol seleccionado */}
              <div className="role-badge">
                <span>Rol: <strong>{role}</strong></span>
                <button type="button" className="change-role" onClick={() => setRole("")}>
                  Cambiar rol
                </button>
              </div>

              <div className="form-group-login">
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group-login password-group">
                <div className="input-wrapper-login">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password-login"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} />
                  </button>
                </div>
                <p className="error-message">{errorMessage || "\u00A0"}</p>
              </div>

              <div className="form-links">
                <Link to="/recover-password">Forgot your password?</Link>
              </div>

              <button type="submit" className="login-btn">SIGN IN</button>
            </form>
          )}

          <div className="login-links">
            <Link to="/register">Create account</Link>
            <Link to="/">Return to Store</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
