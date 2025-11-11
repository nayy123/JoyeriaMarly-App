import { useContext } from "react";
import { OrderCard } from "./OrderCard";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useCart } from "../contexts/CartContext";

export function CartDrawer({ open, onClose }) {
  const { token } = useContext(AuthContext);

  // Obtiene datos del CartContext en lugar de useState local
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const handleDelete = (id) => removeFromCart(id);

  const handleAdd = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const subtotal = getCartTotal();
  const shipping = cartItems.length > 0 ? 10 : 0; // Solo cobra envío si hay productos
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay con transición */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel del carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-serif font-semibold text-lg">Tu carrito</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        {token ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 && (
                <p className="text-center text-gray-500">
                  Tu carrito está vacío
                </p>
              )}
              {cartItems.map((item) => (
                <OrderCard
                  key={item.id}
                  status="En carrito"
                  image={item.img}
                  title={item.name}
                  subtitle={item.category}
                  price={item.price}
                  quantity={item.quantity}
                  onAdd={() => handleAdd(item.id)}
                  onDecrease={() => handleDecrease(item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>

            <div className="p-4 border-t space-y-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <a href="/buy">
                <button className="w-full bg-black text-white py-2 rounded-md font-semibold cursor-pointer hover:bg-gray-800">
                  Checkout
                </button>
              </a>
              <button
                onClick={onClose}
                className="w-full border border-gray-300 py-2 rounded-md font-medium cursor-pointer hover:bg-gray-50"
              >
                Continuar comprando
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4 text-center">
            <h3 className="text-gray-600">
              Por favor inicia sesión para ver tu carrito
            </h3>
          </div>
        )}
      </div>
    </>
  );
}
