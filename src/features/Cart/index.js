const cart = {
  items: [],
  addItem: (product) => {
    const existingItem = cart.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ ...product, quantity: 1 });
    }
  },
  removeItem: (productId) => {
    cart.items = cart.items.filter(item => item.id !== productId);
  },
  updateQuantity: (productId, quantity) => {
    const item = cart.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  },
  getTotal: () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  getItemCount: () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }
};

export default cart;