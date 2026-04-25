import React from 'react';
import './NavBar.css';

function NavBar({ currentPage, navigate }) {
  const navLinks = [
    { id: 'home',       label: 'Home' },
    { id: 'nowplaying', label: 'Now Playing' },
    { id: 'comingsoon', label: 'Coming Soon' },
    { id: 'theatres',   label: 'Theatres' },
    { id: 'giftcards',  label: 'Gift Cards' },
  ];

  return (
    <nav className="nav-bar">
      <button className="logo" onClick={() => navigate('home')}>
        <span className="logo-icon">🍿</span>
        <div>
          <div className="logo-text">
            <span className="pop">Popcorn</span>
            <span className="uni"> Universe</span>
          </div>
          <span className="logo-sub">Canada's Movie Universe</span>
        </div>
      </button>

      <div className="nav-links">
        {navLinks.map(link => (
          <a
            key={link.id}
            className={currentPage === link.id ? 'active' : ''}
            onClick={() => navigate(link.id)}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="nav-right">
        <button className="nav-province" onClick={() => navigate('location')}>
          📍 Ontario, CA
        </button>
        <button className="btn-ghost" onClick={() => navigate('signin')}>Sign In</button>
        <button className="btn-butter" onClick={() => navigate('join')}>Join Free</button>
      </div>
    </nav>
  );
}

export default NavBar;
