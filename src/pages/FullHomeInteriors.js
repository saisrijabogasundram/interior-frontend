import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FullHomeInteriors.css';

const FullHomeInteriors = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Living Room',
      desc: 'Elegant living spaces designed for comfort and style',
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      path: '/designs?room=living-room'
    },
    {
      title: 'Bedroom',
      desc: 'Peaceful and beautiful bedrooms tailored to your taste',
      img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
      path: '/designs?room=bedroom'
    },
    {
      title: 'Kitchen',
      desc: 'Functional and stylish kitchens for modern homes',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      path: '/designs?room=kitchen'
    },
    {
      title: 'Bathroom',
      desc: 'Luxurious bathrooms with premium fittings and finishes',
      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      path: '/designs?room=bathroom'
    },
    {
      title: 'Balcony & Foyer',
      desc: 'Beautiful entry spaces and outdoor areas for your home',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      path: '/designs?room=balcony'
    },
  ];

  return (
    <div>
      <div className="fullhome-hero">
        <h1 className="fullhome-hero__title">Full Home Interiors</h1>
        <p className="fullhome-hero__sub">
          End-to-end turnkey solutions for your entire home
        </p>
      </div>

      <div className="fullhome-grid">
        {sections.map((item, i) => (
          <div
            key={i}
            className="fullhome-card"
            onClick={() => navigate(item.path)}
          >
            <img src={item.img} alt={item.title} className="fullhome-card__img" />
            <div className="fullhome-card__body">
              <h3 className="fullhome-card__title">{item.title}</h3>
              <p className="fullhome-card__desc">{item.desc}</p>
              <span className="fullhome-card__arrow">Explore →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullHomeInteriors;