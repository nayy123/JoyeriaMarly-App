import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputComplaintsBook from "../components/InputComplaintsBookComponent";
import { useReclamaciones } from "../contexts/ReclamacionesContext";

function ComplaintsBook() {
  const { crearReclamacion, loading } = useReclamaciones();
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async () => {
    try {
      await crearReclamacion({ fecha, descripcion });
      alert("Reclamación enviada con éxito");
      setFecha("");
      setDescripcion("");
    } catch (err) {
      alert("Error al enviar la reclamación");
    }
  };

  return (
    <>
      <Header />

      <h2 className="text-3xl font-bold mb-8 whitespace-nowrap text-center mt-15">
        COMPLAINTS BOOK
      </h2>

      <div className="my-15 flex flex-col items-center gap-8 w-full max-w-xl mx-auto">
        <InputComplaintsBook
          titulo="INCIDENT DATE"
          placeholder="Select the date of the incident"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <InputComplaintsBook
          titulo="PLEASE DESCRIBE THE PROBLEM"
          multiline
          rows={6}
          placeholder="Describe the issue in detail..."
          extraMargin
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Reclamación"}
        </button>
      </div>

      <Footer />
    </>
  );
}

export default ComplaintsBook;
