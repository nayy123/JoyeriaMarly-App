// marly-handmade-backend/routes/carrito.js
const express = require('express');
const router = express.Router();

// Carrito en memoria
let carrito = [];

// Middleware de logging
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`, req.body);
  next();
});

// Obtener carrito completo
router.get('/', (req, res) => {
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  res.json({
    success: true,
    carrito,
    totalItems,
    totalPrecio,
  });
});

// Agregar producto
router.post('/agregar', (req, res) => {
  const { id, nombre, precio, imagen, cantidad, coleccion } = req.body;

  if (!id || !nombre || !precio || !cantidad) {
    return res.status(400).json({ success: false, error: 'Datos del producto incompletos' });
  }

  const itemExistente = carrito.find(
    (item) => item.id == id && item.coleccion === coleccion
  );

  if (itemExistente) {
    itemExistente.cantidad += parseInt(cantidad);
  } else {
    carrito.push({
      id,
      nombre,
      precio: parseFloat(precio),
      imagen: imagen || '/placeholder-product.jpg',
      cantidad: parseInt(cantidad),
      coleccion: coleccion || 'general',
    });
  }

  res.json({ success: true, message: 'Producto agregado', carrito });
});

// Actualizar cantidad
router.put('/actualizar/:id', (req, res) => {
  const { id } = req.params;
  const { cantidad, coleccion } = req.body;

  const item = carrito.find((i) => i.id == id && i.coleccion === coleccion);
  if (!item) return res.status(404).json({ success: false, error: 'Producto no encontrado' });

  item.cantidad = parseInt(cantidad);
  res.json({ success: true, carrito });
});

// Eliminar producto
router.delete('/eliminar/:id', (req, res) => {
  const { id } = req.params;
  const { coleccion } = req.body;

  carrito = carrito.filter((i) => !(i.id == id && i.coleccion === coleccion));
  res.json({ success: true, message: 'Producto eliminado', carrito });
});

// Vaciar carrito
router.delete('/vaciar', (req, res) => {
  carrito = [];
  res.json({ success: true, message: 'Carrito vaciado', carrito });
});

// 🔥 Procesar compra: descuenta stock y vacía carrito
router.post('/procesar-compra', (req, res) => {
  const { carrito: carritoCliente } = req.body;
  const db = req.app.get('db');

  if (!Array.isArray(carritoCliente) || carritoCliente.length === 0) {
    return res.status(400).json({ success: false, error: 'El carrito está vacío' });
  }

  const errores = [];

  const operaciones = carritoCliente.map((item) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Producto 
        SET stock = stock - ? 
        WHERE id_producto = ? AND stock >= ?
      `;
      db.query(query, [item.cantidad, item.id, item.cantidad], (err, results) => {
        if (err) return reject(err);
        if (results.affectedRows === 0) {
          errores.push(`Stock insuficiente para producto ID ${item.id}`);
        }
        resolve();
      });
    });
  });

  Promise.all(operaciones)
    .then(() => {
      if (errores.length > 0) {
        return res.status(400).json({ success: false, errores });
      }

      carrito = []; // limpiar carrito global
      res.json({ success: true, message: 'Compra procesada y stock actualizado' });
    })
    .catch((error) => {
      console.error('Error al procesar compra:', error);
      res.status(500).json({ success: false, error: 'Error interno al procesar la compra' });
    });
});

module.exports = router;
