import React, { useState, useEffect } from 'react';

import API from '../api/axios';
import { FiFilter, FiSearch } from 'react-icons/fi';
import './DesignGallery.css';

const BASE_URL = "http://127.0.0.1:8000"; // 🔥 change later when deploying

const DesignGallery = () => {
  const [designs, setDesigns] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    style: '',
    budget: ''
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDesigns();
  }, [filters]);

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const params = {};

      if (filters.category) params.category = filters.category;
      if (filters.style) params.style = filters.style;
      if (filters.budget) params.budget = filters.budget;

      const res = await API.get('/designs/', { params });
      setDesigns(res.data);
    } catch (err) {
      console.error("Error fetching designs:", err); // ✅ fixed
    } finally {
      setLoading(false);
    }
  };

  
  const filtered = designs.filter((d) =>
    (d.title || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
     

      
      <div className="gallery-hero">
        <h1 className="gallery-hero-title">Design Gallery</h1>
        <p className="gallery-hero-sub">
          Explore thousands of stunning interior designs for every room
        </p>
      </div>

      <div className="gallery-container">

        
        <div className="gallery-toolbar">

          
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              className="search-input"
              placeholder="Search designs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          
          <div className="gallery-filters">
            <FiFilter color="#4A1A6B" />

            <select
              className="filter-select"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Rooms</option>
              <option value="living_room">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="office">Office</option>
              <option value="modular_furniture">Modular</option>
              <option value="lighting_decor">Lighting & Decor</option>
            </select>

            <select
              className="filter-select"
              value={filters.style}
              onChange={(e) =>
                setFilters({ ...filters, style: e.target.value })
              }
            >
              <option value="">All Styles</option>
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimalist">Minimalist</option>
              <option value="bohemian">Bohemian</option>
              <option value="industrial">Industrial</option>
            </select>

            <select
              className="filter-select"
              value={filters.budget}
              onChange={(e) =>
                setFilters({ ...filters, budget: e.target.value })
              }
            >
              <option value="">All Budgets</option>
              <option value="low">Under ₹50K</option>
              <option value="medium">₹50K - ₹2L</option>
              <option value="high">Above ₹2L</option>
            </select>

          </div>
        </div>

        
        {loading ? (
          <div className="gallery-loading">Loading designs...</div>

        ) : filtered.length === 0 ? (
          <div className="gallery-empty">
            <span style={{ fontSize: '48px' }}>🎨</span>
            <p>No designs found. Try different filters!</p>
          </div>

        ) : (
          <div className="gallery-grid">
            {filtered.map((d) => (
              <div key={d.id} className="gallery-card">

                
                {d.image_url ? (
                  <img src={d.image_url} alt={d.title} className="gallery-img" />
                ) : (
                  <div className="gallery-placeholder">🏠</div>
                )}

                
                <div className="gallery-info">
                  <h3 className="gallery-title">{d.title}</h3>

                  {d.description && (
                    <p className="gallery-desc">{d.description}</p>
                  )}

                  <div className="gallery-tags">
                    <span className="badge">
                      {d.category?.replace('_', ' ')}
                    </span>
                    <span className="badge">{d.style}</span>
                    <span className="badge">{d.budget}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    
    </div>
  );
};

export default DesignGallery;