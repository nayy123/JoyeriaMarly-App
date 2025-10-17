// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderCard from "../components/Orders";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar carrito desde el backend o localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/carrito');
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.carrito || []);
        } else {
          const localCart = JSON.parse(localStorage.getItem('carrito') || '[]');
          setCartItems(localCart);
        }
      } catch (error) {
        console.log('Error cargando carrito del backend, usando localStorage:', error);
        const localCart = JSON.parse(localStorage.getItem('carrito') || '[]');
        setCartItems(localCart);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // Actualizar cantidad
  const handleUpdateQuantity = async (itemId, coleccion, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:3000/api/carrito/actualizar/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad: newQuantity, coleccion }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.carrito);
        localStorage.setItem('carrito', JSON.stringify(data.carrito));
      }
    } catch (error) {
      console.log('Error actualizando cantidad:', error);
    }
  };

  // Eliminar producto
  const handleDeleteItem = async (itemId, coleccion) => {
    try {
      const response = await fetch(`http://localhost:3000/api/carrito/eliminar/${itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coleccion }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.carrito);
        localStorage.setItem('carrito', JSON.stringify(data.carrito));
      }
    } catch (error) {
      console.log('Error eliminando producto:', error);
    }
  };

  // Vaciar carrito
  const handleClearCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/carrito/vaciar', {
        method: 'DELETE',
      });
      if (response.ok) {
        setCartItems([]);
        localStorage.setItem('carrito', '[]');
      }
    } catch (error) {
      console.log('Error vaciando carrito:', error);
    }
  };

  // Proceder al pago (actualiza stock y limpia carrito)
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/carrito/procesar-compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito: cartItems }),
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Compra procesada exitosamente. ¡Gracias por tu compra!');
        setCartItems([]);
        localStorage.setItem('carrito', '[]');
      } else {
        alert(`⚠️ Error: ${data.error || data.errores?.join(', ')}`);
      }
    } catch (error) {
      console.error('Error procesando compra:', error);
      alert('Error al procesar la compra.');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-[#EBEBEB] min-h-screen flex items-center justify-center">
          <p>Cargando carrito...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#EBEBEB] min-h-screen overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Carrito de Compras</h1>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Vaciar Carrito
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
              <button
                onClick={() => window.history.back()}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <OrderCard
                  key={`${item.id}-${item.coleccion}`}
                  status="In Cart"
                  image={item.imagen}
                  title={item.nombre}
                  subtitle={item.coleccion}
                  price={item.precio}
                  quantity={item.cantidad}
                  onAdd={() => handleUpdateQuantity(item.id, item.coleccion, item.cantidad + 1)}
                  onDelete={() => handleDeleteItem(item.id, item.coleccion)}
                  onQuantityChange={(newQuantity) =>
                    handleUpdateQuantity(item.id, item.coleccion, newQuantity)
                  }
                />
              ))}

              {/* Total */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span>
                    ${cartItems
                      .reduce((total, item) => total + item.precio * item.cantidad, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600 font-bold"
                >
                  Proceder al Pago
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
