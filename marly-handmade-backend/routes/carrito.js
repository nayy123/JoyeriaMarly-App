// marly-handmade-backend/routes/carrito.js
const express = require('express');
const router = express.Router();

// Simulación de base de datos en memoria
let carrito = [];

// Middleware para logging
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`, req.body);
  next();
});

// AGREGAR PRODUCTO AL CARRITO
router.post('/agregar', (req, res) => {
  try {
    const { id, nombre, precio, imagen, cantidad, coleccion } = req.body;
    
    console.log('Datos recibidos para agregar al carrito:', req.body);
    
    // Validaciones básicas
    if (!id || !nombre || !precio || !cantidad) {
      return res.status(400).json({ 
        success: false, 
        error: 'Datos del producto incompletos' 
      });
    }

    // Buscar si el producto ya existe en el carrito
    const itemExistenteIndex = carrito.findIndex(item => 
      item.id == id && item.coleccion === coleccion
    );

    if (itemExistenteIndex !== -1) {
      // Si existe, actualizar la cantidad
      carrito[itemExistenteIndex].cantidad += parseInt(cantidad);
      carrito[itemExistenteIndex].fechaActualizado = new Date().toISOString();
    } else {
      // Si no existe, agregar nuevo item
      carrito.push({
        id: id,
        nombre: nombre,
        precio: parseFloat(precio),
        imagen: imagen || '/placeholder-product.jpg',
        cantidad: parseInt(cantidad),
        coleccion: coleccion || 'general',
        fechaAgregado: new Date().toISOString(),
        fechaActualizado: new Date().toISOString()
      });
    }

    // Respuesta exitosa
    res.json({ 
      success: true, 
      message: 'Producto agregado al carrito exitosamente',
      carrito: carrito,
      totalItems: carrito.reduce((total, item) => total + item.cantidad, 0),
      totalPrecio: carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
    });

  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor al agregar producto' 
    });
  }
});

// OBTENER CARRITO COMPLETO
router.get('/', (req, res) => {
  try {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    const totalPrecio = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

    res.json({ 
      success: true, 
      carrito: carrito,
      totalItems: totalItems,
      totalPrecio: totalPrecio
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener el carrito' 
    });
  }
});

// ACTUALIZAR CANTIDAD DE PRODUCTO - CORREGIDO
router.put('/actualizar/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    const coleccion = req.body.coleccion || req.query.coleccion;

    console.log('Actualizar producto - ID:', id, 'Cantidad:', cantidad, 'Colección:', coleccion);

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({ 
        success: false, 
        error: 'La cantidad debe ser al menos 1' 
      });
    }

    if (!coleccion) {
      return res.status(400).json({ 
        success: false, 
        error: 'Se requiere el parámetro coleccion' 
      });
    }

    const itemIndex = carrito.findIndex(item => 
      item.id == id && item.coleccion === coleccion
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado en el carrito' 
      });
    }

    carrito[itemIndex].cantidad = parseInt(cantidad);
    carrito[itemIndex].fechaActualizado = new Date().toISOString();
    
    res.json({ 
      success: true, 
      message: 'Cantidad actualizada exitosamente',
      item: carrito[itemIndex],
      carrito: carrito
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ELIMINAR PRODUCTO DEL CARRITO - CORREGIDO
router.delete('/eliminar/:id', (req, res) => {
  try {
    const { id } = req.params;
    const coleccion = req.body.coleccion || req.query.coleccion;

    console.log('Eliminar producto - ID:', id, 'Colección:', coleccion);

    if (!coleccion) {
      return res.status(400).json({ 
        success: false, 
        error: 'Se requiere el parámetro coleccion' 
      });
    }

    const itemIndex = carrito.findIndex(item => 
      item.id == id && item.coleccion === coleccion
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Producto no encontrado en el carrito' 
      });
    }

    const productoEliminado = carrito.splice(itemIndex, 1)[0];
    
    res.json({ 
      success: true, 
      message: 'Producto eliminado del carrito exitosamente',
      productoEliminado: productoEliminado,
      carrito: carrito
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// VACIAR CARRITO COMPLETO
router.delete('/vaciar', (req, res) => {
  try {
    const carritoVaciado = [...carrito];
    carrito = [];
    
    res.json({ 
      success: true, 
      message: 'Carrito vaciado exitosamente',
      carritoVaciado: carritoVaciado
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;