import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import './Manage.css';

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await API.get('/users/staff/');
      setStaff(res.data);
    } catch {
      setError('Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this staff member?')) return;
    try {
      await API.delete(`/users/staff/${id}/`);
      setMessage('Staff member removed');
      setTimeout(() => setMessage(''), 3000);
      fetchStaff();
    } catch {
      setError('Failed to remove staff');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/staff/', form);
      setMessage('Staff member added successfully!');
      setTimeout(() => setMessage(''), 3000);
      setForm({ username: '', email: '', phone: '', password: '' });
      setShowForm(false);
      fetchStaff();
    } catch {
      setError('Failed to add staff member');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="manage-page">
      <div className="manage-header">
        <h2 className="manage-title">Manage Staff</h2>
        <button
          className="add-staff-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Staff'}
        </button>
      </div>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}

      {showForm && (
        <div className="staff-form-card">
          <h3 className="form-heading">Add New Staff Member</h3>
          <form onSubmit={handleSubmit} className="staff-form">
            <div className="form-row">
              <div className="form-field">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Add Staff Member
            </button>
          </form>
        </div>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="table-wrapper">
          <table className="manage-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                    No staff members found
                  </td>
                </tr>
              ) : (
                staff.map((s) => (
                  <tr key={s.id}>
                    <td>{s.username}</td>
                    <td>{s.email}</td>
                    <td>{s.phone || 'N/A'}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(s.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;