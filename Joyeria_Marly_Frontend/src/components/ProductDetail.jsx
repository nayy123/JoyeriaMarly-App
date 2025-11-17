import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductDetail.css';
import Header from './Header';
import Footer from './Footer';

const API_BASE_URL = 'http://localhost:8080/api';

const ProductDetail = () => {
  const { productId, collectionType } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configuración de colecciones
  const collectionConfig = {
    'SeaCollection': {
      name: 'Sea Collection',
      storageKey: 'sea-collection_products',
      displayName: 'SEA COLLECTION'
    },
    'MataritaCollection': {
      name: 'Matarita Collection', 
      storageKey: 'matarita-collection_products',
      displayName: 'MATARITA COLLECTION'
    },
    'BestSellers': {
      name: 'Best Sellers',
      storageKey: 'best-sellers_products',
      displayName: 'BEST SELLERS'
    }
  };

  // Función para obtener imagen desde el backend
  const obtenerImagen = (imagePath) => {
    if (!imagePath) return '/images/placeholder-product.jpg';
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:8080${imagePath}`;
    }
    
    if (imagePath && !imagePath.startsWith('/')) {
      return `http://localhost:8080/uploads/${imagePath}`;
    }
    
    return '/images/placeholder-product.jpg';
  };

  // Cargar producto
  useEffect(() => {
    const loadProduct = () => {
      try {
        setLoading(true);
        const config = collectionConfig[collectionType];
        if (!config) return;

        // Intentar cargar desde localStorage primero
        const storedProducts = localStorage.getItem(config.storageKey);
        if (storedProducts) {
          const products = JSON.parse(storedProducts);
          const foundProduct = products.find(p => p.id === parseInt(productId) || p.idProducto === productId);
          if (foundProduct) {
            setProduct(foundProduct);
            loadRelatedProducts(foundProduct, products);
            setLoading(false);
            return;
          }
        }

        // Si no está en localStorage, usar datos de ejemplo
        const sampleProducts = getSampleProducts(collectionType);
        const foundProduct = sampleProducts.find(p => p.id === parseInt(productId));
        if (foundProduct) {
          setProduct(foundProduct);
          loadRelatedProducts(foundProduct, sampleProducts);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error cargando producto:', error);
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, collectionType]);

  // Datos de ejemplo para cada colección
  const getSampleProducts = (type) => {
    const samples = {
      'SeaCollection': [
        {
          id: 1,
          name: "Ocean Pearl Necklace",
          price: 89.99,
          material: "Pearl",
          type: "Necklace",
          descripcion: "Beautiful pearl necklace inspired by the ocean. Handcrafted with genuine pearls and sterling silver.",
          moreDescription: "This exquisite ocean-inspired necklace features perfectly round pearls that capture the essence of sea treasures. Each pearl is carefully selected for its luster and quality, set in premium sterling silver that won't tarnish over time.",
          productDetails: "Material: Genuine Pearls, Sterling Silver | Chain Length: 18 inches | Clasp: Spring Ring | Care: Avoid contact with chemicals",
          jewelryCare: "Store in a soft pouch, avoid contact with perfumes and lotions, clean with soft cloth",
          shippingInfo: "Free shipping worldwide, delivered in 3-5 business days",
          imagenUrl: "/images/sea-pearl.jpg",
          stock: 10
        },
        {
          id: 2,
          name: "Wave Silver Bracelet",
          price: 65.00,
          material: "Silver",
          type: "Bracelet", 
          descripcion: "Elegant silver bracelet with wave pattern inspired by ocean waves.",
          moreDescription: "Crafted from premium sterling silver, this bracelet features a delicate wave pattern that symbolizes the eternal motion of the sea. Perfect for everyday wear or special occasions.",
          productDetails: "Material: Sterling Silver | Length: 7.5 inches | Adjustable: Yes | Care: Polish with silver cloth",
          imagenUrl: "/images/wave-bracelet.jpg",
          stock: 15
        }
      ],
      'MataritaCollection': [
        {
          id: 1,
          name: "Tropical Gemstone Ring",
          price: 155.00,
          material: "Gold",
          type: "Ring",
          descripcion: "Vibrant gemstone ring with tropical inspiration. Featuring colorful stones that capture the essence of tropical sunsets.",
          moreDescription: "This stunning ring combines the warmth of gold with the vibrant colors of tropical gemstones. Each stone is hand-selected for its brilliance and color saturation.",
          productDetails: "Material: 14K Gold, Natural Gemstones | Stone: Multi-color | Size: Adjustable | Care: Avoid harsh chemicals",
          imagenUrl: "/images/tropical-ring.jpg",
          stock: 6
        },
        {
          id: 2, 
          name: "Sunset Crystal Necklace",
          price: 120.75,
          material: "Silver",
          type: "Necklace",
          descripcion: "Crystal necklace capturing sunset colors with gradient crystal stones.",
          moreDescription: "Experience the magic of tropical sunsets with this exquisite crystal necklace. The gradient colors transition beautifully from warm oranges to deep purples.",
          productDetails: "Material: Sterling Silver, Swarovski Crystals | Chain: 16-18 inches | Clasp: Lobster | Care: Wipe clean with soft cloth",
          imagenUrl: "/images/sunset-necklace.jpg",
          stock: 8
        }
      ],
      'BestSellers': [
        {
          id: 1,
          name: "Gold Elegance Ring",
          price: 129.99,
          material: "Gold", 
          type: "Ring",
          descripcion: "Elegant gold ring with premium finish. A timeless piece that complements any style.",
          moreDescription: "Crafted from high-quality gold, this ring features a sleek, modern design that never goes out of style. Perfect for both casual and formal occasions.",
          productDetails: "Material: 14K Gold | Finish: Polished | Size: Available in all sizes | Care: Professional cleaning recommended",
          imagenUrl: "/images/gold-ring.jpg",
          stock: 8
        },
        {
          id: 2,
          name: "Silver Charm Bracelet", 
          price: 79.50,
          material: "Silver",
          type: "Bracelet",
          descripcion: "Beautiful silver bracelet with charm details that tell a story.",
          moreDescription: "This charming bracelet features delicate silver charms that symbolize love, adventure, and joy. Each charm is meticulously crafted and can be customized.",
          productDetails: "Material: Sterling Silver | Length: 7 inches | Charms: 3 included | Care: Store in anti-tarnish bag",
          imagenUrl: "/images/silver-bracelet.jpg",
          stock: 12
        }
      ]
    };
    
    return samples[type] || [];
  };

  // Cargar productos relacionados
  const loadRelatedProducts = (currentProduct, allProducts) => {
    const related = allProducts
      .filter(p => p.id !== currentProduct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setRelatedProducts(related);
  };

  // Manejar favoritos
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Manejar accordion
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Manejar agregar al carrito
  const addToCart = () => {
    if (!product) return;
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imagenUrl: product.imagenUrl,
      quantity: quantity,
      collectionType: collectionType,
      material: product.material,
      type: product.type
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => 
      item.id === product.id && item.collectionType === collectionType
    );
    
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Product added to cart successfully!');
  };

  // Manejar compra inmediata
  const handleBuyNow = () => {
    addToCart();
    navigate('/cart');
  };

  // Incrementar cantidad
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrementar cantidad
  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-white">
          <div className="product-detail-loading text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-xl font-serif text-gray-900 mb-4">Product not found</h2>
            <button 
              onClick={() => navigate(-1)}
              className="add-to-cart-btn inline-block px-6 py-3"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const config = collectionConfig[collectionType] || {};
  
  const accordionItems = [
    {
      title: 'Description',
      content: product.moreDescription || product.descripcion || 'No description available.'
    },
    {
      title: 'Product Details',
      content: product.productDetails || `Material: ${product.material} | Type: ${product.type} | Premium quality craftsmanship`
    },
    {
      title: 'Jewelry Care',
      content: product.jewelryCare || 'Store your jewelry in a dry place, avoid contact with chemicals and perfumes, clean with soft cloth regularly.'
    },
    {
      title: 'Shipping Info',
      content: product.shippingInfo || 'Free shipping worldwide. Delivery within 3-5 business days. 30-day return policy.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-white">
        <div className="product-detail-container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/" className="hover:text-gray-800 transition-colors">Home</Link>
            <span> / </span>
            <Link to={`/product/${collectionType.toLowerCase()}`} className="hover:text-gray-800 transition-colors">
              {config.name}
            </Link>
            <span> / </span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>

          <div className="product-detail-content">
            {/* Imagen del producto */}
            <div className="product-image-section">
              <div className="main-product-image">
                <img 
                  src={obtenerImagen(product.imagenUrl)} 
                  alt={product.name}
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-product.jpg';
                  }}
                />
              </div>
              <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Información del producto */}
            <div className="product-info-section">
              <div className="product-header">
                <div className="product-category tracking-wide text-sm">{config.displayName}</div>
                <h1 className="product-title text-serif">{product.name}</h1>
              </div>

              <div className="product-price">${product.price}</div>

              {/* Detalles adicionales */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium mr-2">Material:</span>
                  <span>{product.material}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium mr-2">Type:</span>
                  <span>{product.type}</span>
                </div>
                {product.stock && (
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium mr-2">Stock:</span>
                    <span>{product.stock} available</span>
                  </div>
                )}
              </div>

              {/* Selector de cantidad */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={decrementQuantity}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-base font-medium w-8 text-center">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="product-actions">
                <button className="add-to-cart-btn" onClick={addToCart}>
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
                      <p className="text-gray-700 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
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
                    key={relatedProduct.id} 
                    className="related-product-card group cursor-pointer"
                    onClick={() => navigate(`/product/${collectionType}/${relatedProduct.id}`)}
                  >
                    <div className="related-product-image">
                      <img 
                        src={obtenerImagen(relatedProduct.imagenUrl)} 
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                        onError={(e) => {
                          e.target.src = '/images/placeholder-product.jpg';
                        }}
                      />
                    </div>
                    <div className="related-product-info">
                      <h4 className="text-serif group-hover:text-gray-700 transition-colors">{relatedProduct.name}</h4>
                      <p className="related-product-price">$ {relatedProduct.price}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                        <span>🧵 {relatedProduct.material}</span>
                        <span>📦 {relatedProduct.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;