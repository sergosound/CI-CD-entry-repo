import { useEffect, useState } from 'react';
import styles from './About.module.css';

export default function About() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;
    fetch('/api/console')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!isCancelled) setResult(text);
      })
      .catch((e) => {
        if (!isCancelled) setError(e.message);
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className={styles['about-page']}>
      <section className={styles['hero-section']}>
        <div className={styles['hero-content']}>
          <h1 className={styles.title}>About Our Store</h1>
          <p className={styles.subtitle}>
            Discover the story behind our passion for delivering exceptional products 
            and creating memorable shopping experiences for our customers.
          </p>
        </div>
      </section>

      <div className={styles['content-grid']}>
        <div className={styles['content-card']}>
          <span className={styles['card-icon']}>🛍️</span>
          <h3 className={styles['card-title']}>Our Mission</h3>
          <p className={styles['card-description']}>
            We are committed to providing high-quality products at competitive prices, 
            ensuring every customer finds exactly what they're looking for while enjoying 
            a seamless shopping experience.
          </p>
        </div>

        <div className={styles['content-card']}>
          <span className={styles['card-icon']}>🌟</span>
          <h3 className={styles['card-title']}>Quality Promise</h3>
          <p className={styles['card-description']}>
            Every product in our catalog is carefully curated and tested to meet our 
            high standards. We believe in quality over quantity and work with trusted 
            suppliers to bring you the best.
          </p>
        </div>

        <div className={styles['content-card']}>
          <span className={styles['card-icon']}>🚚</span>
          <h3 className={styles['card-title']}>Fast Delivery</h3>
          <p className={styles['card-description']}>
            We understand that you want your products quickly. That's why we've partnered 
            with reliable shipping companies to ensure fast and secure delivery to your doorstep.
          </p>
        </div>

        <div className={styles['content-card']}>
          <span className={styles['card-icon']}>💬</span>
          <h3 className={styles['card-title']}>Customer Support</h3>
          <p className={styles['card-description']}>
            Our dedicated support team is here to help you with any questions or concerns. 
            We pride ourselves on providing excellent customer service and quick response times.
          </p>
        </div>
      </div>

      <section className={styles['features-section']}>
        <h2 className={styles['features-title']}>Why Choose Us?</h2>
        <div className={styles['features-grid']}>
          <div className={styles['feature-item']}>
            <span className={styles['feature-icon']}>🔒</span>
            <h4 className={styles['feature-title']}>Secure Shopping</h4>
            <p className={styles['feature-description']}>
              Your data and payments are protected with industry-standard security measures.
            </p>
          </div>
          <div className={styles['feature-item']}>
            <span className={styles['feature-icon']}>↩️</span>
            <h4 className={styles['feature-title']}>Easy Returns</h4>
            <p className={styles['feature-description']}>
              Not satisfied? Return any item within 30 days for a full refund.
            </p>
          </div>
          <div className={styles['feature-item']}>
            <span className={styles['feature-icon']}>📱</span>
            <h4 className={styles['feature-title']}>Mobile Friendly</h4>
            <p className={styles['feature-description']}>
              Shop seamlessly on any device with our responsive design.
            </p>
          </div>
          <div className={styles['feature-item']}>
            <span className={styles['feature-icon']}>⭐</span>
            <h4 className={styles['feature-title']}>Customer Reviews</h4>
            <p className={styles['feature-description']}>
              Real feedback from real customers to help you make informed decisions.
            </p>
          </div>
        </div>
      </section>

      <section className={styles['contact-section']}>
        <div className={styles['contact-content']}>
          <h2 className={styles['contact-title']}>Get in Touch</h2>
          <p className={styles['contact-text']}>
            Have questions about our products or services? We'd love to hear from you. 
            Reach out to us and we'll respond as soon as possible.
          </p>
          <a href="mailto:contact@ourstore.com" className={styles['contact-button']}>
            Contact Us Today
          </a>
        </div>
      </section>

      {error && <div className={styles['error-message']}>API Error: {error}</div>}
      {result && <div className={styles['api-result']}>API Response: {result}</div>}
    </div>
  );
}
