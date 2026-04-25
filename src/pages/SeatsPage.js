import React, { useState } from 'react';
import { SEAT_ROWS } from '../data/mockData';
import './SeatsPage.css';

/**
 * Parse seat token:
 *  'GAP'      → gap element
 *  'p'        → premium available
 *  'p-taken'  → premium taken
 *  'p-sel'    → premium pre-selected
 *  'taken'    → standard taken
 *  ''         → standard available
 */
function parseSeat(token, rowLabel, seatIdx) {
  const isGap     = token === 'GAP';
  const isPremium = token.startsWith('p');
  const isTaken   = token.includes('taken');
  const isPreSel  = token.includes('sel');
  return { isGap, isPremium, isTaken, isPreSel, id: `${rowLabel}${seatIdx + 1}` };
}

function SeatsPage({ navigate }) {
  const [selected, setSelected] = useState(new Set(['A5', 'A6']));

  const toggleSeat = (id, isTaken) => {
    if (isTaken) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const vipSeats   = [...selected].filter(id => ['A','B'].includes(id[0]));
  const stdSeats   = [...selected].filter(id => !['A','B'].includes(id[0]));
  const vipPrice   = vipSeats.length * 19;
  const stdPrice   = stdSeats.length * 14.5;
  const imaxSurcharge = selected.size > 0 ? 6 : 0;
  const onlineFee  = selected.size > 0 ? 3.5 : 0;
  const subtotal   = vipPrice + stdPrice + imaxSurcharge + onlineFee;

  return (
    <div className="page-wrapper">
      <div className="seat-page">
        {/* Header */}
        <div className="seat-header">
          <div className="seat-movie-info">
            <h2>Nebula Protocol 🍿</h2>
            <div className="seat-movie-meta">
              Cineplex IMAX — Yonge-Eglinton, Toronto · Tue 18 Feb 2026 · 4:00 PM EST · IMAX · 14A
            </div>
          </div>
          <button className="btn-butter">Change Showtime</button>
        </div>

        <div className="seat-main">
          {/* Seat map */}
          <div className="seat-map-area">
            <div className="screen-label" />
            <div className="screen-text">🍿 Screen — All eyes this way 🍿</div>

            <div className="seat-grid-wrap">
              {SEAT_ROWS.map(row => {
                let seatCounter = 0;
                return (
                  <div key={row.label} className="seat-row">
                    <div className="row-label">{row.label}</div>
                    <div className="seats-in-row">
                      {row.seats.map((token, i) => {
                        if (token === 'GAP') {
                          return <div key={`gap-${i}`} className="seat-gap" />;
                        }
                        const seatData = parseSeat(token, row.label, seatCounter);
                        seatCounter++;
                        const isSelected = selected.has(seatData.id) || seatData.isPreSel;
                        const classes = [
                          'seat',
                          seatData.isPremium ? 'premium' : '',
                          seatData.isTaken ? 'taken' : '',
                          (isSelected && !seatData.isTaken) ? 'selected' : '',
                        ].filter(Boolean).join(' ');

                        return (
                          <div
                            key={seatData.id}
                            className={classes}
                            title={seatData.id}
                            onClick={() => toggleSeat(seatData.id, seatData.isTaken)}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="seat-legend">
              <div className="legend-item"><div className="legend-box lb-avail" /> Available</div>
              <div className="legend-item"><div className="legend-box lb-selected" /> Selected</div>
              <div className="legend-item"><div className="legend-box lb-taken" /> Taken</div>
              <div className="legend-item"><div className="legend-box lb-premium" /> VIP Premium</div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="seat-sidebar">
            <div className="sidebar-title">Your Selection 🍿</div>
            <div className="selected-seats-display">
              {[...selected].length === 0 && (
                <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>No seats selected</div>
              )}
              {[...selected].map(id => (
                <span key={id} className="selected-tag">{id}</span>
              ))}
              <div style={{ color: 'var(--muted)', fontSize: '0.72rem', marginTop: 10 }}>
                Click seats to select / deselect
              </div>
            </div>

            {vipSeats.length > 0 && (
              <div className="price-row">
                <span>{vipSeats.length}× VIP Seats</span>
                <span className="price-val">${vipPrice.toFixed(2)}</span>
              </div>
            )}
            {stdSeats.length > 0 && (
              <div className="price-row">
                <span>{stdSeats.length}× Standard Seats</span>
                <span className="price-val">${stdPrice.toFixed(2)}</span>
              </div>
            )}
            {selected.size > 0 && (
              <>
                <div className="price-row">
                  <span>IMAX Surcharge</span>
                  <span className="price-val">${imaxSurcharge.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Online Fee</span>
                  <span className="price-val">${onlineFee.toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="price-row total">
              <span>Subtotal (CAD)</span>
              <span className="price-val">${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginBottom: 14 }}>
              *HST (13%) applied at checkout
            </div>

            <button
              className="proceed-btn"
              disabled={selected.size === 0}
              onClick={() => navigate('checkout')}
            >
              Proceed to Checkout →
            </button>
            <div style={{ color: 'var(--muted)', fontSize: '0.68rem', textAlign: 'center', marginTop: 12 }}>
              Seats held for 8 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatsPage;
