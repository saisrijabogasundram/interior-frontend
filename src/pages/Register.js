import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await API.post('/users/register/', form);
      setMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-card__header">
          <h1 className="brand">
            Interior <span className="brand-accent">Design</span>
          </h1>
          <h2 className="title">Create Your Account</h2>
          <p className="subtitle">Join thousands of happy homeowners</p>
        </div>

        {error && <div className="error-box">{error}</div>}
        {message && <div className="success-box">{message}</div>}

        <form onSubmit={handleSubmit} className="form">

          <div className="row">
            <div className="field">
              <div className="input-wrapper">
                <FiUser className="input-icon" size={16} />
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field">
              <div className="input-wrapper">
                <FiPhone className="input-icon" size={16} />
                <input
                  className="input"
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="input-wrapper">
              <FiMail className="input-icon" size={16} />
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="input-wrapper">
              <FiLock className="input-icon" size={16} />
              <input
                className="input"
                type={showPass ? 'text' : 'password'}
                placeholder="Create password (min 8 characters)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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

          <div className="field">
            <div className="input-wrapper select-wrapper">
              <select
                className="input select-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="customer">Homeowner / Customer</option>
                <option value="designer">Interior Designer</option>
                <option value="staff">Staff Member</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        <p className="terms-text">
          By registering, you agree to our{' '}
          <span className="terms-link">Terms of Service</span> and{' '}
          <span className="terms-link">Privacy Policy</span>
        </p>

        <p className="login-text">
          Already have an account?{' '}
          <span className="login-link" onClick={() => navigate('/login')}>
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;