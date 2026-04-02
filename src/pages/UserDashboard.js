import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate  = useNavigate();
  const username  = localStorage.getItem('username') || 'User';

  const [bookings,  setBookings]  = useState([]);
  const [projects,  setProjects]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [bookingsRes, projectsRes] = await Promise.all([
        API.get('/bookings/'),
        API.get('/projects/'),
      ]);
      setBookings(bookingsRes.data);
      setProjects(projectsRes.data);
    } catch {
      setError('Failed to load your data');
    } finally {
      setLoading(false);
    }
  };

 
  const totalBookings   = bookings.length;
  const totalProjects   = projects.length;
  const activeProjects  = projects.filter((p) => p.status === 'in_progress').length;
  const doneProjects    = projects.filter((p) => p.status === 'completed').length;

  const statCards = [
    { label: 'My Bookings',       value: totalBookings,  icon: '📅', bg: '#e8f5f0', color: '#1a4a3a', path: '/booking' },
    { label: 'Total Projects',    value: totalProjects,  icon: '📋', bg: '#e8f0ff', color: '#4f46e5', path: '/projects' },
    { label: 'Active Projects',   value: activeProjects, icon: '🔨', bg: '#fff3e8', color: '#d97706', path: '/projects' },
    { label: 'Completed Projects',value: doneProjects,   icon: '✅', bg: '#d1fae5', color: '#065f46', path: '/projects' },
  ];

  const quickLinks = [
    { icon: '🎨', label: 'Browse Designs',    path: '/designs'    },
    { icon: '👷', label: 'Find Designers',    path: '/designers'  },
    { icon: '🛋️', label: 'Shop Products',    path: '/products'   },
    { icon: '📋', label: 'My Projects',       path: '/projects'   },
    { icon: '📅', label: 'Book Visit',        path: '/designers'  },
    { icon: '💰', label: 'Cost Estimate',     path: '/estimate'   },
  ];

  const projectStatusConfig = {
    planning:    { label: 'Planning',     className: 'planning'    },
    in_progress: { label: 'In Progress',  className: 'in_progress' },
    on_hold:     { label: 'On Hold',      className: 'on_hold'     },
    completed:   { label: 'Completed',    className: 'completed'   },
  };

  return (
    <div className="user-dashboard">

      
      <div className="user-hero">
        <div className="user-hero__left">
          <h1>Welcome back, <span>{username}</span> 👋</h1>
          <p>Here's an overview of your interior design journey</p>
        </div>
        <div className="user-hero__right">
          <button className="user-hero__btn" onClick={() => navigate('/designs')}>
            🎨 Browse Designs
          </button>
          <button className="user-hero__btn primary" onClick={() => navigate('/designers')}>
            📅 Book Consultation
          </button>
        </div>
      </div>

      <div className="user-body">

        
        {error && <div className="user-error">{error}</div>}

        {loading ? (
          <div className="user-loading">⏳ Loading your dashboard...</div>
        ) : (
          <>
            
            <div className="user-stats-grid">
              {statCards.map((card, i) => (
                <div
                  className="user-stat-card"
                  key={i}
                  onClick={() => navigate(card.path)}
                >
                  <div
                    className="user-stat-card__icon"
                    style={{ background: card.bg, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <div className="user-stat-card__info">
                    <strong style={{ color: card.color }}>{card.value}</strong>
                    <span>{card.label}</span>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="user-main-grid">

              
              <div className="user-panel">
                <div className="user-panel__head">
                  <span className="user-panel__title">📅 My Bookings</span>
                  <button
                    className="user-panel__link"
                    onClick={() => navigate('/designers')}
                  >
                    Book New →
                  </button>
                </div>
                <div className="user-panel__body">
                  {bookings.length === 0 ? (
                    <div className="user-empty">
                      <span>📅</span>
                      <p>No bookings yet. Book a free consultation!</p>
                      <button
                        onClick={() => navigate('/designers')}
                        style={{
                          marginTop: '12px',
                          background: '#1a4a3a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '9px 18px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Nunito Sans, sans-serif',
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  ) : (
                    bookings.slice(0, 5).map((b) => (
                      <div className="user-booking-item" key={b.id}>
                        <div className="user-booking-item__left">
                          <div className="user-booking-item__icon">📅</div>
                          <div>
                            <span className="user-booking-item__title">
                              {b.location || `Booking #${b.id}`}
                            </span>
                            <span className="user-booking-item__date">
                              {b.visit_date} {b.time_slot ? `• ${b.time_slot}` : ''}
                            </span>
                          </div>
                        </div>
                        <span className={`user-status-badge ${b.status}`}>
                          {b.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

             
              <div className="user-panel">
                <div className="user-panel__head">
                  <span className="user-panel__title">📋 My Projects</span>
                  <button
                    className="user-panel__link"
                    onClick={() => navigate('/projects')}
                  >
                    View All →
                  </button>
                </div>
                <div className="user-panel__body">
                  {projects.length === 0 ? (
                    <div className="user-empty">
                      <span>📋</span>
                      <p>No projects yet. Create your first project!</p>
                      <button
                        onClick={() => navigate('/projects')}
                        style={{
                          marginTop: '12px',
                          background: '#b07d4a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '9px 18px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Nunito Sans, sans-serif',
                        }}
                      >
                        New Project
                      </button>
                    </div>
                  ) : (
                    projects.slice(0, 4).map((p) => {
                      const config = projectStatusConfig[p.status] || projectStatusConfig.planning;
                      return (
                        <div className="user-project-item" key={p.id}>
                          <div className="user-project-item__head">
                            <span className="user-project-item__title">{p.title}</span>
                            <span className={`user-proj-badge ${config.className}`}>
                              {config.label}
                            </span>
                          </div>
                          {p.description && (
                            <p className="user-project-item__desc">{p.description}</p>
                          )}
                          <div className="user-progress-bar">
                            <div className={`user-progress-fill ${p.status}`} />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            
            <div className="user-full-panel">
              <div className="user-panel__head">
                <span className="user-panel__title">⚡ Quick Actions</span>
              </div>
              <div className="user-panel__body">
                <div className="user-quick-links">
                  {quickLinks.map((link, i) => (
                    <button
                      key={i}
                      className="user-quick-btn"
                      onClick={() => navigate(link.path)}
                    >
                      <span className="user-quick-btn__icon">{link.icon}</span>
                      <span className="user-quick-btn__label">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;