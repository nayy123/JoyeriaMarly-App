import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SidebarProducts";
import ProductGrid from "../components/ProductGrid";
import { useProductos } from "../contexts/ProductoContext"; // <- importar el hook

import SeaCollection from "/src/assets/SeaCollectionHover.png";

function SeaCollectionDetail() {
  // Acceder al contexto
  const { productos, loading, error } = useProductos();

  return (
    <>
      <Header />

      <section className="relative w-full h-[90vh]">
        <img
          src={SeaCollection}
          alt="Sea Collection Banner"
          className="w-full h-full object-cover"
        />
      </section>

      <div className="flex min-h-screen">
        <Sidebar />

        {/* Mostrar estado de carga / error */}
        {loading ? (
          <p className="text-center m-4">Cargando productos...</p>
        ) : error ? (
          <p className="text-center m-4 text-red-500">{error}</p>
        ) : (
          <ProductGrid products={productos} /> // <- usar productos del contexto
        )}
      </div>

      <Footer />
    </>
  );
}

export default SeaCollectionDetail;
