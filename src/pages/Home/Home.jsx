import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '@features/Cart';
import { products } from '../../app/store';
import styles from './Home.module.css';

export default function Home() {
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product) => {
    Cart.addItem(product);
    setAddedToCart({ ...addedToCart, [product.id]: true });
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [product.id]: false });
    }, 2000);
  };

  return (
    <div className={styles['home-page']}>
      <h2 className={styles.title}>Welcome to Our Store</h2>
      <p className={styles.subtitle}>Discover amazing products at great prices</p>
      
      <div className={styles['products-grid']}>
        {products.map((product) => (
          <div key={product.id} className={styles['product-card']}>
            <div className={styles['product-image']}>
              <img src={product.image} alt={product.name} />
              <div className={styles['product-overlay']}>
                <Link to={`/product/${product.id}`} className={styles['view-product-btn']}>
                  View Details
                </Link>
              </div>
            </div>
            
            <div className={styles['product-info']}>
              <h3 className={styles['product-name']}>{product.name}</h3>
              <div className={styles['product-rating']}>
                <span className={styles.stars}>★</span>
                <span className={styles['rating-value']}>{product.rating}</span>
              </div>
              <p className={styles['product-description']}>{product.description}</p>
              <div className={styles['product-price']}>${product.price.toFixed(2)}</div>
              <div className={styles['product-category']}>{product.category}</div>
              
              <div className={styles['product-actions']}>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`${styles['add-to-cart-btn']} ${addedToCart[product.id] ? styles.added : ''} ${!product.inStock ? styles['out-of-stock'] : ''}`}
                >
                  {!product.inStock 
                    ? 'Out of Stock' 
                    : addedToCart[product.id] 
                      ? 'Added!' 
                      : 'Add to Cart'
                  }
                </button>
                <Link to={`/product/${product.id}`} className={styles['view-details-btn']}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
