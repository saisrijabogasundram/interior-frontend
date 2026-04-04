import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/users/login/', form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('username', res.data.user.username);

      const role = res.data.user.role;
      if (role === 'admin' || role === 'owner') {
        navigate('/admin/dashboard');
      } else if (role === 'staff') {
        navigate('/staff/bookings');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="left-content">
          <h1 className="brand">
            Interior <span className="brand-accent">Design</span>
          </h1>
          <h2 className="tagline">Transform Your Space Into A Dream Home</h2>
          <p className="desc">
            Join thousands of homeowners who have transformed their homes with our expert designers.
          </p>
          <div className="features">
            {[
              '500+ Expert Designers',
              '10,000+ Happy Clients',
              'Free Site Visit',
              '10 Year Warranty'
            ].map((f) => (
              <div key={f} className="feature">
                <span className="feature-dot">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2 className="title">Welcome Back!</h2>
          <p className="subtitle">Sign in to continue to your account</p>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} className="form">

            <div className="field">
              <label className="label">Username</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" size={16} />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" size={16} />
                <input
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              className="btn-primary submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="register-text">
            Don't have an account?{' '}
            <span
              className="register-link"
              onClick={() => navigate('/register')}
            >
              Create Account
            </span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;