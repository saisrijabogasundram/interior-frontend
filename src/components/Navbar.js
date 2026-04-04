import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiShoppingCart } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole]         = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) setUsername(user);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setRole(parsed.role || '');
      } catch {
        setRole('');
      }
    }
  }, [location]); // ✅ re-read on every page change

  const goToDashboard = () => {
    if (role === 'admin' || role === 'owner') {
      navigate('/admin/dashboard');
    } else if (role === 'staff') {
      navigate('/staff/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    setMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { label: 'Designs',       path: '/designs'   },
    { label: 'Designers',     path: '/designers' },
    { label: 'Products',      path: '/products'  },
    { label: 'Projects',      path: '/projects'  },
    { label: 'Cost Estimate', path: '/estimate'  },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo" onClick={() => navigate('/')}>
          <span className="logo-text">Interior</span>
          <span className="logo-accent">Design</span>
        </div>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <span
              key={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </span>
          ))}
        </div>

        <div className="navbar-actions">
          {token ? (
            <>
              <div className="cart" onClick={() => navigate('/cart')}>
                <FiShoppingCart size={18} />
                <span className="cart-text">Cart</span>
              </div>

              <div className="user-info" onClick={goToDashboard}>
                <FiUser size={18} />
                <span className="username">{username || 'User'}</span>
              </div>

              <button className="logout-btn" onClick={logout}>
                <FiLogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="register-btn" onClick={() => navigate('/register')}>
                Get Started
              </button>
            </>
          )}
        </div>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <span
              key={link.path}
              className="mobile-link"
              onClick={() => {
                navigate(link.path);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </span>
          ))}

          {token ? (
            <>
              <span
                className="mobile-link"
                onClick={() => {
                  goToDashboard();
                  setMenuOpen(false);
                }}
              >
                👤 {username || 'User'} — Dashboard
              </span>
              <span className="mobile-link" onClick={logout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <span className="mobile-link" onClick={() => { navigate('/login'); setMenuOpen(false); }}>
                Login
              </span>
              <span className="mobile-link" onClick={() => { navigate('/register'); setMenuOpen(false); }}>
                Register
              </span>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;