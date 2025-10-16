import { useContext } from 'react';
import { CartContext } from '../contexts/Cart.context';
import { AuthContext } from '../contexts/Auth.context';

export default function ProductCard({ product }) {
  const { addToCart, isLoading } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    const success = await addToCart(product.id, 1);
    if (success) {
      // Opcional: mostrar notificación de éxito
      console.log('Producto agregado al carrito');
    }
  };

  return (
    <div className="group border rounded-xl bg-white p-3 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Imagen */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="text-gray-800 font-medium text-sm group-hover:text-brown-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">${product.price}</p>
        
        <button 
          onClick={handleAddToCart}
          disabled={isLoading}
          className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}