// Lista de productos de farmacia, con más detalles
const products = [
  { id: 1, name: "Paracetamol",        category: "Analgésico",    price: 2.50, stock: 30,    description: "Caja 20 tabletas de 500mg", available: true },
  { id: 2, name: "Ibuprofeno",         category: "Antiinflamatorio", price: 3.20, stock: 18,    description: "Blíster 10 tabletas de 400mg", available: true },
  { id: 3, name: "Suero Oral",         category: "Rehidratante",   price: 4.00, stock: 10,    description: "Botella de 500ml", available: true },
  { id: 4, name: "Vitamina C",         category: "Suplemento",     price: 7.00, stock: 25,    description: "Frasco 60 cápsulas", available: true },
  { id: 5, name: "Alcohol",            category: "Antiséptico",    price: 2.80, stock: 45,    description: "Botella de 1 litro", available: true },
  { id: 6, name: "Mascarilla KN95",    category: "Protección",     price: 1.50, stock: 100,   description: "Mascarilla desechable", available: true },
  { id: 7, name: "Termómetro Digital", category: "Instrumento",    price: 8.00, stock: 15,    description: "Termómetro digital de contacto", available: true }
];

// Si usas CommonJS (require):
module.exports = products;

// Si usas ES Modules (import):
// export default products;
