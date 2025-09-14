import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cart } from '../../app/store';
import styles from './Cart.module.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartItems(cart.items);
    setTotal(cart.getTotal());
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      cart.removeItem(productId);
    } else {
      cart.updateQuantity(productId, newQuantity);
    }
    setCartItems([...cart.items]);
    setTotal(cart.getTotal());
  };

  const removeItem = (productId) => {
    cart.removeItem(productId);
    setCartItems([...cart.items]);
    setTotal(cart.getTotal());
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles['cart-page']}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <div className={styles['empty-cart']}>
          <span className={styles['empty-cart-icon']}>🛒</span>
          <p>Your cart is empty</p>
          <Link to="/" className={styles['continue-shopping-btn']}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['cart-page']}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className={styles['cart-items']}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles['cart-item']}>
            <img src={item.image} alt={item.name} className={styles['item-image']} />
            <div className={styles['item-details']}>
              <h3 className={styles['item-name']}>{item.name}</h3>
              <p className={styles['item-price']}>${item.price.toFixed(2)}</p>
              <div className={styles['quantity-controls']}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className={styles['quantity-btn']}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className={styles['quantity-btn']}
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className={styles['remove-btn']}
              >
                Remove
              </button>
            </div>
            <div className={styles['item-total']}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className={styles['cart-summary']}>
        <div className={styles.total}>
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
        <div className={styles['cart-actions']}>
          <Link to="/" className={styles['continue-shopping-btn']}>
            Continue Shopping
          </Link>
          <Link to="/checkout" className={styles['checkout-btn']}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
