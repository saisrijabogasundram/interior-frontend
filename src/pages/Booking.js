import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import API from '../api/axios';
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi';
import './Booking.css';

const CalendarPicker = ({ value, onChange }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  const firstDay = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();

  const selected = value ? new Date(value + 'T00:00:00') : null;

  const handleDayClick = (d) => {
    const date = new Date(current.getFullYear(), current.getMonth(), d);
    const formatted = date.toISOString().split('T')[0];
    onChange(formatted);
  };

  const prevMonth = () => {
    const prev = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) setCurrent(prev);
  };

  const nextMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));

  return (
    <div style={{ maxWidth: '340px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <button type="button" onClick={prevMonth} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '16px' }}>‹</button>
        <span style={{ fontWeight: 500 }}>{months[current.getMonth()]} {current.getFullYear()}</span>
        <button type="button" onClick={nextMonth} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer', fontSize: '16px' }}>›</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {days.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '11px', color: '#888', padding: '4px 0' }}>{d}</div>
        ))}
        {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const d = i + 1;
          const date = new Date(current.getFullYear(), current.getMonth(), d);
          const isPast = date < today;
          const isSelected = selected && date.toDateString() === selected.toDateString();
          const isToday = date.toDateString() === today.toDateString();
          return (
            <div
              key={d}
              onClick={() => !isPast && handleDayClick(d)}
              style={{
                textAlign: 'center',
                padding: '7px 4px',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: isPast ? 'not-allowed' : 'pointer',
                color: isPast ? '#ccc' : isSelected ? '#fff' : '#333',
                background: isSelected ? '#534AB7' : 'transparent',
                border: isSelected ? '1px solid #534AB7' : isToday ? '1px solid #ccc' : '1px solid transparent',
                fontWeight: isSelected ? 500 : 400,
              }}
            >
              {d}
            </div>
          );
        })}
      </div>

      {selected && (
        <div style={{ marginTop: '12px', padding: '10px', background: '#f5f5f5', borderRadius: '8px', fontSize: '13px' }}>
          Selected: <strong>{selected.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
        </div>
      )}
    </div>
  );
};

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [designer, setDesigner] = useState(null);
  const [loadingDesigner, setLoadingDesigner] = useState(true);

  const [form, setForm] = useState({
    visit_date: '',
    time_slot: '',
    location: '',
    budget_range: '',
    requirements: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const res = await API.get(`/bookings/designers/${id}/`);
        setDesigner(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load designer details');
      } finally {
        setLoadingDesigner(false);
      }
    };
    fetchDesigner();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.visit_date) {
      setError('Please select a visit date');
      return;
    }

    if (!form.time_slot) {
      setError('Please select a time slot');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await API.post('/bookings/create/', {
        ...form,
        designer: id,
        booking_date: new Date().toISOString().split('T')[0],
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div>
        
        <div className="success-page">
          <div className="success-card">
            <FiCheckCircle size={64} color="#4A1A6B" />
            <h2 className="success-title">Booking Confirmed!</h2>
            <p className="success-text">
              Your site visit has been booked successfully. Our designer will contact you shortly.
            </p>
            <div className="success-buttons">
              <button className="btn-primary" onClick={() => navigate('/projects')}>
                View My Projects
              </button>
              <button className="btn-secondary" onClick={() => navigate('/designers')}>
                Back to Designers
              </button>
            </div>
          </div>
        </div>
        
      </div>
    );
  }

  return (
    <div>
      

      <div className="booking-hero">
        <h1 className="booking-hero-title">Book a Site Visit</h1>
        <p className="booking-hero-sub">
          Schedule an in-person consultation with your designer
        </p>
      </div>

      <div className="booking-container">
        <div className="booking-grid">

          {loadingDesigner ? (
            <p>Loading designer...</p>
          ) : designer && (
            <div className="designer-side-card">
              <div className="designer-side-header">
                <div className="designer-side-avatar">
                  {designer.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="designer-side-name">{designer.username}</h3>
                  <p className="designer-side-spec">{designer.specialization}</p>
                </div>
              </div>

              <div className="designer-side-stats">
                <div className="d-stat">
                  <span className="d-stat-label">Experience</span>
                  <span className="d-stat-value">{designer.experience_years} Years</span>
                </div>
                <div className="d-stat">
                  <span className="d-stat-label">Rating</span>
                  <span className="d-stat-value">⭐ {designer.rating || 4.5}/5</span>
                </div>
              </div>

              {designer.bio && (
                <p className="designer-side-bio">{designer.bio}</p>
              )}

              <div className="expect-box">
                <h4 className="expect-title">What to expect</h4>
                {[
                  'In-person site visit at your home',
                  'Detailed space measurement',
                  'Design consultation & ideas',
                  'Cost estimation & timeline',
                  'No commitment required'
                ].map((item) => (
                  <div key={item} className="expect-item">
                    <FiCheckCircle size={14} color="#4A1A6B" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="booking-form-card">
            <h2 className="booking-form-title">Schedule Your Visit</h2>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="booking-form">

              <div className="booking-field">
                <label className="booking-label">
                  <FiCalendar size={16} /> Visit Date
                </label>
                <CalendarPicker
                  value={form.visit_date}
                  onChange={(date) => setForm({ ...form, visit_date: date })}
                />
              </div>

              <div className="booking-field">
                <label className="booking-label">
                  <FiClock size={16} /> Time Slot
                </label>
                <div className="time-slots">
                  {[
                    { value: 'morning', label: 'Morning', time: '9AM - 12PM' },
                    { value: 'afternoon', label: 'Afternoon', time: '12PM - 4PM' },
                    { value: 'evening', label: 'Evening', time: '4PM - 7PM' },
                  ].map((slot) => (
                    <div
                      key={slot.value}
                      className={`time-slot ${form.time_slot === slot.value ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, time_slot: slot.value })}
                    >
                      <strong>{slot.label}</strong>
                      <span>{slot.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="booking-field">
                <label className="booking-label">
                  <FiMapPin size={16} /> Address
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                />
              </div>

              <div className="booking-field">
                <label className="booking-label">
                  <FiDollarSign size={16} /> Budget
                </label>
                <select
                  className="input-field"
                  value={form.budget_range}
                  onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
                >
                  <option value="">Select budget</option>
                  <option value="under_1L">Under ₹1 Lakh</option>
                  <option value="1L_3L">₹1–3 Lakhs</option>
                  <option value="3L_5L">₹3–5 Lakhs</option>
                  <option value="5L_10L">₹5–10 Lakhs</option>
                  <option value="above_10L">Above ₹10 Lakhs</option>
                </select>
              </div>

              <div className="booking-field">
                <label className="booking-label">
                  <FiFileText size={16} /> Requirements
                </label>
                <textarea
                  className="input-field"
                  rows={4}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                />
              </div>

              <button
                className="booking-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Confirm Site Visit'}
              </button>
            </form>
          </div>

        </div>
      </div>

      
    </div>
  );
};

export default Booking;