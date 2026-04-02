import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import './Manage.css';

const STATUS_CHOICES = ['pending', 'confirmed', 'cancelled', 'completed'];

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/bookings/manage/');
      setBookings(res.data);
    } catch {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/bookings/manage/${id}/`, { status: newStatus });
      setMessage('Booking status updated');
      fetchBookings();
    } catch {
      setError('Failed to update booking');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await API.delete(`/bookings/manage/${id}/`);
      setMessage('Booking deleted');
      fetchBookings();
    } catch {
      setError('Failed to delete booking');
    }
  };

  return (
    <div className="manage-page">
      <h2 className="manage-title">Manage Bookings</h2>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-wrapper">
          <table className="manage-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.customer}</td>
                  <td>{b.location}</td>
                  <td>{b.visit_date}</td>
                  <td>{b.time_slot}</td>
                  <td>{b.budget_range}</td>
                  <td>
                    <select
                      className={`status-select ${b.status}`}
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    >
                      {STATUS_CHOICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(b.id)}
                    >
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

export default ManageBookings;