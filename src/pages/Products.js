import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { FiShoppingCart, FiZap, FiFilter } from 'react-icons/fi';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [processingId, setProcessingId] = useState(null);

  // ✅ Fixed useEffect
  useEffect(() => {
    // ✅ Fixed API handling
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = category ? { category } : {};
        const res = await API.get('/products/', { params });

        // 🔥 IMPORTANT FIX
        setProducts(res.data.results || res.data || []);

      } catch (err) {
        console.log(err);
        setProducts([]); // fallback safety
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const addToCart = async (id) => {
    setProcessingId(id);
    try {
      await API.post('/products/cart/', { product: id, quantity: 1 });
      showMsg('Added to cart successfully!');
    } catch {
      showMsg('Failed to add to cart.');
    } finally {
      setProcessingId(null);
    }
  };

  const placeOrder = async (id) => {
    setProcessingId(id);
    try {
      await API.post('/products/orders/', { product: id, quantity: 1 });
      showMsg('Order placed successfully!');
    } catch {
      showMsg('Failed to place order.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>

      {/* Hero */}
      <div className="hero">
        <h1 className="hero-title">Product Marketplace</h1>
        <p className="hero-sub">
          Shop premium furniture, lighting, and décor for your home
        </p>
      </div>

      {/* Toast */}
      {message && <div className="toast">{message}</div>}

      <div className="container">

        {/* Filters */}
        <div className="toolbar">
          <div className="filter-row">
            <FiFilter color="#1a4a3a" />
            {['', 'furniture', 'lighting', 'decor', 'modular', 'flooring'].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat === ''
                  ? 'All Products'
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="loading">
            <span style={{ fontSize: '36px' }}>⏳</span>
            <p>Loading products...</p>
          </div>

        ) : (products || []).length === 0 ? (
          <div className="empty">
            <span style={{ fontSize: '48px' }}>🛋️</span>
            <p>No products found in this category.</p>
          </div>

        ) : (
          <div className="grid">
            {(products || []).map((p) => (
              <div key={p.id} className="card">

                {p?.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="product-img"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                ) : (
                  <div className="placeholder">🛋️</div>
                )}

                <div className="info">
                  <span className="badge">{p?.category}</span>

                  <h3 className="name">{p?.name}</h3>

                  {p?.description && (
                    <p className="desc">{p.description}</p>
                  )}

                  <div className="price-row">
                    <span className="price">
                      ₹ {Number(p?.price || 0).toLocaleString()}
                    </span>
                    <span className="stock">
                      {p?.stock > 0
                        ? `${p.stock} in stock`
                        : 'Out of stock'}
                    </span>
                  </div>

                  <div className="buttons">
                    <button
                      className="cart-btn"
                      onClick={() => addToCart(p.id)}
                      disabled={p?.stock === 0 || processingId === p.id}
                    >
                      <FiShoppingCart size={16} />
                      {processingId === p.id ? ' Adding...' : ' Add to Cart'}
                    </button>

                    <button
                      className="order-btn"
                      onClick={() => placeOrder(p.id)}
                      disabled={p?.stock === 0 || processingId === p.id}
                    >
                      <FiZap size={16} />
                      {processingId === p.id ? ' Processing...' : ' Buy Now'}
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;