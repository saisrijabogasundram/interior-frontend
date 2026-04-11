import React, { useState } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';

import API from '../api/axios';
import {
  FiHome,
  FiMaximize,
  FiPackage,
  FiDroplet,
  FiArrowRight
} from 'react-icons/fi';
import './CostEstimation.css';


const CostEstimation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    room_type: searchParams.get('type') || '',
    room_size_sqft: '',
    material_quality: '',
    design_style: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!form.material_quality || !form.design_style) {
      setError('Please select material quality and design style');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await API.post('/projects/estimate/', form);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to estimate cost. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  
  const reset = () => {
    setResult(null);
    setError('');
    setForm({
      room_type: '',
      room_size_sqft: '',
      material_quality: '',
      design_style: '',
    });
  };

  return (
    <div>
      

      <div className="estimate-hero">
        <h1 className="estimate-hero-title">Cost Estimation</h1>
        <p className="estimate-hero-sub">
          Get an instant estimate for your interior design project
        </p>
      </div>

      <div className="estimate-container">
        <div className="estimate-grid">

          
          <div className="estimate-form-card">
            <h2 className="estimate-form-title">
              Calculate Your Budget
            </h2>

            <p className="estimate-form-subtitle">
              Fill in the details to get an instant cost estimate
            </p>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="estimate-form">

              
              <div className="estimate-field">
                <label className="estimate-label">
                  <FiHome size={16} /> Room Type
                </label>

                <select
                  className="input-field"
                  value={form.room_type}
                  onChange={(e) =>
                    setForm({ ...form, room_type: e.target.value })
                  }
                  required
                >
                  <option value="">Select room type</option>
                  <option value="living_room">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="office">Office</option>
                  <option value="bathroom">Bathroom</option>
                </select>
              </div>

              
              <div className="estimate-field">
                <label className="estimate-label">
                  <FiMaximize size={16} /> Room Size (sq ft)
                </label>

                <input
                  className="input-field"
                  type="number"
                  placeholder="e.g. 200"
                  value={form.room_size_sqft}
                  onChange={(e) =>
                    setForm({ ...form, room_size_sqft: e.target.value })
                  }
                  required
                />
              </div>

              
              <div className="estimate-field">
                <label className="estimate-label">
                  <FiPackage size={16} /> Material Quality
                </label>

                <div className="quality-options">
                  {[
                    { value: 'basic', label: 'Basic', desc: 'Budget friendly' },
                    { value: 'standard', label: 'Standard', desc: 'Best value' },
                    { value: 'premium', label: 'Premium', desc: 'Luxury finish' },
                  ].map((opt) => (
                    <div
                      key={opt.value}
                      className={`quality-option ${
                        form.material_quality === opt.value ? 'active' : ''
                      }`}
                      onClick={() =>
                        setForm({ ...form, material_quality: opt.value })
                      }
                    >
                      <strong>{opt.label}</strong>
                      <span style={{ fontSize: '12px', color: '#888' }}>
                        {opt.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="estimate-field">
                <label className="estimate-label">
                  <FiDroplet size={16} /> Design Style
                </label>

                <div className="style-options">
                  {['minimalist', 'modern', 'classic', 'bohemian', 'industrial'].map((s) => (
                    <div
                      key={s}
                      className={`style-btn ${
                        form.design_style === s ? 'active' : ''
                      }`}
                      onClick={() =>
                        setForm({ ...form, design_style: s })
                      }
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="estimate-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  'Calculating...'
                ) : (
                  <>
                    <span>Get Estimate</span> <FiArrowRight />
                  </>
                )}
              </button>
            </form>
          </div>

          
          <div>
            {result ? (
              <div className="result-card">
                <div className="result-header">
                  <h3 className="result-title">Your Estimate</h3>
                  <button className="recalculate-btn" onClick={reset}>
                    Recalculate
                  </button>
                </div>

                <div className="cost-display">
                  <p className="cost-label">Estimated Cost</p>
                  <h2 className="cost-value">
                    {result.estimated_cost}
                  </h2>
                </div>

                <div className="result-details">
                  {[
                    { label: 'Room Type', value: result.room_type?.replace('_', ' ') },
                    { label: 'Room Size', value: `${result.room_size_sqft} sq ft` },
                    { label: 'Material Quality', value: result.material_quality },
                    { label: 'Design Style', value: result.design_style },
                  ].map((item) => (
                    <div key={item.label} className="detail-row">
                      <span className="detail-label">{item.label}</span>
                      <span className="detail-value">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="result-note">
                  <p>
                    This is an approximate estimate. Final cost may vary.
                  </p>
                </div>

                <button
                  className="book-designer-btn"
                  onClick={() => navigate('/designers')}
                >
                  Book a Designer Now
                </button>
              </div>
            ) : (
              <div className="info-card">
                <h3 className="info-title">How We Calculate</h3>

                {[
                  { icon: '📐', title: 'Room Size', desc: 'Larger rooms need more work' },
                  { icon: '✨', title: 'Material Quality', desc: 'Premium costs more' },
                  { icon: '🎨', title: 'Design Style', desc: 'Complex styles cost more' },
                  { icon: '🏠', title: 'Room Type', desc: 'Kitchen costs more' },
                ].map((item) => (
                  <div key={item.title} className="info-item">
                    <span className="info-icon">{item.icon}</span>
                    <div>
                      <h4 className="info-item-title">{item.title}</h4>
                      <p className="info-item-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      
    </div>
  );
};

export default CostEstimation;