import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { FiUsers, FiCalendar, FiUserCheck, FiShield } from 'react-icons/fi';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get('/users/reports/');
      setStats(res.data);
    } catch {
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const cards = stats ? [
    { label: 'Total Users', value: stats.total_users, icon: <FiUsers />, color: '#6366f1' },
    { label: 'Total Customers', value: stats.total_customers, icon: <FiUserCheck />, color: '#10b981' },
    { label: 'Total Designers', value: stats.total_designers, icon: <FiUserCheck />, color: '#f59e0b' },
    { label: 'Total Staff', value: stats.total_staff, icon: <FiShield />, color: '#3b82f6' },
    { label: 'Total Admins', value: stats.total_admins, icon: <FiShield />, color: '#ef4444' },
  ] : [];

  return (
    <div className="manage-page">
      <h2 className="manage-title">Reports & Analytics</h2>

      {error && <div className="error-box">{error}</div>}

      {loading ? <p>Loading...</p> : (
        <div className="stats-grid">
          {cards.map((card) => (
            <div className="stat-card" key={card.label}
              style={{ borderTop: `4px solid ${card.color}` }}>
              <div style={{ color: card.color, fontSize: '2rem' }}>{card.icon}</div>
              <div>
                <p style={{ fontSize: '2rem', fontWeight: 700 }}>{card.value}</p>
                <p style={{ color: '#64748b' }}>{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;