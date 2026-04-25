import React, { useState, useMemo } from 'react';
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

// Haversine great-circle distance in km
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const GPS_LABELS = {
  idle:        null,
  loading:     'Getting your location…',
  success:     'Sorted by distance from you',
  denied:      'Location access was denied',
  error:       'Could not get your location',
  unsupported: 'GPS not supported in this browser',
};

function TheatresPage({ navigate }) {
  const [selectedId, setSelectedId]   = useState(null);
  const [search, setSearch]           = useState('');
  const [imgErrors, setImgErrors]     = useState({});
  const [userLocation, setUserLocation] = useState(null);   // { lat, lon }
  const [gpsStatus, setGpsStatus]     = useState('idle');   // idle|loading|success|denied|error|unsupported

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setGpsStatus('unsupported');
      return;
    }
    setGpsStatus('loading');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setGpsStatus('success');
      },
      err => {
        setGpsStatus(err.code === err.PERMISSION_DENIED ? 'denied' : 'error');
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }

  // Build the sorted+filtered list, recalculating distances when userLocation changes
  const displayTheatres = useMemo(() => {
    let list = THEATRES.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase()) ||
      t.postalCode.toLowerCase().includes(search.toLowerCase())
    );

    if (userLocation) {
      list = list
        .map(t => ({
          ...t,
          computedDist: haversine(
            userLocation.lat, userLocation.lon,
            parseFloat(t.geoCode.latitude),
            parseFloat(t.geoCode.longitude)
          ),
        }))
        .sort((a, b) => a.computedDist - b.computedDist);
    }

    return list;
  }, [search, userLocation]);

  const selected   = THEATRES.find(t => t.id === selectedId) || null;
  const nowPlaying = selected ? (MOVIES_BY_THEATRE[selected.id] || []) : [];

  // Distance label: computed from GPS if available, else from JSON default
  const distLabel = t =>
    t.computedDist !== undefined ? `${t.computedDist.toFixed(1)} km` : t.distance;

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-tag">📍 {THEATRES.length} Theatres · Updated Today</div>
        <h1 className="page-hero-title">Theatres Near You</h1>
        <p className="page-hero-desc">Find your nearest cinema. Search by name, postal code, or neighbourhood.</p>
      </div>

      {/* ── SEARCH + LOCATION BAR ── */}
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

        <button
          className={`gps-btn ${gpsStatus}`}
          onClick={handleUseMyLocation}
          disabled={gpsStatus === 'loading'}
        >
          {gpsStatus === 'loading' ? '⏳' : '📍'}
          {gpsStatus === 'loading' ? ' Locating…' : ' Use My Location'}
        </button>

        {GPS_LABELS[gpsStatus] && (
          <span className={`gps-status gps-status--${gpsStatus}`}>
            {GPS_LABELS[gpsStatus]}
          </span>
        )}
      </div>

      <div className="theatres-layout">
        {/* ── THEATRE LIST ── */}
        <div className="theatres-list">
          {displayTheatres.map(theatre => (
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
                <div className="theatre-dist">{distLabel(theatre)}</div>
                <div className="theatre-film-count">
                  {(MOVIES_BY_THEATRE[theatre.id] || []).length} films
                </div>
              </div>
            </div>
          ))}
          {displayTheatres.length === 0 && (
            <div style={{ padding: '24px', color: 'var(--muted)', textAlign: 'center' }}>
              No theatres match your search.
            </div>
          )}
        </div>

        {/* ── DETAIL PANEL ── */}
        <div className="theatre-detail-panel">
          {selected ? (
            <>
              <div className="tdp-header">
                <div>
                  <div className="tdp-name">{selected.name}</div>
                  <div className="tdp-chain">{selected.chain}</div>
                  <div className="tdp-address">📍 {selected.address}</div>
                  {selected.phone && <div className="tdp-phone">📞 {selected.phone}</div>}
                </div>
                <div className="tdp-dist">
                  {displayTheatres.find(t => t.id === selected.id)
                    ? distLabel(displayTheatres.find(t => t.id === selected.id))
                    : selected.distance}
                </div>
              </div>

              <div className="tdp-amenities">
                {selected.amenities.map(a => (
                  <span key={a} className="amenity-tag">{a}</span>
                ))}
              </div>

              <div className="tdp-divider" />

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
