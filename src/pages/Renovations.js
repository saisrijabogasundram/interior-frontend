import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Renovations.css';

const Renovations = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Kitchen Renovation',
      desc: 'Transform your old kitchen into a modern masterpiece',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      path: '/designs?room=kitchen'
    },
    {
      title: 'Bedroom Renovation',
      desc: 'Revamp your bedroom with fresh designs and layouts',
      img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
      path: '/designs?room=bedroom'
    },
    {
      title: 'Bathroom Renovation',
      desc: 'Upgrade your bathroom with modern fittings and tiles',
      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      path: '/designs?room=bathroom'
    },
    {
      title: 'Living Room Renovation',
      desc: 'Give your living room a complete makeover',
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      path: '/designs?room=living-room'
    },
    {
      title: 'Full Home Renovation',
      desc: 'Complete home transformation from top to bottom',
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
      path: '/designs?room=living-room'
    },
  ];

  return (
    <div>
      <div className="reno-hero">
        <h1 className="reno-hero__title">Renovations</h1>
        <p className="reno-hero__sub">
          Expert upgrades & remodelling — breathe new life into your home
        </p>
      </div>

      <div className="reno-grid">
        {sections.map((item, i) => (
          <div
            key={i}
            className="reno-card"
            onClick={() => navigate(item.path)}
          >
            <img src={item.img} alt={item.title} className="reno-card__img" />
            <div className="reno-card__body">
              <h3 className="reno-card__title">{item.title}</h3>
              <p className="reno-card__desc">{item.desc}</p>
              <span className="reno-card__arrow">Explore →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Renovations;