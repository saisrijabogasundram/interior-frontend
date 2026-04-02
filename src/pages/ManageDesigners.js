import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import './Manage.css';

const ManageDesigners = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      const res = await API.get('/users/designers/');
      setDesigners(res.data);
    } catch {
      setError('Failed to load designers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this designer?')) return;
    try {
      await API.delete(`/users/designers/${id}/`);
      setMessage('Designer removed');
      fetchDesigners();
    } catch {
      setError('Failed to remove designer');
    }
  };

  return (
    <div className="manage-page">
      <h2 className="manage-title">Manage Designers</h2>

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
              {designers.map((d) => (
                <tr key={d.id}>
                  <td>{d.username}</td>
                  <td>{d.email}</td>
                  <td>{d.phone || 'N/A'}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(d.id)}>
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

export default ManageDesigners;