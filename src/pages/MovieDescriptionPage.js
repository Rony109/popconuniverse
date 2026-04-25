import React, { useState } from 'react';
import { POSTER_GRADIENTS, THEATRE_LOOKUP } from '../data/mockData';
import Footer from '../components/Footer';
import './MovieDescriptionPage.css';

function formatTime(dateTimeStr) {
  const timePart = dateTimeStr.split('T')[1] || dateTimeStr;
  const [h, m] = timePart.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function groupShowtimesByTheatre(showtimes) {
  const map = {};
  for (const s of showtimes) {
    if (!map[s.theatreId]) {
      const theatre = THEATRE_LOOKUP[s.theatreId];
      map[s.theatreId] = {
        name: s.theatreName,
        address: theatre?.address || '',
        postalCode: theatre?.postalCode || '',
        slots: [],
      };
    }
    map[s.theatreId].slots.push({ time: formatTime(s.dateTime), format: s.format });
  }
  return Object.values(map);
}

function MovieDescriptionPage({ movie, navigate }) {
  if (!movie) {
    return (
      <div className="page-wrapper">
        <div className="mdp-empty">
          <p>No movie selected.</p>
          <button className="btn-butter" onClick={() => navigate('nowplaying')}>Browse Films</button>
        </div>
      </div>
    );
  }

  const [imgFailed, setImgFailed] = useState(false);
  const posterGradient = POSTER_GRADIENTS[movie.poster] || POSTER_GRADIENTS.default || POSTER_GRADIENTS.mp1;
  const showImage = movie.posterUrlLarge && !imgFailed;
  const showtimeGroups = groupShowtimesByTheatre(movie.showtimes || []);

  return (
    <div className="page-wrapper mdp-wrapper">
      <div className="mdp-layout">
        {/* ── POSTER PANEL ── */}
        <div className="mdp-poster" style={{ background: posterGradient }}>
          {showImage
            ? <img
                src={movie.posterUrlLarge}
                alt={movie.title}
                className="mdp-poster-img"
                onError={() => setImgFailed(true)}
              />
            : <div className="mdp-poster-emoji">{movie.emoji}</div>
          }
          <button className="mdp-back" onClick={() => navigate('nowplaying')}>
            ← Now Playing
          </button>
          <div className="mdp-age-badge">{movie.ageRating}</div>
        </div>

        {/* ── DETAIL PANEL ── */}
        <div className="mdp-detail">
          <h1 className="mdp-title">{movie.title}</h1>

          <div className="mdp-meta">
            {movie.genre} · {movie.runtime} · {movie.language}
          </div>

          <div className="mdp-badges">
            <span className="mdp-age">{movie.ageRating}</span>
            {movie.releaseYear && <span className="mdp-year">{movie.releaseYear}</span>}
          </div>

          {movie.synopsis && <p className="mdp-synopsis">{movie.synopsis}</p>}

          <div className="mdp-divider" />

          <div className="mdp-details-grid">
            {movie.director && <>
              <span className="mdp-detail-label">Director</span>
              <span className="mdp-detail-value">{movie.director}</span>
            </>}
            {movie.cast?.length > 0 && <>
              <span className="mdp-detail-label">Cast</span>
              <span className="mdp-detail-value">{movie.cast.join(', ')}</span>
            </>}
            <span className="mdp-detail-label">Language</span>
            <span className="mdp-detail-value">{movie.language}</span>
            <span className="mdp-detail-label">Runtime</span>
            <span className="mdp-detail-value">{movie.runtime}</span>
          </div>

          {/* ── SHOWTIMES ── */}
          {showtimeGroups.length > 0 && <>
            <div className="mdp-divider" />
            <div className="mdp-showtimes-section">
              <div className="mdp-section-heading">🎟️ Showtimes — Today, Apr 25</div>
              <div className="mdp-showtime-list">
                {showtimeGroups.map((group, i) => (
                  <div key={i} className="mdp-showtime-row">
                    <div className="mdp-st-theatre">{group.name}</div>
                    {group.address && <div className="mdp-st-address">{group.address}</div>}
                    <div className="mdp-st-times">
                      {group.slots.map((slot, j) => (
                        <span key={j} className="mdp-st-time-chip">
                          {slot.time}
                          {slot.format && <span className="mdp-st-format">{slot.format.split('|')[0].trim()}</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>}

          <div className="mdp-divider" />

          <button className="btn-butter mdp-cta" onClick={() => navigate('theatres')}>
            Find a Theatre →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDescriptionPage;
