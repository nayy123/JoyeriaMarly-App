// src/pages/DetalleProducto.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './DetalleProducto.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DetalleProducto = () => {
  const { collectionType, productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Cargar producto desde el backend
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Buscar producto en todas las colecciones del backend
        const response = await fetch(`http://localhost:5000/api/productos/${productId}`);
        
        if (response.ok) {
          const result = await response.json(); // ← Cambiado aquí
          setProduct(result.producto); // ← Y aquí
          
          // Cargar productos relacionados de la misma colección
          const relatedResponse = await fetch(`http://localhost:5000/api/productos?coleccion=${collectionType}`);
          if (relatedResponse.ok) {
            const relatedResult = await relatedResponse.json(); // ← Cambiado aquí
            loadRelatedProducts(result.producto, relatedResult.productos); // ← Y aquí
          }
        } else {
          loadProductFromLocalStorage();
        }
      } catch (error) {
        console.log('Error cargando producto del backend:', error);
        loadProductFromLocalStorage();
      }
    };

    const loadProductFromLocalStorage = () => {
      let foundProduct = null;
      let allProducts = [];

      const collections = [
        'most-loved_products',
        'sea-collection_products', 
        'matarita-collection_products',
        'best-sellers_products',
        'shop-by-look_products'
      ];

      for (const storageKey of collections) {
        const storedProducts = localStorage.getItem(storageKey);
        if (storedProducts) {
          const products = JSON.parse(storedProducts);
          const product = products.find(p => 
            p.idProducto == productId || p.id == productId
          );
          if (product) {
            foundProduct = product;
            allProducts = products;
            break;
          }
        }
      }

      if (foundProduct) {
        setProduct(foundProduct);
        loadRelatedProducts(foundProduct, allProducts);
      }
    };

    loadProduct();
  }, [productId, collectionType]);

  // Cargar productos relacionados
  const loadRelatedProducts = (currentProduct, allProducts) => {
    if (!allProducts || allProducts.length === 0) return;
    
    const related = allProducts
      .filter(p => 
        (p.idProducto != currentProduct.idProducto && 
         p.id != currentProduct.id)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setRelatedProducts(related);
  };

  // Manejar cantidad
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Manejar accordion
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Agregar al carrito - SOLO BACKEND
  const agregarAlCarrito = async () => {
    if (!product) return;

    const cartItem = {
      id: product.idProducto || product.id,
      nombre: product.nombreProducto || product.name,
      precio: product.precio || product.price,
      imagen: product.imagenUrl || product.image,
      cantidad: quantity,
      coleccion: collectionType
    };

    console.log('Enviando al carrito:', cartItem);

    try {
      // Enviar SOLO al backend
      const response = await fetch('http://localhost:5000/api/carrito/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error('Error en el servidor');
      }

      const result = await response.json();
      console.log('Producto agregado al backend:', result);

      alert('Producto agregado al carrito exitosamente');

    } catch (error) {
      console.log('Error conectando con el backend:', error.message);
      alert('Error al agregar producto al carrito. Intente nuevamente.');
    }
  };

  // Manejar compra inmediata
  const handleBuyNow = () => {
    agregarAlCarrito();
    navigate('/cart');
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="product-detail-loading">
          <div className="loading-spinner"></div>
          <p>Cargando producto...</p>
        </div>
        <Footer />
      </>
    );
  }

  const accordionItems = [
    {
      title: 'Description',
      content: product.descripcion || product.description || 'No hay descripción disponible.'
    },
    {
      title: 'Product Details',
      content: product.detalles || product.details || 'No hay detalles adicionales disponibles.'
    },
    {
      title: 'Jewelry Care',
      content: product.cuidado || 'Para mantener tus joyas en perfecto estado, evita el contacto con productos químicos, quítatelas al nadar o hacer ejercicio, y guárdalas por separado para evitar rayones.'
    },
    {
      title: 'Shipping Info',
      content: product.envio || 'Envío gratuito en compras mayores a $50. Tiempo de entrega: 3-5 días hábiles. Envíos internacionales disponibles.'
    }
  ];

  return (
    <>
      <Header />
      
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Menu</Link>
          <span> / </span>
          <span>{collectionType?.toUpperCase() || 'PRODUCTO'}</span>
        </div>

        <div className="product-detail-content">
          {/* Imagen del producto */}
          <div className="product-image-section">
            <div className="main-product-image">
              <img 
                src={product.imagenUrl || product.image} 
                alt={product.nombreProducto || product.name}
                onError={(e) => e.target.src = '/images/placeholder-product.jpg'}
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="product-info-section">
            <div className="product-header">
              <div className="product-category tracking-wide text-sm">
                {collectionType?.toUpperCase() || 'COLECCIÓN'}
              </div>
              <h1 className="product-title text-serif">{product.nombreProducto || product.name}</h1>
            </div>

            <div className="product-price">${product.precio || product.price}</div>

            {/* Selector de cantidad */}
            <div className="quantity-selector mb-6">
              <label className="block text-sm text-gray-700 mb-2">Cantidad:</label>
              <div className="flex items-center space-x-3">
                <button 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="product-actions">
              <button className="add-to-cart-btn" onClick={agregarAlCarrito}>
                Add to Cart
              </button>
            </div>

            {/* Sección Buy Now */}
            <div className="buy-now-section">
              <span className="buy-now-label">Buy Now</span>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>

            {/* Accordion de información */}
            <div className="product-accordion">
              {accordionItems.map((item, index) => (
                <div key={index} className="accordion-item">
                  <button 
                    className={`accordion-header ${activeAccordion === index ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.title}
                    <span className="accordion-icon">+</span>
                  </button>
                  <div className={`accordion-content ${activeAccordion === index ? 'active' : ''}`}>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Share Section */}
            <div className="share-section">
              <div className="share-label">Share</div>
              <div className="share-buttons">
                <button className="pinterest-share">
                  Pin it
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-products-title">You May Also Like</h2>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <div 
                  key={relatedProduct.idProducto || relatedProduct.id} 
                  className="related-product-card"
                  onClick={() => navigate(`/product/${collectionType}/${relatedProduct.idProducto || relatedProduct.id}`)}
                >
                  <div className="related-product-image">
                    <img 
                      src={relatedProduct.imagenUrl || relatedProduct.image} 
                      alt={relatedProduct.nombreProducto || relatedProduct.name}
                      onError={(e) => e.target.src = '/images/placeholder-product.jpg'}
                    />
                  </div>
                  <div className="related-product-info">
                    <h4 className="text-serif">{relatedProduct.nombreProducto || relatedProduct.name}</h4>
                    <p className="related-product-price">$ {relatedProduct.precio || relatedProduct.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default DetalleProducto;