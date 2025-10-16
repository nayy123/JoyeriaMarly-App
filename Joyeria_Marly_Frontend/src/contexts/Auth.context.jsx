import { useState, useEffect } from "react";
import { createContext } from "react";

const AuthContext = createContext();
const API_URL = "http://localhost:8080/auth/";

function AuthProviderWrapper(props) {
  const [token, setToken] = useState(null);

  // Monitorear cuando el token cambie en el contexto
  useEffect(() => {
    if (token) {
      console.log("Token actualizado en contexto:", token.token);
    }
  }, [token]);

  const login = async (data) => {
    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error en el login");
      }
      const result = await response.json();
      setToken(result);
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (data) => {
    try {
      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error en el login");
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const forgotPassword = async (data) => {
    try {
      const response = await fetch(`${API_URL}forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error en el forgot password");
      }
      const result = await response.json();
      console.log("Token recibido:", result);
    } catch (e) {
      console.log(e);
    }
  };

  const updatePassword = async (data) => {
    try {
      const response = await fetch(`${API_URL}update-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error en el login");
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, login, register, forgotPassword, updatePassword }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
