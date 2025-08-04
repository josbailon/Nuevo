// Simulando "base de datos" en memoria
let menuItems = [
  { id: 1, name: "Paracetamol", category: "Analgésico", price: 2.5 },
  { id: 2, name: "Ibuprofeno", category: "Antiinflamatorio", price: 3.2 }
];
let orders = [];

// Crear un nuevo producto del menú
export const createMenuItem = (req, res) => {
    const { name, category, price } = req.body;
    if (!name || !category || typeof price !== 'number') {
        return res.status(400).json({ error: "Faltan datos obligatorios o el precio no es válido." });
    }
    const newItem = {
        id: menuItems.length ? menuItems[menuItems.length - 1].id + 1 : 1,
        name,
        category,
        price
    };
    menuItems.push(newItem);
    res.status(201).json(newItem);
};

// Obtener todos los productos del menú
export const getMenuItems = (req, res) => {
    res.json(menuItems);
};

// Actualizar un producto del menú
export const updateMenuItem = (req, res) => {
    const { id } = req.params;
    const item = menuItems.find(m => m.id == id);
    if (!item) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    const { name, category, price } = req.body;
    if (name) item.name = name;
    if (category) item.category = category;
    if (typeof price === 'number') item.price = price;
    res.json(item);
};

// Eliminar un producto del menú
export const deleteMenuItem = (req, res) => {
    const { id } = req.params;
    const index = menuItems.findIndex(m => m.id == id);
    if (index === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    menuItems.splice(index, 1);
    res.json({ message: "Producto eliminado correctamente" });
};

// Crear una nueva orden
export const createOrder = (req, res) => {
    const { items } = req.body; // items: [{id, quantity}]
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Debes enviar items en la orden." });
    }
    let total = 0;
    const details = items.map(it => {
        const prod = menuItems.find(m => m.id === it.id);
        if (!prod) {
            throw new Error(`Producto con ID ${it.id} no encontrado`);
        }
        const subtotal = prod.price * (it.quantity || 1);
        total += subtotal;
        return { ...prod, quantity: it.quantity || 1, subtotal };
    });
    const order = {
        id: orders.length ? orders[orders.length - 1].id + 1 : 1,
        details,
        total,
        createdAt: new Date()
    };
    orders.push(order);
    res.status(201).json(order);
};

// Obtener todas las órdenes
export const getOrders = (req, res) => {
    res.json(orders);
};

// Actualizar una orden (por ejemplo, cambiar productos)
export const updateOrder = (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id == id);
    if (!order) {
        return res.status(404).json({ error: "Orden no encontrada" });
    }
    const { items } = req.body;
    if (Array.isArray(items) && items.length > 0) {
        let total = 0;
        const details = items.map(it => {
            const prod = menuItems.find(m => m.id === it.id);
            if (!prod) {
                throw new Error(`Producto con ID ${it.id} no encontrado`);
            }
            const subtotal = prod.price * (it.quantity || 1);
            total += subtotal;
            return { ...prod, quantity: it.quantity || 1, subtotal };
        });
        order.details = details;
        order.total = total;
    }
    res.json(order);
};

// Eliminar una orden
export const deleteOrder = (req, res) => {
    const { id } = req.params;
    const index = orders.findIndex(o => o.id == id);
    if (index === -1) {
        return res.status(404).json({ error: "Orden no encontrada" });
    }
    orders.splice(index, 1);
    res.json({ message: "Orden eliminada correctamente" });
};
