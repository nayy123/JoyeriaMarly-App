import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.slug}`);
    console.log(`Navigating to /product/${product.slug}`);
  };
  
  return (
    <div
      onClick={handleClick}
      className="
        group 
        rounded-xl 
        bg-white 
        p-3 
        shadow-md 
        hover:shadow-lg 
        transition-all 
        duration-300 
        cursor-pointer
      "
    >
      {/* Imagen */}
      <div className="relative overflow-hidden rounded-xl aspect-square">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="mt-3 text-center sm:text-left">
        <h3 className="text-[#040F2F] font-semibold text-base sm:text-sm md:text-base group-hover:text-[#567690] transition-colors">
          {product.name}
        </h3>
        <p className="text-[#567690] font-medium text-sm sm:text-base mt-1">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
