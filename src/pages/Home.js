import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../api/axios';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [activeTab, setActiveTab] = useState('fullhome');

  
  useEffect(() => {
    API.get('/designs/')
      .then((res) => setDesigns(res.data.slice(0, 6)))
      .catch(() => {});
  }, []);

  
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  
  const tabs = [
    { id: 'fullhome', label: 'Full Home' },
    { id: 'kitchen',  label: 'Kitchen'   },
    { id: 'wardrobe', label: 'Wardrobe'  },
  ];

  const handleCalculate = () => {
    const labels = { fullhome: 'Full Home', kitchen: 'Kitchen', wardrobe: 'Wardrobe' };
    navigate('/estimate');
  };

  
  const trustItems = [
    { icon: '🏆', strong: '10-Year Warranty',   span: 'On all work done'       },
    { icon: '📅', strong: '45-Day Move-in',      span: 'Guaranteed delivery'    },
    { icon: '✅', strong: '100+ Quality Checks', span: 'Before every handover'  },
    { icon: '🏠', strong: '10,000+ Homes',       span: 'Delivered with love'    },
    { icon: '📍', strong: '50+ Cities',          span: 'Pan India presence'     },
    { icon: '👷', strong: '500+ Designers',      span: 'Verified experts'       },
  ];

  const offerings = [
    { emoji: '🍳', bg: 'bg1', title: 'Modular Interiors',   sub: 'Kitchens, wardrobes & storage',    path: '/designs' },
    { emoji: '🏡', bg: 'bg2', title: 'Full Home Interiors', sub: 'End-to-end turnkey solutions',      path: '/designs' },
    { emoji: '💎', bg: 'bg3', title: 'Luxury Interiors',    sub: 'Homes that redefine elegance',      path: '/designs' },
    { emoji: '🔨', bg: 'bg4', title: 'Renovations',         sub: 'Expert upgrades & remodelling',     path: '/designs' },
  ];

  const mosaicItems = [
    { emoji: '🛋️', bg: 'c1', label: 'Living Room Designs', big: true  },
    { emoji: '🍳', bg: 'c2', label: 'Kitchen Designs',     big: false },
    { emoji: '🚿', bg: 'c3', label: 'Bathroom',            big: false },
    { emoji: '🛏️', bg: 'c4', label: 'Bedroom Designs',     big: false },
    { emoji: '🌿', bg: 'c5', label: 'Balcony & Foyer',     big: false },
  ];

  const steps = [
    { num: 1, title: 'Book a Free Consultation', desc: 'Meet our expert designers online or visit a studio near you'       },
    { num: 2, title: 'Get Your Design & Quote',  desc: 'Personalised designs with transparent, no-surprise pricing'        },
    { num: 3, title: 'We Handle Everything',     desc: 'From raw materials to installation — fully managed for you'        },
    { num: 4, title: 'Move Into Your Dream Home',desc: 'On time, every time — backed by our 45-day move-in guarantee'      },
  ];

  const testimonials = [
    { stars: '★★★★★', text: 'The team finished ahead of schedule and the quality exceeded every expectation we had. Truly hassle-free.', name: 'Rohit & Priya',   city: 'Hyderabad' },
    { stars: '★★★★★', text: 'Transparent pricing with zero hidden costs. The designers really listened to what we wanted and delivered.', name: 'Swati & Gaurav', city: 'Bangalore' },
    { stars: '★★★★★', text: 'From first consultation to move-in day, everything was smooth. The 3D designs helped us visualise perfectly.', name: 'Arjun & Meena',  city: 'Mumbai'    },
  ];

  return (
    <div>

      
      <section className="hero">
        <div className="hero__left fade-in">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            India's Most Trusted Interior Brand
          </div>

          <h1 className="hero__title">
            Home to<br />
            <em>beautiful</em><br />
            interiors
          </h1>

          <p className="hero__sub">
            Connect with 500+ expert designers. Transparent pricing,
            100+ quality checks, and a 45-day move-in guarantee.
          </p>

          <div className="hero__btns">
            <button className="hero__btn-primary" onClick={() => navigate('/register')}>
              Book Free Consultation
            </button>
            <button className="hero__btn-outline" onClick={() => navigate('/designs')}>
              View Design Ideas
            </button>
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__room-card tall room-living">
            <span className="hero__room-emoji">🛋️</span>
            <span className="hero__room-lbl">Living Room</span>
            <span className="hero__room-tag">Living Room</span>
          </div>
          <div className="hero__room-col">
            <div className="hero__room-card room-kitchen">
              <span className="hero__room-emoji">🍳</span>
              <span className="hero__room-lbl">Kitchen</span>
              <span className="hero__room-tag">Modular Kitchen</span>
            </div>
            <div className="hero__room-card room-bedroom">
              <span className="hero__room-emoji">🛏️</span>
              <span className="hero__room-lbl">Bedroom</span>
              <span className="hero__room-tag">Bedroom</span>
            </div>
          </div>
        </div>
      </section>

      
      <div className="trust-strip">
        {trustItems.map((item, i) => (
          <div className="trust-strip__item" key={i}>
            <span className="trust-strip__icon">{item.icon}</span>
            <div className="trust-strip__text">
              <strong>{item.strong}</strong>
              <span>{item.span}</span>
            </div>
          </div>
        ))}
      </div>

      
      <section className="home-section fade-in">
        <div className="home-section__head">
          <div className="home-section__title">One-stop shop for all things interiors</div>
          <div className="home-section__sub">From modular kitchens to full home transformations — we've got it all</div>
        </div>
        <div className="offerings__grid">
          {offerings.map((item, i) => (
            <div className="offering-card" key={i} onClick={() => navigate(item.path)}>
              <div className={`offering-card__img ${item.bg}`}>{item.emoji}</div>
              <div className="offering-card__body">
                <strong>{item.title}</strong>
                <span>{item.sub}</span>
                <span className="offering-card__arrow">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <div className="estimate-wrap fade-in">
        <div className="estimate-strip">
          <div>
            <div className="estimate-strip__title">Get an instant estimate for your home</div>
            <div className="estimate-strip__sub">Transparent pricing — no hidden costs, ever</div>
          </div>
          <div className="estimate-strip__btns">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`estimate-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <button className="estimate-go" onClick={handleCalculate}>
              Calculate Now →
            </button>
          </div>
        </div>
      </div>

      
      <section className="home-section fade-in">
        <div className="home-section__head">
          <div className="home-section__title">Inspiration for your home</div>
          <div className="home-section__sub">Curated design ideas for every room in your home</div>
        </div>
        <div className="mosaic">
          {mosaicItems.map((item, i) => (
            <div
              className={`mosaic__card ${item.big ? 'big' : ''}`}
              key={i}
              onClick={() => navigate('/designs')}
            >
              <div className={`mosaic__bg ${item.bg}`}>{item.emoji}</div>
              <div className="mosaic__label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      
      <div className="how-it-works fade-in">
        <div className="home-section__head">
          <div className="home-section__title">How it works</div>
          <div className="home-section__sub">Your dream home in 4 simple steps</div>
        </div>
        <div className="how-it-works__steps">
          {steps.map((step, i) => (
            <div className="step-card" key={i}>
              <div className="step-card__num">{step.num}</div>
              <div className="step-card__title">{step.title}</div>
              <div className="step-card__desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      
      <section className="home-section fade-in">
        <div className="home-section__head">
          <div className="home-section__title">What our customers say</div>
          <div className="home-section__sub">Real stories from real homeowners across India</div>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-card__stars">{t.stars}</div>
              <div className="testi-card__quote">"</div>
              <div className="testi-card__text">{t.text}</div>
              <div className="testi-card__name">{t.name}</div>
              <div className="testi-card__city">{t.city}</div>
            </div>
          ))}
        </div>
      </section>

      
      <div className="footer-cta fade-in">
        <div className="footer-cta__title">
          Your <em>dream home</em> is just a click away
        </div>
        <button className="footer-cta__btn" onClick={() => navigate('/register')}>
          Get Started — It's Free
        </button>
      </div>

      
    </div>
  );
};

export default Home;