// components/MostLoved.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MostLoved() {
  const navigate = useNavigate();

  const products = [
    {
      idProducto: 1,
      nombreProducto: "Sea Conchitas",
      precio: 62,
      imagenUrl: "/SeaConchitas.png",
      category: "Bracelets",
      material: "Polymer Clay"
    },
    {
      idProducto: 2,
      nombreProducto: "Wild Flowers",
      precio: 80,
      imagenUrl: "/WildFlowers.png",
      category: "Earrings", 
      material: "Resin"
    },
    {
      idProducto: 3,
      nombreProducto: "Interplanets",
      precio: 52,
      imagenUrl: "/Interplanets.png",
      category: "Necklaces",
      material: "Polymer Clay"
    },
    {
      idProducto: 4,
      nombreProducto: "Magenta Flower",
      precio: 90,
      imagenUrl: "/magentaFlower.jpg",
      category: "Rings",
      material: "Resin"
    },
  ];

  // Guardar productos en localStorage cuando el componente se monta
  useEffect(() => {
    localStorage.setItem('most-loved_products', JSON.stringify(products));
  }, []);

  const handleViewMore = () => {
    navigate('/best-sellers');
  };

  const handleProductClick = (product) => {
    // Navegar directamente al producto individual
    navigate(`/product/MostLoved/${product.idProducto}`);
};

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Most Loved</h2>
        <button 
          onClick={handleViewMore}
          className="mt-4 px-8 py-1 border-none bg-marlyBlue text-black font-bold cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
        >
          View More
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.idProducto}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={product.imagenUrl}
                alt={product.nombreProducto}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                onError={(e) => e.target.src = '/images/placeholder-product.jpg'}
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium hover:text-lightblue-600 transition-colors">
                {product.nombreProducto}
              </h3>
              <p className="text-gray-600 font-semibold">${product.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}