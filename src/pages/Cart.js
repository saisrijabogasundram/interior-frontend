import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Cart = () => {
  const [items, setItems] = useState([]);        
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      
  useEffect(() => {
    fetchCart();
  }, []);
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get('/products/cart/');
      // backend returns {items, count}
      setItems(res.data.items);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setError('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const removeItem = async (id) => {
    try {
      await API.delete(`/products/cart/${id}/`); // optional: remove from backend
      setItems(items.filter(item => item.id !== id)); // update UI immediately
    } catch (err) {
      console.error('Failed to remove item:', err);
      setError('Failed to remove item. Please try again.');
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = items.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0
  );

  if (loading) {
    return <h2 style={{ textAlign: 'center' }}>Loading cart...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: 'center', color: 'red' }}>{error}</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart 🛒</h2>

      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '15px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px'
              }}
            >
              
              <img
                src={item.product_image}
                alt={item.product_name}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />

              
              <div>
                <h4>{item.product_name}</h4>
                <p>₹ {item.product_price}</p>
                <p>Quantity: {item.quantity}</p>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: '#E74C3C',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          
          <h3>Total: ₹ {totalPrice.toLocaleString()}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;