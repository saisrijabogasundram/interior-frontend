import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import './Manage.css';

const StaffLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get('/bookings/leads/manage/');
      const user = JSON.parse(localStorage.getItem('user'));
      const myLeads = res.data.filter((lead) => lead.assigned_to === user?.id);
      setLeads(myLeads);
    } catch {
      console.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (leadId, status) => {
    try {
      await API.patch(`/bookings/leads/manage/${leadId}/`, { status });
      setMessage('Status updated!');
      setTimeout(() => setMessage(''), 3000);
      fetchLeads();
    } catch {
      console.error('Failed to update status');
    }
  };

  const statusColors = {
    new: '#3B82F6',
    contacted: '#F59E0B',
    confirmed: '#10B981',
    cancelled: '#EF4444',
  };

  return (
    <div className="manage-page">
      <div className="manage-header">
        <h2 className="manage-title">My Assigned Leads</h2>
        <div className="leads-count">Total: {leads.length} leads</div>
      </div>

      {message && <div className="success-box">{message}</div>}

      {loading ? (
        <div className="loading">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="empty">
          <span style={{ fontSize: '48px' }}>📋</span>
          <p>No leads assigned to you yet.</p>
        </div>
      ) : (
        <div className="leads-grid">
          {leads.map((lead) => (
            <div className="lead-card" key={lead.id}>
              <div className="lead-card__header">
                <div>
                  <h3 className="lead-card__name">{lead.name}</h3>
                  <span className="lead-card__phone">📞 {lead.phone}</span>
                </div>
                <span
                  className="lead-status-badge"
                  style={{ background: statusColors[lead.status] }}
                >
                  {lead.status}
                </span>
              </div>

              {lead.email && <p className="lead-card__detail">✉️ {lead.email}</p>}
              {lead.message && <p className="lead-card__detail">💬 {lead.message}</p>}
              <p className="lead-card__detail">📅 {new Date(lead.created_at).toLocaleDateString()}</p>

              <div className="lead-card__actions">
                <div className="lead-card__field">
                  <label>Update Status:</label>
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatus(lead.id, e.target.value)}
                    className="lead-select"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <a
                 href={`tel:${lead.phone}`}
                target="_self"
                rel="noopener noreferrer"
                className="call-btn"
                >
                    📞 Call Customer
                </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffLeads;