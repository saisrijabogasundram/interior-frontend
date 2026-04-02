import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiInstagram, FiFacebook, FiTwitter, FiYoutube,
  FiPhone, FiMail, FiMapPin
} from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const routes = {
    Designs: "/designs",
    Designers: "/designers",
    Products: "/products",
    Projects: "/projects",
    "Cost Estimate": "/cost-estimate"
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-text">Interior</span>
              <span className="footer-logo-accent">Design</span>
            </div>

            <p className="footer-brand-desc">
              Transform your home with our expert interior designers.
              From concept to completion, we bring your dream space to life.
            </p>

            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><FiInstagram size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><FiFacebook size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><FiTwitter size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon"><FiYoutube size={18} /></a>
            </div>
          </div>

          
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              {Object.keys(routes).map((item) => (
                <li key={item}>
                  <span
                    className="footer-list-item"
                    onClick={() => navigate(routes[item])}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-list">
              {[
                'Living Room', 'Bedroom', 'Kitchen',
                'Office', 'Modular Furniture', 'Lighting & Decor'
              ].map((item) => (
                <li key={item} className="footer-list-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-list">
              <li className="footer-contact-item">
                <FiPhone size={16} />
                <span>+91 98765 43210</span>
              </li>
              <li className="footer-contact-item">
                <FiMail size={16} />
                <span>hello@interiordesign.com</span>
              </li>
              <li className="footer-contact-item">
                <FiMapPin size={16} />
                <span>Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>

        </div>

       
        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © 2026 InteriorDesign. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-bottom-link">Privacy Policy</span>
            <span className="footer-bottom-link">Terms of Service</span>
            <span className="footer-bottom-link">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;