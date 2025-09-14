import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from '@features/Cart';
import styles from './Basket.module.css';

export default function Basket() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setCartItems([...Cart.items]);
      setTotal(Cart.getTotal());
      setItemCount(Cart.getItemCount());
    };

    updateCart();
    
    // Listen for cart changes
    const interval = setInterval(updateCart, 100);
    return () => clearInterval(interval);
  }, []);

  const removeItem = (productId) => {
    Cart.removeItem(productId);
    setCartItems([...Cart.items]);
    setTotal(Cart.getTotal());
    setItemCount(Cart.getItemCount());
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    Cart.updateQuantity(productId, quantity);
    setCartItems([...Cart.items]);
    setTotal(Cart.getTotal());
    setItemCount(Cart.getItemCount());
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles['cart-page']}>
        <div className={styles['empty-cart']}>
          <h2 className={styles['empty-title']}>Your Basket is Empty</h2>
          <p className={styles['empty-message']}>
            Looks like you haven't added any items to your basket yet.
          </p>
          <Link to="/" className={styles['continue-shopping-btn']}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-header']}>
        <h2 className={styles['cart-title']}>Shopping Basket</h2>
        <p className={styles['cart-subtitle']}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your basket
        </p>
      </div>

      <div className={styles['cart-content']}>
        <div className={styles['cart-items']}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles['cart-item']}>
              <div className={styles['item-image']}>
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className={styles['item-details']}>
                <h3 className={styles['item-name']}>{item.name}</h3>
                <p className={styles['item-description']}>{item.description}</p>
                <div className={styles['item-price']}>
                  ${item.price.toFixed(2)} each
                </div>
              </div>

              <div className={styles['item-controls']}>
                <div className={styles['quantity-controls']}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className={styles['quantity-btn']}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className={styles['quantity']}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={styles['quantity-btn']}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                
                <div className={styles['item-total']}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className={styles['remove-btn']}
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles['cart-summary']}>
          <div className={styles['summary-header']}>
            <h3 className={styles['summary-title']}>Order Summary</h3>
          </div>
          
          <div className={styles['summary-details']}>
            <div className={styles['summary-row']}>
              <span>Items ({itemCount})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles['summary-row']}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles['summary-row']}>
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className={styles['summary-divider']}></div>
            <div className={styles['summary-row']}>
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </div>
          
          <div className={styles['summary-actions']}>
            <Link to="/" className={styles['continue-shopping-btn']}>
              Continue Shopping
            </Link>
            <Link to="/checkout" className={styles['checkout-btn']}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}