export const menuItemExample = {
  name: "Ibuprofeno",
  description: "Antiinflamatorio de 400mg",
  price: 3.20,
  available: true
};

export const orderExample = {
  items: [menuItemExample],
  totalAmount: 3.20,
  orderDate: new Date(),
  status: "pendiente"
};
