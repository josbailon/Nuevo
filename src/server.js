const express = require('express');
const app = express();
const products = require('./models/products');

// Middleware to parse JSON
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static('public'));

// Products API endpoint
app.get('/products', (req, res) => {
  res.json(products);
});

// Exportar app para pruebas
module.exports = app;

// Iniciar el servidor solo si se ejecuta directamente
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}