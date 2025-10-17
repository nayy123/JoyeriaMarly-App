// marly-handmade-backend/server.js
const express = require('express');
const cors = require('cors');
const carritoRoutes = require('./routes/carrito');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/carrito', carritoRoutes);

// NUEVAS RUTAS PARA PRODUCTOS - AGREGAR ESTO
// Simulación de base de datos de productos
const productos = [
  {
    id: 1,
    idProducto: 1,
    nombreProducto: "Sea Conchitas",
    precio: 62,
    imagenUrl: "/SeaConchitas.png",
    descripcion: "Hermoso collar inspirado en el mar",
    detalles: "Hecho a mano con materiales premium",
    category: "Bracelets",
    material: "Polymer Clay",
    coleccion: "MostLoved"
  },
  {
    id: 2,
    idProducto: 2,
    nombreProducto: "Wild Flowers",
    precio: 80,
    imagenUrl: "/WildFlowers.png",
    descripcion: "Aretes florales únicos",
    detalles: "Diseño artesanal con resina",
    category: "Earrings",
    material: "Resin",
    coleccion: "MostLoved"
  },
  {
    id: 3,
    idProducto: 3,
    nombreProducto: "Interplanets",
    precio: 52,
    imagenUrl: "/Interplanets.png",
    descripcion: "Collar con diseño planetario",
    detalles: "Inspirado en el sistema solar",
    category: "Necklaces",
    material: "Polymer Clay",
    coleccion: "MostLoved"
  },
  {
    id: 4,
    idProducto: 4,
    nombreProducto: "Magenta Flower",
    precio: 90,
    imagenUrl: "/magentaFlower.jpg",
    descripcion: "Anillo floral en color magenta",
    detalles: "Perfecto para ocasiones especiales",
    category: "Rings",
    material: "Resin",
    coleccion: "MostLoved"
  },
  {
    id: 5,
    idProducto: 5,
    nombreProducto: "Ocean Blue",
    precio: 75,
    imagenUrl: "/OceanBlue.png",
    descripcion: "Collar azul oceánico",
    detalles: "Color azul profundo inspirado en el mar",
    category: "Necklaces",
    material: "Polymer Clay",
    coleccion: "SeaCollection"
  },
  {
    id: 6,
    idProducto: 6,
    nombreProducto: "Sunset Glow",
    precio: 85,
    imagenUrl: "/SunsetGlow.png",
    descripcion: "Brazalete con colores de atardecer",
    detalles: "Mezcla de naranjas y rosados",
    category: "Bracelets",
    material: "Resin",
    coleccion: "MataritaCollection"
  }
];

// Ruta para obtener un producto específico por ID
app.get('/api/productos/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    console.log('Buscando producto con ID:', productId);
    
    // Buscar producto por id o idProducto
    const producto = productos.find(p => 
      p.id === productId || p.idProducto === productId
    );

    if (!producto) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      producto: producto
    });

  } catch (error) {
    console.error('Error buscando producto:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Ruta para obtener productos por colección
app.get('/api/productos', (req, res) => {
  try {
    const { coleccion } = req.query;
    console.log('Buscando productos de colección:', coleccion);

    let productosFiltrados = productos;

    if (coleccion) {
      productosFiltrados = productos.filter(p => 
        p.coleccion && p.coleccion.toLowerCase() === coleccion.toLowerCase()
      );
    }

    res.json({
      success: true,
      productos: productosFiltrados,
      total: productosFiltrados.length
    });

  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Ruta para obtener todos los productos
app.get('/api/productos/todos', (req, res) => {
  try {
    res.json({
      success: true,
      productos: productos,
      total: productos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Backend de Marly Handmade funcionando', 
    timestamp: new Date().toISOString(),
    productos: productos.length
  });
});

// Servir imágenes estáticas
app.use(express.static('public'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Error interno del servidor' 
  });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Ruta no encontrada' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📦 ${productos.length} productos cargados`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🛒 Carrito: http://localhost:${PORT}/api/carrito`);
  console.log(`📋 Productos: http://localhost:${PORT}/api/productos`);
});