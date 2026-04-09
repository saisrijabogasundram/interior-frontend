import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModularInteriors.css';

const ModularInteriors = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Modular Kitchen',
      desc: 'Smart, space-saving kitchens with premium fittings',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      path: '/designs?room=kitchen'
    },
    {
      title: 'Wardrobe & Storage',
      desc: 'Custom wardrobes and storage solutions for every room',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      path: '/designs?category=modular_furniture'
    },
    {
      title: 'Modular Furniture',
      desc: 'Flexible modular furniture that fits your lifestyle',
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      path: '/designs?category=modular_furniture'
    },
  ];

  return (
    <div>
      <div className="modular-hero">
        <h1 className="modular-hero__title">Modular Interiors</h1>
        <p className="modular-hero__sub">
          Kitchens, wardrobes & storage — built for modern living
        </p>
      </div>

      <div className="modular-grid">
        {sections.map((item, i) => (
          <div
            key={i}
            className="modular-card"
            onClick={() => navigate(item.path)}
          >
            <img src={item.img} alt={item.title} className="modular-card__img" />
            <div className="modular-card__body">
              <h3 className="modular-card__title">{item.title}</h3>
              <p className="modular-card__desc">{item.desc}</p>
              <span className="modular-card__arrow">Explore →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModularInteriors;