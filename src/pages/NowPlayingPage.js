import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { NOW_PLAYING } from '../data/mockData';
import './NowPlayingPage.css';

const GENRES = [
  'All Genres', 'Action', 'Adventure', 'Animated', 'Biography',
  'Comedy', 'Documentary', 'Drama', 'Fantasy', 'Horror',
  'Music', 'Mystery', 'Romance', 'Science fiction', 'Thriller',
];
const AGE_RATINGS = ['All Ratings', 'G', 'PG', 'PG-13', 'R', 'NR'];
const SORT_OPTIONS = ['Popularity', 'Rating', 'Release Date', 'Alphabetical'];

function NowPlayingPage({ navigate, onSelectMovie }) {
  const [activeSort, setActiveSort] = useState('Popularity');
  const [checkedGenres, setCheckedGenres] = useState(['All Genres']);
  const [checkedAges, setCheckedAges] = useState(['All Ratings']);

  const toggleGenre = (g) => {
    if (g === 'All Genres') { setCheckedGenres(['All Genres']); return; }
    setCheckedGenres(prev => {
      const without = prev.filter(v => v !== 'All Genres');
      return without.includes(g) ? (without.filter(v => v !== g).length ? without.filter(v => v !== g) : ['All Genres']) : [...without, g];
    });
  };

  const toggleAge = (r) => {
    if (r === 'All Ratings') { setCheckedAges(['All Ratings']); return; }
    setCheckedAges(prev => {
      const without = prev.filter(v => v !== 'All Ratings');
      return without.includes(r) ? (without.filter(v => v !== r).length ? without.filter(v => v !== r) : ['All Ratings']) : [...without, r];
    });
  };

  const filtered = NOW_PLAYING.filter(movie => {
    if (!checkedGenres.includes('All Genres')) {
      const hasGenre = (movie.genres || []).some(g => checkedGenres.includes(g));
      if (!hasGenre) return false;
    }
    if (!checkedAges.includes('All Ratings')) {
      if (!checkedAges.includes(movie.ageRating)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === 'Alphabetical') return a.title.localeCompare(b.title);
    if (activeSort === 'Release Date') return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
    return 0;
  });

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-tag">🎬 Toronto, ON · Updated Today</div>
        <h1 className="page-hero-title">Now Playing</h1>
        <p className="page-hero-desc">{NOW_PLAYING.length} films showing across theatres in the Greater Toronto Area this week.</p>
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
                  onChange={() => toggleGenre(g)}
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
                  onChange={() => toggleAge(r)}
                />
                {r}
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
            <span className="np-results-count">Showing {sorted.length} of {NOW_PLAYING.length} films</span>
          </div>

          <div className="movies-grid-4">
            {sorted.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                variant="book"
                onAction={() => { onSelectMovie(movie); navigate('moviedescription'); }}
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
