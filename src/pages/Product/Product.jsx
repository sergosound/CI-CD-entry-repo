import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, cart } from '../../app/store';
import styles from './Product.module.css';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        cart.addItem(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (!product) {
    return (
      <div className={styles['product-page']}>
        <h1 className={styles.title}>Product Not Found</h1>
        <Link to="/" className={styles['back-btn']}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={styles['product-page']}>
      <div className={styles['product-container']}>
        <div className={styles['product-image']}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles['product-details']}>
          <h1 className="product-name">{product.name}</h1>
          <div className="product-rating">
            <span className="stars">★</span>
            <span className="rating-value">{product.rating}</span>
            <span className="rating-text">({product.rating}/5)</span>
          </div>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-category">
            <strong>Category:</strong> {product.category}
          </div>
          <div className="product-stock">
            <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <p className="product-description">{product.description}</p>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="quantity-input"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
            >
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            
            <Link to="/cart" className="view-cart-btn">
              View Cart
            </Link>
          </div>
        </div>
      </div>
      
      <div className="product-navigation">
        <Link to="/" className="back-btn">← Back to Products</Link>
      </div>
    </div>
  );
}
