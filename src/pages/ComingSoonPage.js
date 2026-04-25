import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { COMING_SOON_MARCH, COMING_SOON_APRIL, FEATURED_FILM } from '../data/mockData';
import './ComingSoonPage.css';

const MONTH_TABS = ['March 2026', 'April 2026', 'May 2026', 'Summer 2026', 'All Upcoming'];

function ComingSoonPage({ navigate }) {
  const [activeMonth, setActiveMonth] = useState('March 2026');
  const [countdown, setCountdown] = useState(FEATURED_FILM.countdown);

  // Live countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) days = 0;
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="page-wrapper">
      {/* ── COUNTDOWN HERO ── */}
      <div className="countdown-hero">
        <div className="page-hero-tag">🎬 Upcoming Releases — Canada</div>
        <h1 className="page-hero-title">Coming Soon</h1>
        <p className="page-hero-desc">Get notified first. Pre-order tickets before they sell out.</p>

        {/* Month tabs */}
        <div className="countdown-strip">
          {MONTH_TABS.map(tab => (
            <div
              key={tab}
              className={`month-tab ${activeMonth === tab ? 'active' : ''}`}
              onClick={() => setActiveMonth(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Featured film */}
        <div className="coming-feature">
          <div>
            <div className="feature-badge">⭐ {FEATURED_FILM.tagline}</div>
            <h2 className="feature-title">{FEATURED_FILM.title}</h2>
            <div className="feature-release">
              📅 Canadian Release: {FEATURED_FILM.release} · {FEATURED_FILM.ageRating} · {FEATURED_FILM.runtime}
            </div>
            <p className="feature-desc">{FEATURED_FILM.description}</p>
            <div className="countdown-boxes">
              {[
                { num: pad(countdown.days),  label: 'Days' },
                { num: pad(countdown.hours), label: 'Hours' },
                { num: pad(countdown.mins),  label: 'Mins' },
                { num: pad(countdown.secs),  label: 'Secs' },
              ].map(box => (
                <div key={box.label} className="cd-box">
                  <div className="cd-num">{box.num}</div>
                  <div className="cd-label">{box.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="btn-primary" onClick={() => navigate('seats')}>🔔 Pre-Order Tickets</button>
              <button className="btn-outline">▶ Watch Trailer</button>
            </div>
          </div>
          <div className="coming-feature-poster">{FEATURED_FILM.emoji}</div>
        </div>
      </div>

      {/* ── MARCH ── */}
      <section className="section-wrap dark">
        <div className="section-header">
          <h2 className="section-title">March 2026</h2>
        </div>
        <div className="movies-grid">
          {COMING_SOON_MARCH.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant={movie.canPreorder ? 'preorder' : 'remind'}
              onAction={() => movie.canPreorder ? navigate('seats') : null}
            />
          ))}
        </div>
      </section>

      {/* ── APRIL ── */}
      <section className="section-wrap">
        <div className="section-header">
          <h2 className="section-title">April 2026</h2>
        </div>
        <div className="movies-grid">
          {COMING_SOON_APRIL.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant="remind"
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ComingSoonPage;
