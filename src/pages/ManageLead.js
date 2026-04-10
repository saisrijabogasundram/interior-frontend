import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import './Manage.css';

const ManageLeads = () => {
  const [leads, setLeads] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLeads();
    fetchStaff();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get('/bookings/leads/manage/');
      setLeads(res.data);
    } catch {
      console.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await API.get('/users/staff/');
      setStaff(res.data);
    } catch {
      console.error('Failed to load staff');
    }
  };

  const handleAssign = async (leadId, staffId) => {
    try {
      await API.patch(`/bookings/leads/manage/${leadId}/`, { assigned_to: staffId });
      setMessage('Staff assigned successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchLeads();
    } catch {
      console.error('Failed to assign staff');
    }
  };

  const handleStatus = async (leadId, status) => {
    try {
      await API.patch(`/bookings/leads/manage/${leadId}/`, { status });
      fetchLeads();
    } catch {
      console.error('Failed to update status');
    }
  };

  const handleDelete = async (leadId) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await API.delete(`/bookings/leads/manage/${leadId}/`);
      fetchLeads();
    } catch {
      console.error('Failed to delete lead');
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
        <h2 className="manage-title">Lead Management</h2>
        <div className="leads-count">Total: {leads.length} leads</div>
      </div>

      {message && <div className="success-box">{message}</div>}

      {loading ? (
        <div className="loading">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="empty">
          <span style={{ fontSize: '48px' }}>📋</span>
          <p>No leads yet. Leads will appear when customers submit their details.</p>
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
                  <label>Assign to Staff:</label>
                  <select
                    value={lead.assigned_to || ''}
                    onChange={(e) => handleAssign(lead.id, e.target.value)}
                    className="lead-select"
                  >
                    <option value="">-- Select Staff --</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>{s.username}</option>
                    ))}
                  </select>
                </div>

                <div className="lead-card__field">
                  <label>Status:</label>
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

              <button className="delete-btn" onClick={() => handleDelete(lead.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageLeads;