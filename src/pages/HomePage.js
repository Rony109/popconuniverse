import React from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { FEATURED_HOME, NOW_PLAYING, POSTER_GRADIENTS } from '../data/mockData';
import './HomePage.css';

const REEL_POSTERS = [
  { cls: 'poster-1', label: 'Nebula Protocol' },
  { cls: 'poster-2', label: 'Frozen Meridian' },
  { cls: 'poster-3', label: 'Crimson Throne' },
  { cls: 'poster-4', label: "Eden's Edge" },
  { cls: 'poster-5', label: 'Storm Atlas' },
  { cls: 'poster-6', label: 'The Last Cipher' },
  { cls: 'poster-7', label: 'Masquerade' },
  { cls: 'poster-8', label: 'Peak Pursuit' },
  { cls: 'poster-9', label: 'Tidal Force' },
];

function ReelCard({ cls, label }) {
  return (
    <div className={`reel-card ${cls}`}>
      <span className="reel-label">{label}</span>
    </div>
  );
}

function HomePage({ navigate, onSelectMovie }) {
  const reelCols = [
    REEL_POSTERS.slice(0, 3),
    REEL_POSTERS.slice(3, 6),
    REEL_POSTERS.slice(6, 9),
  ];

  return (
    <div className="page-wrapper">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />

        {/* Floating kernels */}
        {['🍿','🎬','⭐','🎥','🍿','🎟️'].map((k, i) => (
          <span
            key={i}
            className="kernel-float"
            style={{
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${6 + i * 0.7}s`,
            }}
          >{k}</span>
        ))}

        {/* Reel mosaic */}
        <div className="hero-reel">
          {reelCols.map((col, ci) => (
            <div key={ci} className="reel-col">
              {col.map((p, pi) => <ReelCard key={pi} {...p} />)}
            </div>
          ))}
        </div>

        {/* Hero copy */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Canada's Movie Universe
          </div>
          <h1 className="hero-title">
            Every Film.<br />
            Every Theatre.<br />
            <span className="hero-accent">One Universe.</span>
          </h1>
          <p className="hero-desc">
            Browse 300+ theatres across Canada. Real-time showtimes,
            instant e-tickets, and exclusive Scene+ rewards — all in one place.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('nowplaying')}>
              🎬 What's Playing Now
            </button>
            <button className="btn-outline" onClick={() => navigate('comingsoon')}>
              Coming Soon →
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">300+</span><span className="stat-label">Theatres</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">50+</span><span className="stat-label">Films</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">10+</span><span className="stat-label">Provinces</span></div>
          </div>
        </div>
      </section>

      {/* ── PROMO STRIP ── */}
      <div className="promo-strip">
        <div>
          <div className="promo-text">🍁 Canada Day Special — 20% off all tickets this weekend</div>
          <div className="promo-sub">Valid at 300+ partnered theatres nationwide · Scene+ points apply</div>
        </div>
        <div className="promo-code">CANADA20</div>
        <button className="btn-caramel" onClick={() => navigate('nowplaying')}>Browse Films</button>
      </div>

      {/* ── TRENDING NOW ── */}
      <section className="section-wrap">
        <div className="section-header">
          <div>
            <h2 className="section-title">Trending Now 🔥</h2>
            <p className="section-subtitle">Most-booked films across Canada this week</p>
          </div>
          <button className="section-link" onClick={() => navigate('nowplaying')}>View All →</button>
        </div>
        <div className="movies-grid">
          {FEATURED_HOME.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant="book"
              onAction={() => { onSelectMovie(NOW_PLAYING.find(m => m.id === movie.id) || movie); navigate('moviedescription'); }}
            />
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE STRIP ── */}
      <section className="section-wrap dark experience-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Choose Your Experience</h2>
            <p className="section-subtitle">Premium formats available at select theatres</p>
          </div>
        </div>
        <div className="experience-grid">
          {[
            { icon: '🔭', name: 'IMAX', desc: 'Massive screens, crystal clarity, heart-pounding sound.' },
            { icon: '🪑', name: 'VIP', desc: 'Luxury recliners, in-seat service, premium bar.' },
            { icon: '💥', name: '4DX', desc: 'Motion seats, wind, scents — total immersion.' },
            { icon: '📳', name: 'D-BOX', desc: 'Haptic motion seating synced to the action.' },
          ].map(exp => (
            <div key={exp.name} className="experience-card">
              <div className="exp-icon">{exp.icon}</div>
              <div className="exp-name">{exp.name}</div>
              <div className="exp-desc">{exp.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOW PLAYING PREVIEW ── */}
      <section className="section-wrap">
        <div className="section-header">
          <div>
            <h2 className="section-title">Now Playing</h2>
            <p className="section-subtitle">In theatres across Ontario this week</p>
          </div>
          <button className="section-link" onClick={() => navigate('nowplaying')}>See All 50 Films →</button>
        </div>
        <div className="movies-grid">
          {NOW_PLAYING.slice(5, 10).map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant="book"
              onAction={() => { onSelectMovie(movie); navigate('moviedescription'); }}
            />
          ))}
        </div>
      </section>

      {/* ── SCENE+ BANNER ── */}
      <section className="scene-banner">
        <div className="scene-content">
          <div className="scene-icon">🏆</div>
          <div>
            <div className="scene-title">Earn Scene+ Points on Every Booking</div>
            <div className="scene-desc">Connect your Scene+ card at checkout and earn points toward free movies, travel, and more.</div>
          </div>
          <button className="btn-butter" onClick={() => navigate('join')}>Join Free →</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
