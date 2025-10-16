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

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Backend de Marly Handmade funcionando', 
    timestamp: new Date().toISOString() 
  });
});

// Servir imágenes estáticas (si tienes una carpeta public)
app.use(express.static('public'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Error interno del servidor' 
  });
});

// Ruta no encontrada - CORREGIDO
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Ruta no encontrada' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});