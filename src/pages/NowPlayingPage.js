import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { NOW_PLAYING } from '../data/mockData';
import './NowPlayingPage.css';

const GENRES = ['All Genres', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Animation', 'Thriller', 'Fantasy'];
const AGE_RATINGS = ['All Ratings', 'G', 'PG', '14A', '18A', 'R (Restricted)'];
const EXPERIENCES = ['IMAX', '4DX', 'DBOX', 'VIP', 'Standard', 'Français (FR)'];
const LANGUAGES = ['English', 'French (FR)', 'Hindi', 'Korean', 'Mandarin'];
const SORT_OPTIONS = ['Popularity', 'Rating', 'Release Date', 'Alphabetical'];

function NowPlayingPage({ navigate }) {
  const [activeSort, setActiveSort] = useState('Popularity');
  const [checkedGenres, setCheckedGenres] = useState(['All Genres']);
  const [checkedAges, setCheckedAges] = useState(['All Ratings']);
  const [checkedExp, setCheckedExp] = useState([]);
  const [checkedLang, setCheckedLang] = useState(['English']);

  const toggleCheck = (setter, list, value, isAll) => {
    setter(prev => {
      if (isAll) return [value];
      const filtered = prev.filter(v => v !== 'All Genres' && v !== 'All Ratings');
      if (filtered.includes(value)) return filtered.filter(v => v !== value) || ['All Genres'];
      return [...filtered, value];
    });
  };

  // Sort movies based on active sort
  const sortedMovies = [...NOW_PLAYING].sort((a, b) => {
    if (activeSort === 'Rating') return b.rating - a.rating;
    if (activeSort === 'Alphabetical') return a.title.localeCompare(b.title);
    if (activeSort === 'Release Date') return b.id - a.id;
    return 0; // Popularity: keep default order
  });

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-tag">🎬 Toronto, ON · Updated Today</div>
        <h1 className="page-hero-title">Now Playing</h1>
        <p className="page-hero-desc">50 films showing across 12 theatres in the Greater Toronto Area this week.</p>
      </div>

      <div className="np-layout">
        {/* ── SIDEBAR FILTERS ── */}
        <aside className="np-sidebar">
          <div className="np-sidebar-title">Filter</div>

          <div className="np-filter-group">
            <span className="np-filter-label">Genre</span>
            {GENRES.map(g => (
              <label key={g} className="np-check">
                <input
                  type="checkbox"
                  checked={checkedGenres.includes(g)}
                  onChange={() => toggleCheck(setCheckedGenres, checkedGenres, g, g === 'All Genres')}
                />
                {g}
              </label>
            ))}
          </div>

          <div className="np-filter-group">
            <span className="np-filter-label">Age Rating</span>
            {AGE_RATINGS.map(r => (
              <label key={r} className="np-check">
                <input
                  type="checkbox"
                  checked={checkedAges.includes(r)}
                  onChange={() => toggleCheck(setCheckedAges, checkedAges, r, r === 'All Ratings')}
                />
                {r}
              </label>
            ))}
          </div>

          <div className="np-filter-group">
            <span className="np-filter-label">Experience</span>
            {EXPERIENCES.map(e => (
              <label key={e} className="np-check">
                <input
                  type="checkbox"
                  checked={checkedExp.includes(e)}
                  onChange={() => setCheckedExp(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e])}
                />
                {e}
              </label>
            ))}
          </div>

          <div className="np-filter-group">
            <span className="np-filter-label">Language</span>
            {LANGUAGES.map(l => (
              <label key={l} className="np-check">
                <input
                  type="checkbox"
                  checked={checkedLang.includes(l)}
                  onChange={() => setCheckedLang(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])}
                />
                {l}
              </label>
            ))}
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="np-content">
          <div className="np-sort">
            <span className="np-sort-label">Sort by:</span>
            {SORT_OPTIONS.map(opt => (
              <div
                key={opt}
                className={`sort-pill ${activeSort === opt ? 'active' : ''}`}
                onClick={() => setActiveSort(opt)}
              >
                {opt}
              </div>
            ))}
            <span className="np-results-count">Showing {sortedMovies.length} of 50 films</span>
          </div>

          <div className="movies-grid-4">
            {sortedMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                variant="book"
                onAction={() => navigate('seats')}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NowPlayingPage;
