import React from 'react';
import logoLight from '../assets/logo/Logo-Light.png';
import './NavBar.css';

function NavBar({ currentPage, navigate, selectedCity }) {
  const navLinks = [
    { id: 'home',       label: 'Home' },
    { id: 'nowplaying', label: 'Now Playing' },
    { id: 'comingsoon', label: 'Coming Soon' },
    { id: 'theatres',   label: 'Theatres' },
    { id: 'giftcards',  label: 'Gift Cards' },
  ];

  const cityLabel = selectedCity
    ? `${selectedCity.label}, ${selectedCity.province}`
    : 'Select City';

  return (
    <nav className="nav-bar">
      <button className="logo" onClick={() => navigate('home')}>
        <img src={logoLight} alt="Popcorn Universe" className="logo-img" />
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
          📍 {cityLabel}
        </button>
        <button className="btn-ghost" onClick={() => navigate('signin')}>Sign In</button>
        <button className="btn-butter" onClick={() => navigate('join')}>Join Free</button>
      </div>
    </nav>
  );
}

export default NavBar;
