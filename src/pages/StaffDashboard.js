import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FiCalendar, FiPackage, FiUsers, FiCheckCircle } from 'react-icons/fi';
import './StaffDashboard.css';

const STATUS_CHOICES = ['pending', 'confirmed', 'cancelled', 'completed'];

const StaffDashboard = () => {
  const navigate = useNavigate();

  const [bookings, setBookings]   = useState([]);
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [message, setMessage]     = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [bookingsRes, productsRes] = await Promise.all([
        API.get('/bookings/manage/'),
        API.get('/products/'),
      ]);
      setBookings(bookingsRes.data);
      setProducts(productsRes.data.slice(0, 5));
    } catch {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/bookings/manage/${id}/`, { status: newStatus });
      setMessage('Booking status updated!');
      fetchAll();
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setError('Failed to update booking');
    }
  };

 
  const countByStatus = (status) =>
    bookings.filter((b) => b.status === status).length;

  const statCards = [
    { label: 'Pending',   value: countByStatus('pending'),   icon: '⏳', bg: '#fef3c7', color: '#92400e' },
    { label: 'Confirmed', value: countByStatus('confirmed'), icon: '✅', bg: '#d1fae5', color: '#065f46' },
    { label: 'Cancelled', value: countByStatus('cancelled'), icon: '❌', bg: '#fee2e2', color: '#991b1b' },
    { label: 'Completed', value: countByStatus('completed'), icon: '🎉', bg: '#dbeafe', color: '#1e40af' },
  ];

  const quickLinks = [
    { icon: '📅', bg: '#e8f5f0', color: '#1a4a3a', label: 'Manage Bookings',  sub: 'View & update all bookings', path: '/staff/bookings'  },
    { icon: '📦', bg: '#fff3e8', color: '#d97706', label: 'Manage Products',   sub: 'Add, edit, remove products', path: '/staff/products'  },
    { icon: '🎨', bg: '#e8f0ff', color: '#4f46e5', label: 'Manage Designers',  sub: 'View & remove designers',    path: '/staff/designers' },
  ];

  return (
    <div className="staff-dashboard">

      
      <div className="staff-hero">
        <div className="staff-hero__left">
          <h1>Staff Dashboard</h1>
          <p>Manage bookings, products and designers</p>
        </div>
        <div className="staff-hero__right">
          <button className="staff-hero__btn" onClick={() => navigate('/staff/bookings')}>
            <FiCalendar size={15} /> Bookings
          </button>
          <button className="staff-hero__btn primary" onClick={() => navigate('/staff/products')}>
            <FiPackage size={15} /> Products
          </button>
        </div>
      </div>

      <div className="staff-body">

        {error   && <div className="staff-error">{error}</div>}
        {message && <div className="staff-success">{message}</div>}

        {loading ? (
          <div className="staff-loading">⏳ Loading dashboard...</div>
        ) : (
          <>
            
            <div className="staff-stats-grid">
              {statCards.map((card, i) => (
                <div className="staff-stat-card" key={i}>
                  <div
                    className="staff-stat-card__icon"
                    style={{ background: card.bg, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <div className="staff-stat-card__info">
                    <strong style={{ color: card.color }}>{card.value}</strong>
                    <span>{card.label} Bookings</span>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="staff-grid">

             
              <div className="staff-panel">
                <div className="staff-panel__head">
                  <span className="staff-panel__title">📅 All Bookings</span>
                  <button
                    className="staff-panel__link"
                    onClick={() => navigate('/staff/bookings')}
                  >
                    Manage All →
                  </button>
                </div>
                <div className="staff-panel__body" style={{ padding: 0 }}>
                  {bookings.length === 0 ? (
                    <div className="staff-loading">No bookings found</div>
                  ) : (
                    <table className="staff-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Budget</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 8).map((b) => (
                          <tr key={b.id}>
                            <td>#{b.id}</td>
                            <td>{b.customer}</td>
                            <td>{b.visit_date}</td>
                            <td>{b.budget_range}</td>
                            <td>
                              <select
                                className={`staff-status-select ${b.status}`}
                                value={b.status}
                                onChange={(e) =>
                                  handleStatusChange(b.id, e.target.value)
                                }
                              >
                                {STATUS_CHOICES.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div className="staff-panel">
                  <div className="staff-panel__head">
                    <span className="staff-panel__title">⚡ Quick Actions</span>
                  </div>
                  <div className="staff-panel__body">
                    <div className="staff-quick-links">
                      {quickLinks.map((link, i) => (
                        <button
                          key={i}
                          className="staff-quick-btn"
                          onClick={() => navigate(link.path)}
                        >
                          <div
                            className="staff-quick-icon"
                            style={{ background: link.bg, color: link.color }}
                          >
                            {link.icon}
                          </div>
                          <div className="staff-quick-text">
                            <strong>{link.label}</strong>
                            <span>{link.sub}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="staff-panel">
                  <div className="staff-panel__head">
                    <span className="staff-panel__title">📦 Products</span>
                    <button
                      className="staff-panel__link"
                      onClick={() => navigate('/staff/products')}
                    >
                      Manage →
                    </button>
                  </div>
                  <div className="staff-panel__body">
                    {products.length === 0 ? (
                      <div className="staff-loading">No products found</div>
                    ) : (
                      <div className="staff-products-list">
                        {products.map((p) => (
                          <div className="staff-product-item" key={p.id}>
                            <div>
                              <div className="staff-product-item__name">{p.name}</div>
                              <div className="staff-product-item__meta">{p.category}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div className="staff-product-item__price">
                                ₹{Number(p.price).toLocaleString()}
                              </div>
                              <span
                                className={`staff-product-item__stock ${p.stock > 0 ? 'in' : 'out'}`}
                              >
                                {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;