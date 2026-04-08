import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FiStar, FiBriefcase, FiCalendar } from 'react-icons/fi';
import './Designers.css';

const Designers = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/bookings/designers/', {
      headers: {
        Authorization: undefined, // skip auth token for public access
      },
    })
      .then((res) => {
        setDesigners(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBooking = (designerId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login', { state: { from: `/booking/${designerId}` } });
    } else {
      navigate(`/booking/${designerId}`);
    }
  };

  return (
    <div>
      <div className="designers-hero">
        <h1 className="designers-hero-title">Our Expert Designers</h1>
        <p className="designers-hero-sub">Meet our verified interior design professionals</p>
      </div>

      <div className="designers-container">
        {loading ? (
          <div className="designers-loading">Loading designers...</div>
        ) : designers.length === 0 ? (
          <div className="designers-empty">
            <span style={{ fontSize: '48px' }}>👨‍🎨</span>
            <p>No designers available right now.</p>
          </div>
        ) : (
          <div className="designers-grid">
            {designers.map((d) => (
              <div key={d.id} className="designer-card">
                <div className="designer-avatar-section">
                  <div className="designer-avatar">
                    {d.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="designer-available-badge">
                    {d.is_available ? '✓ Available' : '✗ Busy'}
                  </div>
                </div>
                <div className="designer-info">
                  <h3 className="designer-name">{d.username}</h3>
                  <p className="designer-spec">{d.specialization}</p>
                  <div className="designer-stats">
                    <div className="designer-stat">
                      <FiBriefcase size={14} color="#4A1A6B" />
                      <span>{d.experience_years} years exp.</span>
                    </div>
                    <div className="designer-stat">
                      <FiStar size={14} color="#E8B4A0" fill="#E8B4A0" />
                      <span>{d.rating}/5</span>
                    </div>
                  </div>
                  {d.bio && <p className="designer-bio">{d.bio}</p>}
                  <button className="book-btn" onClick={() => handleBooking(d.id)}>
                    <FiCalendar size={16} />
                    Book Site Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Designers;