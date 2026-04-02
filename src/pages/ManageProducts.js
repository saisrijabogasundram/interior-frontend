import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import './Manage.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products/');
      setProducts(res.data);
    } catch {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products/', form);
      setMessage('Product added successfully');
      setShowForm(false);
      setForm({ name: '', description: '', price: '', category: '', stock: '' });
      fetchProducts();
    } catch {
      setError('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}/`);
      setMessage('Product deleted');
      fetchProducts();
    } catch {
      setError('Failed to delete product');
    }
  };

  return (
    <div className="manage-page">
      <div className="manage-header">
        <h2 className="manage-title">Manage Products</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}

      {showForm && (
        <form className="add-form" onSubmit={handleAdd}>
          <input className="input-field" placeholder="Product Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input-field" placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input-field" placeholder="Price" type="number" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input className="input-field" placeholder="Category" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="input-field" placeholder="Stock" type="number" value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          <button className="btn-primary" type="submit">Add Product</button>
        </form>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="table-wrapper">
          <table className="manage-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;