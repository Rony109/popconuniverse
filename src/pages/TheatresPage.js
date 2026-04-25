import React, { useState } from 'react';
import Footer from '../components/Footer';
import { THEATRES } from '../data/mockData';
import './TheatresPage.css';

function TheatresPage({ navigate }) {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = THEATRES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.address.toLowerCase().includes(search.toLowerCase()) ||
    t.postalCode.toLowerCase().includes(search.toLowerCase())
  );

  const selected = THEATRES.find(t => t.id === selectedId) || filtered[0];

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-tag">📍 Toronto, ON · {THEATRES.length} Theatres Found</div>
        <h1 className="page-hero-title">Theatres Near You</h1>
        <p className="page-hero-desc">Find your nearest cinema. Search by name, postal code, or neighbourhood.</p>
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
                {theatre.phone && <div className="theatre-phone">{theatre.phone}</div>}
                <div className="theatre-amenities">
                  {theatre.amenities.map(a => (
                    <span key={a} className="amenity-tag">{a}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="theatre-dist">{theatre.distance}</div>
                <button
                  className="theatre-book-btn"
                  style={{ marginTop: 10 }}
                  onClick={e => { e.stopPropagation(); navigate('nowplaying'); }}
                >
                  See Films
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px', color: 'var(--muted)', textAlign: 'center' }}>
              No theatres match your search.
            </div>
          )}
        </div>

        {/* Map placeholder */}
        <div className="theatres-map">
          <div className="map-placeholder">
            <div className="map-grid" />
            <div className="loc-map-inner">
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div className="map-gta-label">Greater Toronto Area</div>
                {filtered.slice(0, 8).map((t, i) => {
                  const positions = [
                    { top: '-80px', left: '20px' }, { top: '-20px', left: '-60px' },
                    { top: '40px', left: '-100px' }, { top: '-60px', left: '80px' },
                    { top: '10px', left: '40px' },   { top: '-100px', left: '-20px' },
                    { top: '50px', left: '60px' },   { top: '-40px', left: '-80px' },
                  ];
                  const pos = positions[i] || { top: `${-40 + i * 10}px`, left: `${-40 + i * 15}px` };
                  return (
                    <div
                      key={t.id}
                      className={`map-pin ${selected?.id === t.id ? 'active' : ''}`}
                      style={pos}
                      title={t.name}
                      onClick={() => setSelectedId(t.id)}
                    >
                      📍
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {selected && (
            <div className="map-label">
              <p style={{ fontWeight: 600 }}>📍 {selected.name}</p>
              <p style={{ marginTop: 4, fontSize: '0.82rem', color: 'var(--muted)' }}>{selected.address}</p>
              {selected.phone && <p style={{ marginTop: 2, fontSize: '0.78rem', color: 'var(--muted)' }}>{selected.phone}</p>}
            </div>
          )}
          {!selected && (
            <div className="map-label">
              <p>📍 Select a theatre to see its details</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TheatresPage;
