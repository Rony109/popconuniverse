import React, { useState } from 'react';
import Footer from '../components/Footer';
import './LocationPage.css';

const CITIES = [
  { id: 'toronto',   label: 'Toronto',   province: 'ON', top: '55%', left: '65%' },
  { id: 'vancouver', label: 'Vancouver', province: 'BC', top: '40%', left: '15%' },
  { id: 'calgary',   label: 'Calgary',   province: 'AB', top: '38%', left: '32%' },
  { id: 'edmonton',  label: 'Edmonton',  province: 'AB', top: '32%', left: '30%' },
  { id: 'ottawa',    label: 'Ottawa',    province: 'ON', top: '58%', left: '72%' },
  { id: 'montreal',  label: 'Montréal',  province: 'QC', top: '60%', left: '78%' },
  { id: 'halifax',   label: 'Halifax',   province: 'NS', top: '62%', left: '88%' },
  { id: 'winnipeg',  label: 'Winnipeg',  province: 'MB', top: '45%', left: '47%' },
];

const PROVINCES = [
  'Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba',
  'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland & Labrador',
  'Prince Edward Island', 'NWT', 'Yukon', 'Nunavut',
];

function LocationPage({ navigate, selectedCity, onSelectCity }) {
  const [localCityId, setLocalCityId] = useState(selectedCity?.id || 'toronto');
  const [selectedProvince, setSelectedProvince] = useState('Ontario');
  const [postalCode, setPostalCode] = useState('');

  function handleCityClick(city) {
    setLocalCityId(city.id);
    onSelectCity({ id: city.id, label: city.label, province: city.province });
  }

  function handleConfirm() {
    navigate('home');
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="page-hero-tag">📍 Your Location</div>
        <h1 className="page-hero-title">Choose Your City</h1>
        <p className="page-hero-desc">Select your city to see local showtimes, theatres, and promotions.</p>
      </div>

      <div className="location-layout">
        {/* Sidebar */}
        <div className="loc-sidebar">
          <div className="loc-section-label">Province</div>
          <select
            className="form-select"
            value={selectedProvince}
            onChange={e => setSelectedProvince(e.target.value)}
            style={{ marginBottom: 20 }}
          >
            {PROVINCES.map(p => <option key={p}>{p}</option>)}
          </select>

          <div className="loc-section-label">Postal Code</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <input
              className="form-input"
              placeholder="M4Y 1C1"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
            />
            <button className="btn-caramel" style={{ whiteSpace: 'nowrap' }}>Search</button>
          </div>

          <div className="loc-section-label">Quick-Select City</div>
          <div className="city-buttons">
            {CITIES.map(city => (
              <button
                key={city.id}
                className={`city-btn ${localCityId === city.id ? 'active' : ''}`}
                onClick={() => handleCityClick(city)}
              >
                {city.label}
              </button>
            ))}
          </div>

          <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={handleConfirm}>
            ✓ Confirm Location
          </button>
        </div>

        {/* Canada map */}
        <div className="loc-map-area">
          <div className="map-placeholder" style={{ minHeight: 420 }}>
            <div className="map-grid" />
            <div className="canada-map-inner">
              <div
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  letterSpacing: '0.2em', color: 'var(--muted)',
                  opacity: 0.3, marginBottom: 20, textAlign: 'center',
                }}
              >
                CANADA
              </div>
              <div style={{ position: 'relative', width: 600, height: 300 }}>
                {CITIES.map(city => (
                  <div
                    key={city.id}
                    className={`city-pin ${localCityId === city.id ? 'active' : ''}`}
                    style={{ top: city.top, left: city.left }}
                    title={city.label}
                    onClick={() => handleCityClick(city)}
                  >
                    {localCityId === city.id ? '📍' : '📌'}
                    <div className="city-dot-label">{city.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.75rem', opacity: 0.5, marginTop: 16, textAlign: 'center' }}>
                Click a city to select location
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LocationPage;
