export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://picsum.photos/300/200?random=1",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    inStock: true,
    rating: 4.5
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "https://picsum.photos/300/200?random=2",
    description: "Advanced smartwatch with health monitoring features",
    category: "Electronics",
    inStock: true,
    rating: 4.8
  },
  {
    id: 3,
    name: "Coffee Maker",
    price: 79.99,
    image: "https://picsum.photos/300/200?random=3",
    description: "Programmable coffee maker for the perfect morning brew",
    category: "Home & Kitchen",
    inStock: true,
    rating: 4.2
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 129.99,
    image: "https://picsum.photos/300/200?random=4",
    description: "Comfortable running shoes with excellent cushioning",
    category: "Sports",
    inStock: false,
    rating: 4.6
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://picsum.photos/300/200?random=5",
    description: "Adjustable laptop stand for better ergonomics",
    category: "Office",
    inStock: true,
    rating: 4.3
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "https://picsum.photos/300/200?random=6",
    description: "Portable Bluetooth speaker with excellent sound quality",
    category: "Electronics",
    inStock: true,
    rating: 4.4
  }
];

export const cart = {
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
