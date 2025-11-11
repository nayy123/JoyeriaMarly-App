import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NewPassword.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


export default function RecoverPassword() {
  const { updatePassword } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmarNewPassword, setConfirmarNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = useParams().token;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword != confirmarNewPassword) return; //falta dar un aviso
    updatePassword({ token, newPassword });
  };

  return (
    <>
      <Header />
      <div className="new-password-container">
        <div className="new-password-box">
          <h2 className="new-password-title">New Password</h2>

          <form className="new-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-wrapper-new-password">
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
              />
              <button
                  type="button"
                  className="toggle-password-new-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </button>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper-new-password">
              <input
                id="confirm-new-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setConfirmarNewPassword(e.target.value);
                }}
                required
              />
              <button
                  type="button"
                  className="toggle-password-new-password"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`fa-solid ${ showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`} ></i>
                </button>
              </div>
            </div>

            <button type="submit" className="update-btn">
              <Link to={"/login"}>UPDATE</Link>
            </button>
          </form>

          <div className="login-links-new-password">
            <Link to="/register">Create account</Link>
            <Link to="/">Return to Store</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
