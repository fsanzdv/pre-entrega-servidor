const express = require('express');
const router = express.Router();

// Simulación de base de datos en memoria
let products = [];
let productIdCounter = 1; // Autogenerador de ID de producto

// Ruta raíz GET / - Lista todos los productos
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);
  const result = limit ? products.slice(0, limit) : products;
  res.json(result);
});

// Ruta GET /:pid - Obtiene un producto por ID
router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = products.find(p => p.id === Number(pid));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

// Ruta POST / - Agrega un nuevo producto
router.post('/', (req, res) => {
  const { title, description, code, price } = req.body;

  // Validación simple de campos
  if (!title || !description || !code || typeof price !== 'number') {
    return res.status(400).json({ error: 'Faltan campos obligatorios o hay un error en el formato' });
  }

  // Crear y añadir el nuevo producto
  const newProduct = {
    id: productIdCounter++,
    title,
    description,
    code,
    price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
