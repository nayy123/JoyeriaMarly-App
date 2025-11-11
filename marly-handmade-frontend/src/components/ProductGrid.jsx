import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  // Filtrar solo productos activos
  const activeProducts = products.filter((p) => p.status == 1);

  if (!activeProducts.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#997C71] font-light text-sm p-6">
        No products found.
      </div> 
    );
  }

  return (
    <div className="flex-1 px-3 sm:px-4 md:px-6 pt-16 md:pt-24 mb-8">
      <div
        className="
          grid
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5
          gap-4
          sm:gap-6
        "
      >
        {activeProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
