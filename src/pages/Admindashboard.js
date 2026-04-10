import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import {
  FiUsers,
  FiUserCheck,
  FiShield,
  FiTrendingUp,
  FiSettings,
  FiTrash2,
  FiPackage,
  FiCalendar
} from 'react-icons/fi';
import './Admindashboard.css';

const STATUS_CHOICES = ['pending', 'confirmed', 'cancelled', 'completed'];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats]       = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [message, setMessage]   = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        API.get('/users/reports/'),
        API.get('/bookings/manage/'),
      ]);
      setStats(statsRes.data);
      setBookings(bookingsRes.data.slice(0, 8));
    } catch {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/bookings/manage/${id}/`, { status: newStatus });
      setMessage('Booking updated!');
      fetchAll();
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setError('Failed to update booking');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await API.delete(`/bookings/manage/${id}/`);
      setMessage('Booking deleted!');
      fetchAll();
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setError('Failed to delete booking');
    }
  };

  const statCards = stats ? [
    { label: 'Total Users',     value: stats.total_users,     icon: <FiUsers />,     bg: '#e8f5f0', color: '#1a4a3a' },
    { label: 'Customers',       value: stats.total_customers, icon: <FiUserCheck />, bg: '#e8f0ff', color: '#4f46e5' },
    { label: 'Designers',       value: stats.total_designers, icon: <FiUserCheck />, bg: '#fff3e8', color: '#d97706' },
    { label: 'Staff Members',   value: stats.total_staff,     icon: <FiShield />,    bg: '#e8f5ff', color: '#2563eb' },
    { label: 'Admins',          value: stats.total_admins,    icon: <FiShield />,    bg: '#fee8e8', color: '#dc2626' },
  ] : [];

  const quickLinks = [
    { icon: '📅', bg: '#e8f5f0', color: '#1a4a3a', label: 'Manage Bookings',  sub: 'View & update all bookings',  path: '/staff/bookings'  },
    { icon: '📦', bg: '#fff3e8', color: '#d97706', label: 'Manage Products',   sub: 'Add, edit, remove products',  path: '/staff/products'  },
    { icon: '🎨', bg: '#e8f0ff', color: '#4f46e5', label: 'Manage Designers',  sub: 'View & remove designers',     path: '/staff/designers' },
    { icon: '👥', bg: '#fee8e8', color: '#dc2626', label: 'Manage Staff',      sub: 'Add or remove staff members', path: '/admin/staff'     },
    { icon: '📊', bg: '#f0f0ff', color: '#7c3aed', label: 'Reports',           sub: 'View full analytics',         path: '/admin/reports'   },
    { icon: '📋', bg: '#e8fff0', color: '#0f766e', label: 'Manage Leads',      sub: 'View & assign customer leads', path: '/admin/leads'    },
  ];

  return (
    <div className="admin-dashboard">

      <div className="admin-hero">
        <div className="admin-hero__left">
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <div className="admin-hero__right">
          <button className="admin-hero__btn" onClick={() => navigate('/admin/reports')}>
            <FiTrendingUp size={15} /> Reports
          </button>
          <button className="admin-hero__btn primary" onClick={() => navigate('/admin/staff')}>
            <FiSettings size={15} /> Manage Staff
          </button>
        </div>
      </div>

      <div className="admin-cards">
        <div className="card">
          <FiPackage size={24} />
          <h3>Products</h3>
          <p>Manage all products</p>
        </div>
        <div className="card">
          <FiCalendar size={24} />
          <h3>Bookings</h3>
          <p>View all bookings</p>
        </div>
      </div>

      <div className="admin-body">

        {error   && <div className="dash-error">{error}</div>}
        {message && <div className="dash-error" style={{ background: '#d1fae5', color: '#065f46' }}>{message}</div>}

        {loading ? (
          <div className="dash-loading">⏳ Loading dashboard...</div>
        ) : (
          <>
            <div className="stats-grid">
              {statCards.map((card, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-card__icon" style={{ background: card.bg, color: card.color }}>
                    {card.icon}
                  </div>
                  <div className="stat-card__info">
                    <strong style={{ color: card.color }}>{card.value}</strong>
                    <span>{card.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-grid">

              <div className="panel">
                <div className="panel__head">
                  <span className="panel__title">📅 Recent Bookings</span>
                  <button className="panel__link" onClick={() => navigate('/staff/bookings')}>
                    View All →
                  </button>
                </div>
                <div className="panel__body" style={{ padding: 0 }}>
                  {bookings.length === 0 ? (
                    <div className="dash-loading">No bookings yet</div>
                  ) : (
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Budget</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((b) => (
                          <tr key={b.id}>
                            <td>#{b.id}</td>
                            <td>{b.customer}</td>
                            <td>{b.visit_date}</td>
                            <td>{b.budget_range}</td>
                            <td>
                              <select
                                className={`status-badge ${b.status}`}
                                value={b.status}
                                onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                style={{ border: 'none', cursor: 'pointer', fontWeight: 700 }}
                              >
                                {STATUS_CHOICES.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <button
                                onClick={() => handleDelete(b.id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}
                              >
                                <FiTrash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="panel">
                <div className="panel__head">
                  <span className="panel__title">⚡ Quick Actions</span>
                </div>
                <div className="panel__body">
                  <div className="quick-links">
                    {quickLinks.map((link, i) => (
                      <button
                        key={i}
                        className="quick-link-btn"
                        onClick={() => navigate(link.path)}
                      >
                        <div
                          className="quick-link-icon"
                          style={{ background: link.bg, color: link.color }}
                        >
                          {link.icon}
                        </div>
                        <div className="quick-link-text">
                          <strong>{link.label}</strong>
                          <span>{link.sub}</span>
                        </div>
                      </button>
                    ))}
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

export default AdminDashboard;