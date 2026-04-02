import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
        <Navbar />
        <div className="success-page">
          <div className="success-card">
            <FiCheckCircle size={64} color="#4A1A6B" />
            <h2 className="success-title">Booking Confirmed!</h2>
            <p className="success-text">
              Your site visit has been booked successfully. Our designer will contact you shortly.
            </p>

            <div className="success-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate('/projects')}
              >
                View My Projects
              </button>

              <button
                className="btn-secondary"
                onClick={() => navigate('/designers')}
              >
                Back to Designers
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

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
                  <h3 className="designer-side-name">
                    {designer.username}
                  </h3>
                  <p className="designer-side-spec">
                    {designer.specialization}
                  </p>
                </div>
              </div>

              <div className="designer-side-stats">
                <div className="d-stat">
                  <span className="d-stat-label">Experience</span>
                  <span className="d-stat-value">
                    {designer.experience_years} Years
                  </span>
                </div>

                <div className="d-stat">
                  <span className="d-stat-label">Rating</span>
                  <span className="d-stat-value">
                    ⭐ {designer.rating || 4.5}/5
                  </span>
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
            <h2 className="booking-form-title">
              Schedule Your Visit
            </h2>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="booking-form">

              {/* DATE */}
              <div className="booking-field">
                <label className="booking-label">
                  <FiCalendar size={16} /> Visit Date
                </label>

                <input
                  className="input-field"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.visit_date}
                  onChange={(e) =>
                    setForm({ ...form, visit_date: e.target.value })
                  }
                  required
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
                      className={`time-slot ${
                        form.time_slot === slot.value ? 'active' : ''
                      }`}
                      onClick={() =>
                        setForm({ ...form, time_slot: slot.value })
                      }
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
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
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
                  onChange={(e) =>
                    setForm({ ...form, budget_range: e.target.value })
                  }
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
                  onChange={(e) =>
                    setForm({ ...form, requirements: e.target.value })
                  }
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

      <Footer />
    </div>
  );
};

export default Booking;