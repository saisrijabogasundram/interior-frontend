import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      fetchStaff();
    } catch {
      setError('Failed to remove staff');
    }
  };

  return (
    <div className="manage-page">
      <h2 className="manage-title">Manage Staff</h2>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}

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
              {staff.map((s) => (
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;