import { Link } from "react-router-dom";

export default function MarlyCollections() {
  const products = [
    {
      name: "BEST SELLERS",
      image: "/BestSellers.png",
      link: "/product/best-sellers",
    },
    {
      name: "SEA COLLECTION",
      image: "/SeaCollection.png",
      link: "/product/sea-collection",
    },
    {
      name: "MATARITA COLLECTION",
      image: "/MataritaCollection.png",
      link: "/product/matarita-collection",
    },
  ];

  return (
    <div className="CollectionMarly py-20">
      <h2 className="text-2xl font-semibold text-center mt-16 mb-10">
        MARLY Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-103 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <a href={product.link} className="group block">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-lg font-medium group-hover:text-lightblue-300 transition-colors">
                  {product.name}
                </h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
