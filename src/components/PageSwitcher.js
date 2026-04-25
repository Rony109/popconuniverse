import React from 'react';
import './PageSwitcher.css';

const TABS = [
  { id: 'home',       label: '🏠' },
  { id: 'nowplaying', label: 'Now Playing' },
  { id: 'comingsoon', label: 'Coming Soon' },
  { id: 'theatres',   label: 'Theatres' },
  { id: 'giftcards',  label: 'Gift Cards' },
  { id: 'location',   label: '📍 Location' },
  { id: 'signin',     label: 'Sign In' },
  { id: 'join',       label: 'Join Free' },
];

function PageSwitcher({ currentPage, navigate }) {
  return (
    <div className="page-switcher">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`ps-btn ${currentPage === tab.id ? 'active' : ''}`}
          onClick={() => navigate(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default PageSwitcher;
