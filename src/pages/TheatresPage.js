import React, { useState } from 'react';
import Footer from '../components/Footer';
import { THEATRES } from '../data/mockData';
import './TheatresPage.css';

function TheatresPage({ navigate }) {
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = THEATRES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-tag">📍 Toronto, ON · 12 Theatres Found</div>
        <h1 className="page-hero-title">Theatres Near You</h1>
        <p className="page-hero-desc">Find your nearest Cineplex, Landmark, or independent cinema. Real-time seat availability shown.</p>
      </div>

      {/* Search bar */}
      <div className="theatre-search-bar">
        <div className="search-bar" style={{ maxWidth: 500, marginBottom: 0 }}>
          <input
            className="search-input"
            placeholder="Search by theatre name, postal code, or neighbourhood…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="search-btn">⌕</button>
        </div>
      </div>

      <div className="theatres-layout">
        {/* Theatre list */}
        <div className="theatres-list">
          {filtered.map(theatre => (
            <div
              key={theatre.id}
              className={`theatre-card ${selectedId === theatre.id ? 'selected' : ''}`}
              onClick={() => setSelectedId(theatre.id)}
            >
              <div>
                <div className="theatre-name">{theatre.name}</div>
                <div className="theatre-chain">{theatre.chain}</div>
                <div className="theatre-addr">{theatre.address}</div>
                <div className="theatre-amenities">
                  {theatre.amenities.map(a => (
                    <span key={a} className="amenity-tag">{a}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="theatre-dist">{theatre.distance}</div>
                <div className="theatre-rating">{theatre.rating}</div>
                <button
                  className="theatre-book-btn"
                  style={{ marginTop: 10 }}
                  onClick={e => { e.stopPropagation(); navigate('seats'); }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="theatres-map">
          <div className="map-placeholder">
            <div className="map-grid" />
            <div className="loc-map-inner">
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div className="map-gta-label">Greater Toronto Area</div>
                <div className="map-pin" style={{ top: '-80px', left: '20px' }} title="Yonge-Eglinton">📍</div>
                <div className="map-pin" style={{ top: '-20px', left: '-60px' }} title="Scotiabank">📍</div>
                <div className="map-pin" style={{ top: '40px', left: '-100px' }} title="Mississauga">📍</div>
                <div className="map-pin" style={{ top: '-60px', left: '80px' }} title="Eglinton">📍</div>
                <div className="map-pin" style={{ top: '10px', left: '40px' }} title="Market Square">📍</div>
              </div>
            </div>
          </div>
          <div className="map-label">
            <p>📍 Interactive map — select a theatre to see its location</p>
            <p style={{ marginTop: 6, fontSize: '0.72rem' }}>Live availability updates every 5 minutes</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TheatresPage;
