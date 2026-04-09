import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LuxuryInteriors.css';

const LuxuryInteriors = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Luxury Living Room',
      desc: 'Opulent living spaces that redefine elegance and comfort',
      img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
      path: '/designs?room=living-room&style=modern'
    },
    {
      title: 'Luxury Bedroom',
      desc: 'Premium bedroom designs with the finest materials',
      img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
      path: '/designs?room=bedroom&style=classic'
    },
    {
      title: 'Luxury Kitchen',
      desc: 'World-class kitchens with high-end appliances and finishes',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      path: '/designs?room=kitchen&style=modern'
    },
    {
      title: 'Luxury Bathroom',
      desc: 'Spa-like bathrooms with premium fittings and marble finishes',
      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      path: '/designs?room=bathroom&style=minimalist'
    },
  ];

  return (
    <div>
      <div className="luxury-hero">
        <h1 className="luxury-hero__title">Luxury Interiors</h1>
        <p className="luxury-hero__sub">
          Homes that redefine elegance — crafted for the finest taste
        </p>
      </div>

      <div className="luxury-grid">
        {sections.map((item, i) => (
          <div
            key={i}
            className="luxury-card"
            onClick={() => navigate(item.path)}
          >
            <img src={item.img} alt={item.title} className="luxury-card__img" />
            <div className="luxury-card__body">
              <h3 className="luxury-card__title">{item.title}</h3>
              <p className="luxury-card__desc">{item.desc}</p>
              <span className="luxury-card__arrow">Explore →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LuxuryInteriors;