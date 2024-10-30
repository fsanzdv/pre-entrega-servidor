const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Importa las rutas de productos y carritos
const productRoutes = require('./routes/products');
// const cartRoutes = require('./routes/carts'); // Este se puede implementar luego
const cartRoutes = require('./routes/carts');
// Usa las rutas importadas en el servidor
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes); 

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
