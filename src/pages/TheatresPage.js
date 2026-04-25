import React, { useState } from 'react';
import Footer from '../components/Footer';
import { THEATRES, MOVIES_BY_THEATRE, POSTER_GRADIENTS } from '../data/mockData';
import './TheatresPage.css';

function formatTime(dateTimeStr) {
  const timePart = dateTimeStr.split('T')[1] || dateTimeStr;
  const [h, m] = timePart.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function TheatresPage({ navigate }) {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [imgErrors, setImgErrors] = useState({});

  const filtered = THEATRES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.address.toLowerCase().includes(search.toLowerCase()) ||
    t.postalCode.toLowerCase().includes(search.toLowerCase())
  );

  const selected = THEATRES.find(t => t.id === selectedId) || null;
  const nowPlaying = selected ? (MOVIES_BY_THEATRE[selected.id] || []) : [];

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-tag">📍 {THEATRES.length} Theatres · Updated Today</div>
        <h1 className="page-hero-title">Theatres Near You</h1>
        <p className="page-hero-desc">Find your nearest cinema. Search by name, postal code, or neighbourhood.</p>
      </div>

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
        {/* ── THEATRE LIST ── */}
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
              <div className="theatre-card-right">
                <div className="theatre-dist">{theatre.distance}</div>
                <div className="theatre-film-count">
                  {(MOVIES_BY_THEATRE[theatre.id] || []).length} films
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px', color: 'var(--muted)', textAlign: 'center' }}>
              No theatres match your search.
            </div>
          )}
        </div>

        {/* ── DETAIL PANEL ── */}
        <div className="theatre-detail-panel">
          {selected ? (
            <>
              {/* Theatre header */}
              <div className="tdp-header">
                <div>
                  <div className="tdp-name">{selected.name}</div>
                  <div className="tdp-chain">{selected.chain}</div>
                  <div className="tdp-address">📍 {selected.address}</div>
                  {selected.phone && <div className="tdp-phone">📞 {selected.phone}</div>}
                </div>
                <div className="tdp-dist">{selected.distance}</div>
              </div>

              <div className="tdp-amenities">
                {selected.amenities.map(a => (
                  <span key={a} className="amenity-tag">{a}</span>
                ))}
              </div>

              <div className="tdp-divider" />

              {/* Now playing at this theatre */}
              <div className="tdp-section-heading">
                Now Playing · {nowPlaying.length} film{nowPlaying.length !== 1 ? 's' : ''}
              </div>

              {nowPlaying.length > 0 ? (
                <div className="tdp-movie-list">
                  {nowPlaying.map(movie => (
                    <div key={movie.id} className="tdp-movie-row">
                      <div
                        className="tdp-movie-poster"
                        style={{ background: POSTER_GRADIENTS[movie.poster] || POSTER_GRADIENTS.mp1 }}
                      >
                        {movie.posterUrl && !imgErrors[movie.id]
                          ? <img
                              src={movie.posterUrl}
                              alt={movie.title}
                              className="tdp-movie-img"
                              onError={() => setImgErrors(prev => ({ ...prev, [movie.id]: true }))}
                            />
                          : <span className="tdp-movie-emoji">{movie.emoji}</span>
                        }
                      </div>
                      <div className="tdp-movie-info">
                        <div className="tdp-movie-title">{movie.title}</div>
                        <div className="tdp-movie-meta">{movie.genre} · {movie.runtime} · {movie.ageRating}</div>
                        <div className="tdp-time-chips">
                          {movie.slots.map((slot, i) => (
                            <span key={i} className="tdp-time-chip">
                              {formatTime(slot.dateTime)}
                              {slot.format && <span className="tdp-time-format">{slot.format.split('|')[0].trim()}</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tdp-empty">No showtimes found for today.</div>
              )}
            </>
          ) : (
            <div className="tdp-placeholder">
              <div className="tdp-placeholder-icon">🎬</div>
              <div className="tdp-placeholder-text">Select a theatre to see today's films and showtimes</div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TheatresPage;
