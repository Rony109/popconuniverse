import React, { useState } from 'react';
import Footer from '../components/Footer';
import { GIFT_CARD_DESIGNS } from '../data/mockData';
import './GiftCardsPage.css';

const AMOUNTS = [25, 50, 100, 150, 200, 'Custom'];

function GiftCardsPage() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');

  return (
    <div className="page-wrapper">
      <div className="giftcard-hero">
        <h1 className="gc-title">Give the Gift of <span className="accent">Movies 🍿</span></h1>
        <p className="gc-desc">
          Share the magic of cinema with friends and family. Digital gift cards delivered instantly
          by email — redeemable at 300+ theatres across Canada.
        </p>

        {/* Card designs */}
        <div className="gc-cards">
          {GIFT_CARD_DESIGNS.map((card, i) => (
            <div
              key={card.id}
              className={`gc-card ${selectedCard === i ? 'selected' : ''}`}
              style={{ background: card.gradient }}
              onClick={() => { setSelectedCard(i); setSelectedAmount(card.amount); }}
            >
              <div className="gc-card-content">
                <div className="gc-logo"><span>Popcorn</span> Universe</div>
                <div>
                  <div className="gc-amount">${card.amount}</div>
                  <div className="gc-tagline">{card.tagline}</div>
                </div>
              </div>
              <div className="gc-chip" />
            </div>
          ))}
        </div>
      </div>

      <div className="gc-purchase-section">
        <div className="gc-purchase-left">
          <div className="form-section-label">01 &nbsp; Choose Amount</div>
          <div className="gc-amounts">
            {AMOUNTS.map(amt => (
              <button
                key={amt}
                className={`gc-amt-btn ${selectedAmount === amt ? 'active' : ''}`}
                onClick={() => setSelectedAmount(amt)}
              >
                {typeof amt === 'number' ? `$${amt}` : amt}
              </button>
            ))}
          </div>
          {selectedAmount === 'Custom' && (
            <div className="form-group" style={{ marginTop: 12, maxWidth: 220 }}>
              <label className="form-label">Custom Amount (CAD)</label>
              <input
                className="form-input"
                type="number"
                min="10" max="500"
                placeholder="e.g. $75"
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
              />
            </div>
          )}

          <div className="form-section-label" style={{ marginTop: 28 }}>02 &nbsp; Recipient Details</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Recipient Name</label>
              <input className="form-input" placeholder="Alex Morgan" />
            </div>
            <div className="form-group">
              <label className="form-label">Recipient Email</label>
              <input className="form-input" placeholder="alex@email.ca" />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 13 }}>
            <label className="form-label">Personal Message (optional)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Enjoy the show! 🍿"
              style={{ resize: 'vertical' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Delivery Date</label>
            <input className="form-input" type="date" />
          </div>
          <button className="btn-primary" style={{ width: '100%' }}>
            Purchase Gift Card — ${typeof selectedAmount === 'number' ? selectedAmount : customAmount || '?'} CAD
          </button>
        </div>

        <div className="gc-purchase-right">
          <div className="gc-preview-label">Card Preview</div>
          <div
            className="gc-preview-card"
            style={{ background: GIFT_CARD_DESIGNS[selectedCard]?.gradient }}
          >
            <div className="gc-card-content">
              <div className="gc-logo"><span>Popcorn</span> Universe</div>
              <div>
                <div className="gc-amount">${typeof selectedAmount === 'number' ? selectedAmount : customAmount || '??'}</div>
                <div className="gc-tagline">Movie Magic Gift Card</div>
              </div>
            </div>
            <div className="gc-chip" />
          </div>
          <div className="gc-info-box">
            <div className="gc-info-item">✓ Delivered instantly by email</div>
            <div className="gc-info-item">✓ Redeemable at 300+ theatres Canada-wide</div>
            <div className="gc-info-item">✓ Never expires</div>
            <div className="gc-info-item">✓ HST-inclusive pricing</div>
            <div className="gc-info-item">✓ PIPEDA compliant</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GiftCardsPage;
