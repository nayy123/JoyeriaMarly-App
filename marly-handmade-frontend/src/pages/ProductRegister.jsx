import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useProductos } from "../contexts/ProductoContext";
import "../styles/ProductoRegister.css";

export default function ProductRegister() {
  const { formData, setFormData, handleImageUpload, handleSubmit, loading } =
    useProductos();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // 🧠 Función auxiliar para mostrar imágenes locales o URLs
  const getImageSrc = (image) => {
    if (!image) return null;
    if (typeof image === "string") return image; // URL ya subida a Cloudinary
    if (image instanceof File) return URL.createObjectURL(image); // archivo local
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen">

      <div
        className={`flex min-h-[calc(100vh-8rem)] bg-gray-50 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-[230px]" : "lg:ml-0"
        }`}
      >

        <main
          className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 lg:p-12"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Product Register
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Add new handmade products to your catalog
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6 sm:p-8"
            >
              {/* === IMAGE UPLOADS === */}
              <div className="image-uploads">
                {/* Imagen principal */}
                <label className="image-upload main">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "main")}
                  />
                  {formData.mainImage ? (
                    <img
                      src={getImageSrc(formData.mainImage)}
                      alt="Main"
                      className="rounded-lg object-cover w-full h-64"
                    />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-10 h-10 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 16l4-4a3 3 0 014 0l4 4m0 0l4-4a3 3 0 014 0l4 4M3 10h18"
                        />
                      </svg>
                      <span>Upload Main Image</span>
                    </>
                  )}
                </label>

                {/* Imágenes adicionales */}
                <div className="extra-images">
                  {[1, 2].map((i) => (
                    <label key={i} className="image-upload small">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, `additional-${i}`)
                        }
                      />
                      {formData.additionalImages &&
                      formData.additionalImages[i - 1] ? (
                        <img
                          src={getImageSrc(formData.additionalImages[i - 1])}
                          alt={`Additional ${i}`}
                          className="rounded-md object-cover w-full h-32"
                        />
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 16l4-4a3 3 0 014 0l4 4m0 0l4-4a3 3 0 014 0l4 4M3 10h18"
                            />
                          </svg>
                          <span>Upload</span>
                        </>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* === FORM FIELDS === */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material
                    </label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      min={0}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      min={0}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* === CAMPOS ADICIONALES === */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Details
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Describe detalles únicos del producto (materiales, proceso artesanal, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Care Instructions
                  </label>
                  <textarea
                    value={formData.care}
                    onChange={(e) =>
                      setFormData({ ...formData, care: e.target.value })
                    }
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ejemplo: limpiar con paño seco, evitar exposición al agua..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shipping Info
                  </label>
                  <textarea
                    value={formData.shippingInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, shippingInfo: e.target.value })
                    }
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ejemplo: envío nacional e internacional, empaques ecológicos..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#997C71] hover:bg-[#85695F] text-[#F5E3C3] font-semibold py-3 px-6 rounded-lg shadow-sm transition-all"
                >
                  {loading ? "Uploading..." : "Upload Product"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
