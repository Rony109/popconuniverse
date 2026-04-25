import React, { useState } from 'react';
import { POSTER_GRADIENTS } from '../data/mockData';

function MovieCard({ movie, variant = 'book', onAction }) {
  const gradient = POSTER_GRADIENTS[movie.poster] || POSTER_GRADIENTS.default || POSTER_GRADIENTS.mp1;
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = movie.posterUrl && !imgFailed;

  const handleAction = () => {
    if (onAction) onAction(movie);
  };

  const renderButton = () => {
    if (variant === 'remind')   return <button className="movie-remind-btn" onClick={handleAction}>🔔 Remind Me</button>;
    if (variant === 'preorder') return <button className="movie-book-btn"   onClick={handleAction}>Pre-Order</button>;
    return                              <button className="movie-book-btn"   onClick={handleAction}>View Details</button>;
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <div className="poster-gradient" style={{ background: gradient }}>
          {showImage
            ? <img
                src={movie.posterUrl}
                alt={movie.title}
                className="poster-img"
                onError={() => setImgFailed(true)}
              />
            : <span className="poster-emoji">{movie.emoji}</span>
          }
        </div>
        {movie.rating && <span className="rating-badge">{movie.rating}</span>}
        <span className="age-badge">{movie.ageRating}</span>
        {movie.releaseDate && <span className="coming-badge">{movie.releaseDate}</span>}
      </div>
      <div className="movie-info">
        <div className="movie-name">{movie.title}</div>
        <div className="movie-genre">{movie.genre} · {movie.runtime}</div>
        {renderButton()}
      </div>
    </div>
  );
}

export default MovieCard;
