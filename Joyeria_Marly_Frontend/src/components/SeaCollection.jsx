import React, { useState, useEffect } from 'react';
import './Collection.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const API_BASE_URL = 'http://localhost:8080/api';

const SeaCollection = () => {
  const navigate = useNavigate();
  const [headerImage, setHeaderImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    materials: [],
    types: [],
    sortBy: ''
  });
  const [uploading, setUploading] = useState(false);
  const [currentUser] = useState({ rol: 1 });
  const [backendError, setBackendError] = useState(false);

  // Cargar imagen del header desde el backend
  useEffect(() => {
    const loadHeaderImage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/sea-collection-header-image`);
        if (response.ok) {
          const data = await response.json();
          if (data.imageUrl) {
            setHeaderImage(data.imageUrl);
          }
        } else {
          setBackendError(true);
        }
      } catch (error) {
        console.error('Error al cargar la imagen del header:', error);
        setBackendError(true);
      }
    };

    loadHeaderImage();
    loadProducts();
  }, []);

  // Cargar productos
  const loadProducts = async () => {
    const sampleProducts = [
      {
        id: 1,
        name: "Ocean Pearl Necklace",
        price: 89.99,
        material: "Pearl",
        type: "Necklace",
        descripcion: "Beautiful pearl necklace inspired by the ocean",
        imagenUrl: "/images/sea-pearl.jpg",
        stock: 10
      },
      {
        id: 2,
        name: "Wave Silver Bracelet",
        price: 65.00,
        material: "Silver",
        type: "Bracelet",
        descripcion: "Elegant silver bracelet with wave pattern",
        imagenUrl: "/images/wave-bracelet.jpg",
        stock: 15
      },
      {
        id: 3,
        name: "Sea Shell Earrings",
        price: 45.50,
        material: "Gold",
        type: "Earrings",
        descripcion: "Delicate gold earrings with sea shell design",
        imagenUrl: "/images/shell-earrings.jpg",
        stock: 20
      },
      {
        id: 4,
        name: "Nautical Anchor Pendant",
        price: 75.25,
        material: "Silver",
        type: "Pendant",
        descripcion: "Silver pendant with anchor design",
        imagenUrl: "/images/anchor-pendant.jpg",
        stock: 8
      },
    ];
    setProducts(sampleProducts);
  };

  // Subir imagen del header
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && currentUser.rol === 1) {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('headerImage', file);

      try {
        const response = await fetch(`${API_BASE_URL}/upload-sea-collection-header-image`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setHeaderImage(result.imageUrl);
          alert('Imagen subida exitosamente');
        } else {
          throw new Error('Error al subir la imagen');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al subir la imagen');
      } finally {
        setUploading(false);
      }
    }
  };

  // Materiales únicos para los filtros
  const uniqueMaterials = [...new Set(products.map(p => p.material))].filter(Boolean);
  const uniqueTypes = [...new Set(products.map(p => p.type))].filter(Boolean);

  const filteredProducts = products
    .filter(p => {
      const price = parseFloat(p.price) || 0;
      const minPrice = parseFloat(filters.priceRange.min) || 0;
      const maxPrice = parseFloat(filters.priceRange.max) || Infinity;
      
      return (
        price >= minPrice &&
        price <= maxPrice &&
        (filters.materials.length === 0 || filters.materials.includes(p.material)) &&
        (filters.types.length === 0 || filters.types.includes(p.type))
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === 'low') return (a.price || 0) - (b.price || 0);
      if (filters.sortBy === 'high') return (b.price || 0) - (a.price || 0);
      if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const toggleMaterialFilter = (material) => {
    setFilters(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  const toggleTypeFilter = (type) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: '', max: '' },
      materials: [],
      types: [],
      sortBy: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* CONTENIDO PRINCIPAL - Ajustado */}
      <main className="flex-grow bg-gray-50 pt-4"> {/* Agregado pt-4 para separación */}
        <div className="sea-collection-container">
          {backendError && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 mx-4">
              <strong>Nota:</strong> El backend no está disponible. Funcionando en modo demo.
            </div>
          )}
          
          <div className="hero-image-section">
            <div className="hero-image-container">
              {headerImage ? (
                <img src={headerImage} alt="Sea Collection Header" className="hero-image" />
              ) : (
                <div className="hero-placeholder">
                  <h2 className="text-3xl font-bold text-white">SEA COLLECTION</h2>
                  <p className="text-white mt-2">Inspired by the beauty of the ocean</p>
                  {backendError && (
                    <p className="text-yellow-200 text-sm mt-2">Modo demo - Backend no disponible</p>
                  )}
                </div>
              )}
            </div>
            
            {currentUser.rol === 1 && (
              <div className="admin-upload mt-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="upload-input"
                  disabled={uploading || backendError}
                />
                {uploading && <p className="mt-2">Subiendo imagen...</p>}
                {backendError && <p className="text-red-500 mt-2">Backend no disponible</p>}
              </div>
            )}
          </div>

          {/* CONTENIDO CON FILTROS Y PRODUCTOS */}
          <div className="collection-content">
            <aside className="filters-sidebar">
              <div className="filters-header">
                <h2 className="filters-title">
                  <span className="icon-filter">🎛️</span>
                  Filters
                </h2>
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear all
                </button>
              </div>

              <div className="filter-section">
                <div className="filter-label">
                  <span className="icon-price">💰</span>
                  Price
                </div>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={e => setFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, min: e.target.value }
                    }))}
                    className="price-input"
                  />
                  <span className="price-separator">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={e => setFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, max: e.target.value }
                    }))}
                    className="price-input"
                  />
                </div>
              </div>

              {uniqueMaterials.length > 0 && (
                <div className="filter-section">
                  <div className="filter-label">
                    <span className="icon-material">⚙️</span>
                    Material
                  </div>
                  <div className="filter-options">
                    {uniqueMaterials.map(material => (
                      <div
                        key={material}
                        className={`filter-option ${filters.materials.includes(material) ? 'selected' : ''}`}
                        onClick={() => toggleMaterialFilter(material)}
                      >
                        <div className="filter-checkbox"></div>
                        <span className="filter-text">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uniqueTypes.length > 0 && (
                <div className="filter-section">
                  <div className="filter-label">
                    <span className="icon-type">📦</span>
                    Product type
                  </div>
                  <div className="filter-options">
                    {uniqueTypes.map(type => (
                      <div
                        key={type}
                        className={`filter-option ${filters.types.includes(type) ? 'selected' : ''}`}
                        onClick={() => toggleTypeFilter(type)}
                      >
                        <div className="filter-checkbox"></div>
                        <span className="filter-text">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            <main className="products-section">
              <div className="products-header">
                <div className="products-count">
                  {filteredProducts.length} products found
                </div>
                <select
                  value={filters.sortBy}
                  onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="sort-select"
                >
                  <option value="">Sort by</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>

              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div 
                      className="product-image-container"
                      onClick={() => navigate(`/product/SeaCollection/${product.id}`)}
                      style={{cursor: 'pointer'}}
                    >
                      <img 
                        src={product.imagenUrl} 
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.src = '/images/placeholder-product.jpg';
                        }}
                      />
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                    <div className="product-details">
                      <span className="product-material">🧵 {product.material}</span>
                      <span className="product-type">📦 {product.type}</span>
                    </div>
                    {product.descripcion && (
                      <p className="product-description">{product.descripcion}</p>
                    )}
                  </div>
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <p className="empty-state-text">No products found</p>
                    <p className="empty-state-subtext">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeaCollection;