export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "/images/products/headphones.jpg",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Features 30-hour battery life and comfortable over-ear design.",
    category: "Electronics",
    inStock: true,
    rating: 4.5
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/images/products/smartwatch.jpg",
    description: "Advanced smartwatch with health monitoring features, GPS tracking, and water resistance. Perfect for fitness enthusiasts and busy professionals.",
    category: "Electronics",
    inStock: true,
    rating: 4.8
  },
  {
    id: 3,
    name: "Coffee Maker",
    price: 79.99,
    image: "/images/products/coffee-maker.jpg",
    description: "Programmable coffee maker for the perfect morning brew. Features auto-start timer, keep-warm function, and 12-cup capacity.",
    category: "Home & Kitchen",
    inStock: true,
    rating: 4.2
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 129.99,
    image: "/images/products/running-shoes.jpg",
    description: "Comfortable running shoes with excellent cushioning and breathable mesh upper. Designed for long-distance runners and daily workouts.",
    category: "Sports",
    inStock: false,
    rating: 4.6
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 49.99,
    image: "/images/products/laptop-stand.jpg",
    description: "Adjustable laptop stand for better ergonomics. Features multiple height settings, sturdy aluminum construction, and portable design.",
    category: "Office",
    inStock: true,
    rating: 4.3
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "/images/products/bluetooth-speaker.jpg",
    description: "Portable Bluetooth speaker with excellent sound quality and 20-hour battery life. Waterproof design perfect for outdoor adventures.",
    category: "Electronics",
    inStock: true,
    rating: 4.4
  },
  {
    id: 7,
    name: "Wireless Mouse",
    price: 34.99,
    image: "/images/products/wireless-mouse.jpg",
    description: "Ergonomic wireless mouse with precision tracking and long battery life. Perfect for work and gaming.",
    category: "Electronics",
    inStock: true,
    rating: 4.1
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 59.99,
    image: "/images/products/desk-lamp.jpg",
    description: "LED desk lamp with adjustable brightness and color temperature. Modern design with touch controls.",
    category: "Office",
    inStock: true,
    rating: 4.7
  },
  {
    id: 9,
    name: "Backpack",
    price: 79.99,
    image: "/images/products/backpack.jpg",
    description: "Durable travel backpack with multiple compartments and laptop sleeve. Water-resistant and comfortable to carry.",
    category: "Travel",
    inStock: true,
    rating: 4.5
  },
  {
    id: 10,
    name: "Water Bottle",
    price: 24.99,
    image: "/images/products/water-bottle.jpg",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    category: "Sports",
    inStock: true,
    rating: 4.8
  },
  {
    id: 11,
    name: "Phone Case",
    price: 19.99,
    image: "/images/products/phone-case.jpg",
    description: "Protective phone case with shock absorption and wireless charging compatibility. Available in multiple colors.",
    category: "Electronics",
    inStock: true,
    rating: 4.2
  },
  {
    id: 12,
    name: "Yoga Mat",
    price: 39.99,
    image: "/images/products/yoga-mat.jpg",
    description: "Premium yoga mat with excellent grip and cushioning. Non-slip surface and easy to clean.",
    category: "Sports",
    inStock: true,
    rating: 4.6
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
