import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cart from '@features/Cart';
import About from '@pages/About';
import Basket from '@pages/Basket';
import Checkout from '@pages/Checkout';
import Home from '@pages/Home';
import Product from '@pages/Product';
import styles from './App.module.css';

function Counter() {
  const [counter, setCounter] = useState(0);

  const adjustCounterValue = (value) => {
    if (value >= 100) return value - 100;
    if (value <= -100) return value + 100;
    return value;
  };

  const update = (delta) => {
    setCounter((prev) => adjustCounterValue(prev + delta));
  };

  return (
    <>
      <h1 className="title">
        Thank you for trying it out. <br /> Your first project is up and running
        now.
      </h1>
      <section className="counter">
        <div className="counter-info">
          <p className="counter-text">Counter is</p>
          <p className="counter-value">{counter}</p>
        </div>
        <div className="counter-interaction">
          <button onClick={() => update(1)} type="button">+1</button>
          <button onClick={() => update(2)} type="button">+2</button>
          <button onClick={() => update(-1)} type="button">-1</button>
          <button onClick={() => update(-2)} type="button">-2</button>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCartItemCount(Cart.getItemCount());
    
    // Listen for cart changes (simple polling for demo)
    const interval = setInterval(() => {
      setCartItemCount(Cart.getItemCount());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <nav className={styles.navigation}>
          <div className={styles['nav-container']}>
            <Link to="/" className={styles['nav-brand']}>
              ShopEase
            </Link>
            
            <div className={styles['nav-links']}>
              <Link to="/" className={styles['nav-link']}>
                Home
              </Link>
              <Link to="/about" className={styles['nav-link']}>
                About
              </Link>
            </div>
            
            <div className={styles['cart-container']}>
              <Link to="/basket" className={styles['cart-button']}>
                <span className={styles['cart-icon']}>🛒</span>
                <span>Basket</span>
                <span className={styles['cart-count']}>{cartItemCount}</span>
              </Link>
              
              <button 
                className={styles['mobile-menu-button']}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                ☰
              </button>
            </div>
          </div>
          
          <div className={`${styles['mobile-nav-links']} ${mobileMenuOpen ? styles.open : ''}`}>
            <Link to="/" className={styles['mobile-nav-link']} onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className={styles['mobile-nav-link']} onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/cart" className={styles['mobile-nav-link']} onClick={() => setMobileMenuOpen(false)}>
              Cart ({cartItemCount})
            </Link>
          </div>
        </nav>
        
        <main className={styles['main-content']}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
