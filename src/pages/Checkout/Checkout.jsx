import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from '@features/Cart';
import styles from './Checkout.module.css';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    setCartItems(Cart.items);
    setTotal(Cart.getTotal());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and show success
    Cart.items = [];
    setOrderComplete(true);
    setIsProcessing(false);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className={styles['checkout-page']}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles['empty-cart']}>
          <p>Your cart is empty</p>
          <Link to="/" className={styles['continue-shopping-btn']}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className={styles['checkout-page']}>
        <div className={styles['order-complete']}>
          <h1 className={styles.title}>Order Complete!</h1>
          <span className={styles['success-icon']}>✓</span>
          <p>Thank you for your purchase! Your order has been processed successfully.</p>
          <p>You will receive a confirmation email shortly.</p>
          <Link to="/" className={styles['continue-shopping-btn']}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['checkout-page']}>
      <h1 className={styles.title}>Checkout</h1>
      
      <div className={styles['checkout-container']}>
        <div className={styles['checkout-form']}>
          <form onSubmit={handleSubmit}>
            <div className={styles['form-section']}>
              <h3 className={styles['section-title']}>Shipping Information</h3>
              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label htmlFor="firstName" className={styles['form-label']}>First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles['form-input']}
                    required
                  />
                </div>
                <div className={styles['form-group']}>
                  <label htmlFor="lastName" className={styles['form-label']}>Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles['form-input']}
                    required
                  />
                </div>
              </div>
              
              <div className={styles['form-group']}>
                <label htmlFor="email" className={styles['form-label']}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles['form-input']}
                  required
                />
              </div>
              
              <div className={styles['form-group']}>
                <label htmlFor="address" className={styles['form-label']}>Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={styles['form-input']}
                  required
                />
              </div>
              
              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label htmlFor="city" className={styles['form-label']}>City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={styles['form-input']}
                    required
                  />
                </div>
                <div className={styles['form-group']}>
                  <label htmlFor="zipCode" className={styles['form-label']}>ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={styles['form-input']}
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles['form-section']}>
              <h3 className={styles['section-title']}>Payment Information</h3>
              <div className={styles['form-group']}>
                <label htmlFor="cardNumber" className={styles['form-label']}>Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className={styles['form-input']}
                  required
                />
              </div>
              
              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label htmlFor="expiryDate" className={styles['form-label']}>Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className={styles['form-input']}
                    required
                  />
                </div>
                <div className={styles['form-group']}>
                  <label htmlFor="cvv" className={styles['form-label']}>CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className={styles['form-input']}
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className={styles['place-order-btn']}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className={styles['order-summary']}>
          <h3 className={styles['summary-title']}>Order Summary</h3>
          <div className={styles['order-items']}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles['order-item']}>
                <img src={item.image} alt={item.name} className={styles['order-item-image']} />
                <div className={styles['order-item-info']}>
                  <div className={styles['order-item-name']}>{item.name}</div>
                  <div className={styles['order-item-quantity']}>Qty: {item.quantity}</div>
                </div>
                <div className={styles['order-item-price']}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className={styles['order-total']}>
            <div className={styles['total-line']}>
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles['total-line']}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className={styles['total-line']}>
              <span>Tax:</span>
              <span>$0.00</span>
            </div>
            <div className={styles['total-divider']}></div>
            <div className={styles['total-line']}>
              <span className={styles['total-label']}>Total:</span>
              <span className={styles['total-amount']}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
