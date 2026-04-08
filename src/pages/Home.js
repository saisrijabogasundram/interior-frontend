import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';


const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fullhome');

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
    {
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
      bg: 'bg1', title: 'Modular Interiors',   sub: 'Kitchens, wardrobes & storage',    path: '/designs'
    },
    {
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
      bg: 'bg2', title: 'Full Home Interiors', sub: 'End-to-end turnkey solutions',      path: '/designs'
    },
    {
      img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80',
      bg: 'bg3', title: 'Luxury Interiors',    sub: 'Homes that redefine elegance',      path: '/designs'
    },
    {
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
      bg: 'bg4', title: 'Renovations',         sub: 'Expert upgrades & remodelling',     path: '/designs'
    },
  ];

  const mosaicItems = [
    {
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      bg: 'c1', label: 'Living Room Designs', big: true
    },
    {
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
      bg: 'c2', label: 'Kitchen Designs',     big: false
    },
    {
      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80',
      bg: 'c3', label: 'Bathroom',            big: false
    },
    {
      img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80',
      bg: 'c4', label: 'Bedroom Designs',     big: false
    },
    {
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      bg: 'c5', label: 'Balcony & Foyer',     big: false
    },
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
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
              alt="Living Room"
              className="hero__room-img"
            />
            <span className="hero__room-tag">Living Room</span>
          </div>
          <div className="hero__room-col">
            <div className="hero__room-card room-kitchen">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
                alt="Kitchen"
                className="hero__room-img"
              />
              <span className="hero__room-tag">Modular Kitchen</span>
            </div>
            <div className="hero__room-card room-bedroom">
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80"
                alt="Bedroom"
                className="hero__room-img"
              />
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
              <div className={`offering-card__img ${item.bg}`}>
                <img src={item.img} alt={item.title} className="offering-card__image" />
              </div>
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
              <div className={`mosaic__bg ${item.bg}`}>
                <img src={item.img} alt={item.label} className="mosaic__image" />
              </div>
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
       
      </div>

      
    </div>
  );
};

export default Home;