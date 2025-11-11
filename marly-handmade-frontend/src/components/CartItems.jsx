import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext.jsx";
import "../styles/CartItems.css";

const CartItems = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token); // true si existe token, false si no
  }, []);

  if (!hasToken) {
    return (
      <div className="empty-cart">
        <i className="fas fa-user-lock"></i>
        <h3>Debes iniciar sesión</h3>
        <p>Inicia sesión para ver y gestionar tu carrito de compras</p>
        <a href="/login" className="continue-shopping-btn">
          Iniciar Sesión
        </a>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <i className="fas fa-shopping-cart"></i>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega algunos productos increíbles para comenzar</p>
        <a href="/product/sea-collection" className="continue-shopping-btn">
          Continuar Comprando
        </a>
      </div>
    );
  }

  return (
    <div className="cart-items-list">
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.img} alt={item.name} className="cart-item-img" />
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>S/ {item.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className="remove-btn remove-btnCart" onClick={() => removeFromCart(item.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
