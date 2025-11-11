import { useState } from "react";
import { ShoppingBag } from "lucide-react";

export default function ShopByLook() {
  const products = [
    {
      id: 1,
      name: "Ocean Blue Monk Tree",
      price: 37,
      image: "/ShopByLook-tree.png",
      top: "78%",
      left: "55%",
    },
    {
      id: 2,
      name: "Golden Star Necklace",
      price: 35,
      image: "/ShopByLook-star.png",
      top: "60%",
      left: "48%",
    },
    {
      id: 3,
      name: "Golden Thin Necklace",
      price: 25,
      image: "/ShopByLook-thin.png",
      top: "30%",
      left: "35%",
    },
  ];

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null); // Estado hover

  return (
    <div className="ShopByMarly">
      <div className="container">
        <h2>Shop by look</h2>

        <div className="flex-wrapper">
          {/* Imagen principal */}
          <div className="main-image">
            <img src="/ShopByLook.png" alt="Shop by look" />

            {products.map((product) => (
              <button
                key={product.id}
                className="absolute bg-white rounded-full p-1 shadow hover:scale-110 transition animate-[pulse-ring_2s_ease-in-out_infinite]"
                style={{ top: product.top, left: product.left }}
                onClick={() => setSelected(product)}
                onMouseEnter={() => setHovered(product)}
                onMouseLeave={() => setHovered(null)}
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
              </button>
            ))}
          </div>

          {/* Panel lateral */}
          <div className="side-panel">
            {selected ? (
              <div className="space-y-4 text-center">
                <img
                  key={selected.id}
                  src={selected.image}
                  alt={selected.name}
                />
                <h3>{selected.name}</h3>
                <p>from ${selected.price}</p>
              </div>
            ) : hovered ? (
              <div className="space-y-4 text-center">
                <img src={hovered.image} alt={hovered.name} />
                <h3>{hovered.name}</h3>
                <p>from ${hovered.price}</p>
              </div>
            ) : (
              <p className="text-gray-400 italic text-center">
                Click on a product icon to see details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
