const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'joyeriabd',
    port: 3306
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL - joyeriabd');
});

// ==========================================================
// RUTAS DE PRODUCTOS
// ==========================================================
app.get('/api/productos', (req, res) => {
    const query = `
        SELECT 
            p.id_producto,
            p.nombre_producto,
            p.descripcion,
            p.precio,
            p.stock,
            p.imagen_url,
            p.id_categoria,
            c.nombre_categoria,
            p.descripcion as detalles,
            CASE 
                WHEN p.id_categoria IN (1, 3) THEN 'Polymer Clay'
                WHEN p.id_categoria IN (2, 4) THEN 'Resin'
                ELSE 'Material no especificado'
            END as material,
            CASE 
                WHEN p.id_producto IN (1, 2, 3, 4) THEN 'MostLoved'
                WHEN p.id_producto = 5 THEN 'SeaCollection'
                WHEN p.id_producto = 6 THEN 'MataritaCollection'
                ELSE 'General'
            END as coleccion
        FROM Producto p
        INNER JOIN CategoriaProducto c ON p.id_categoria = c.id_categoria
        WHERE p.stock > 0
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando query:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
});

app.get('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    const query = `
        SELECT 
            p.id_producto,
            p.nombre_producto,
            p.descripcion,
            p.precio,
            p.stock,
            p.imagen_url,
            p.id_categoria,
            c.nombre_categoria,
            p.descripcion as detalles,
            CASE 
                WHEN p.id_categoria IN (1, 3) THEN 'Polymer Clay'
                WHEN p.id_categoria IN (2, 4) THEN 'Resin'
                ELSE 'Material no especificado'
            END as material,
            CASE 
                WHEN p.id_producto IN (1, 2, 3, 4) THEN 'MostLoved'
                WHEN p.id_producto = 5 THEN 'SeaCollection'
                WHEN p.id_producto = 6 THEN 'MataritaCollection'
                ELSE 'General'
            END as coleccion
        FROM Producto p
        INNER JOIN CategoriaProducto c ON p.id_categoria = c.id_categoria
        WHERE p.id_producto = ?
    `;
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error ejecutando query:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(results[0]);
    });
});

app.put('/api/productos/:id/stock', (req, res) => {
    const productId = req.params.id;
    const { cantidad } = req.body;

    const query = 'UPDATE Producto SET stock = stock - ? WHERE id_producto = ? AND stock >= ?';
    db.query(query, [cantidad, productId, cantidad], (err, results) => {
        if (err) {
            console.error('Error ejecutando query:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.affectedRows === 0) {
            return res.status(400).json({ error: 'Stock insuficiente o producto no encontrado' });
        }
        res.json({ message: 'Stock actualizado correctamente' });
    });
});

// ==========================================================
// RUTAS DEL CARRITO
// ==========================================================
let carrito = [];

// Obtener carrito
app.get('/api/carrito', (req, res) => {
    res.json({ carrito });
});

// Agregar producto al carrito
app.post('/api/carrito/agregar', (req, res) => {
    const { id, nombre, precio, imagen, cantidad, coleccion } = req.body;

    const verifyQuery = 'SELECT * FROM Producto WHERE id_producto = ?';
    db.query(verifyQuery, [id], (err, results) => {
        if (err) {
            console.error('Error verificando producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const producto = results[0];

        if (producto.stock < cantidad) {
            return res.status(400).json({ error: 'Stock insuficiente' });
        }

        const existingItem = carrito.find(item => item.id === id);

        if (existingItem) {
            existingItem.cantidad += cantidad;
        } else {
            carrito.push({ id, nombre, precio, imagen, cantidad, coleccion });
        }

        res.json({
            message: 'Producto agregado al carrito',
            carrito
        });
    });
});

// Actualizar cantidad
app.put('/api/carrito/actualizar/:id', (req, res) => {
    const productId = req.params.id;
    const { cantidad } = req.body;

    const item = carrito.find(item => item.id == productId);
    if (!item) {
        return res.status(404).json({ error: 'Producto no encontrado en carrito' });
    }

    const stockQuery = 'SELECT stock FROM Producto WHERE id_producto = ?';
    db.query(stockQuery, [productId], (err, results) => {
        if (err) {
            console.error('Error verificando stock:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length === 0 || results[0].stock < cantidad) {
            return res.status(400).json({ error: 'Stock insuficiente' });
        }

        item.cantidad = cantidad;
        res.json({ carrito });
    });
});

// Eliminar producto del carrito
app.delete('/api/carrito/eliminar/:id', (req, res) => {
    const productId = req.params.id;
    carrito = carrito.filter(item => item.id != productId);
    res.json({
        message: 'Producto eliminado del carrito',
        carrito
    });
});

// Vaciar carrito
app.delete('/api/carrito/vaciar', (req, res) => {
    carrito = [];
    res.json({
        message: 'Carrito vaciado',
        carrito
    });
});

// ==========================================================
// PROCESAR COMPRA (NUEVA RUTA PRINCIPAL)
// ==========================================================
app.post('/api/carrito/procesar-compra', async (req, res) => {
    const { carrito: carritoCliente } = req.body;

    if (!Array.isArray(carritoCliente) || carritoCliente.length === 0) {
        return res.status(400).json({ success: false, error: 'El carrito está vacío' });
    }

    const errores = [];

    const actualizarStock = carritoCliente.map(item => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE Producto 
                SET stock = stock - ? 
                WHERE id_producto = ? AND stock >= ?
            `;
            db.query(query, [item.cantidad, item.id, item.cantidad], (err, results) => {
                if (err) return reject(err);
                if (results.affectedRows === 0) {
                    errores.push(`Stock insuficiente para el producto ID ${item.id}`);
                }
                resolve();
            });
        });
    });

    Promise.all(actualizarStock)
        .then(() => {
            if (errores.length > 0) {
                return res.status(400).json({ success: false, errores });
            }

            carrito = []; // Vaciar carrito en memoria

            res.json({
                success: true,
                message: 'Compra procesada exitosamente. Stock actualizado.'
            });
        })
        .catch(err => {
            console.error('Error procesando compra:', err);
            res.status(500).json({ success: false, error: 'Error interno al procesar la compra' });
        });
});

// ==========================================================
// RUTA DE SALUD DEL SERVIDOR
// ==========================================================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Servidor funcionando correctamente',
        database: 'Conectado a joyeriabd'
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Base de datos: joyeriabd (MySQL)');
});

// Cerrar conexión a la base de datos al apagar el servidor
process.on('SIGINT', () => {
    db.end();
    process.exit();
});
