import React, { useState } from 'react';
import './CheckoutPage.css';

const PAYMENT_METHODS = [
  { id: 'credit', icon: '💳', label: 'Credit Card' },
  { id: 'interac', icon: '🏦', label: 'Interac' },
  { id: 'mobile', icon: '📱', label: 'Apple/Google Pay' },
  { id: 'gift', icon: '🎁', label: 'Gift Card' },
];

const PROVINCES = ['Ontario','British Columbia','Alberta','Quebec','Manitoba','Saskatchewan','Nova Scotia','New Brunswick','PEI','Newfoundland & Labrador','NWT','Yukon','Nunavut'];

function CheckoutPage({ navigate }) {
  const [payMethod, setPayMethod] = useState('credit');
  const [promo, setPromo] = useState('');
  const [form, setForm] = useState({
    firstName: 'Alex', lastName: 'Morgan',
    email: 'alex@email.ca', mobile: '',
    province: 'Ontario', postalCode: '',
    cardNumber: '', cardName: 'Alex Morgan', expiry: '', cvv: '',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    // TODO: submit to payment backend
    console.log('Checkout:', { form, payMethod, promo });
    alert('Booking confirmed! Your e-ticket has been sent to your email. 🎟️');
  };

  const subtotal = 47.50;
  const hst = subtotal * 0.13;
  const total = subtotal + hst;

  return (
    <div className="page-wrapper">
      <div className="checkout-layout">
        {/* ── FORM AREA ── */}
        <div className="checkout-form-area">
          <h1 className="checkout-title">Complete Booking 🍿</h1>

          {/* 01 Contact */}
          <div style={{ marginBottom: 30 }}>
            <div className="form-section-label">01 &nbsp; Contact Details</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" value={form.firstName} onChange={e => update('firstName', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" value={form.lastName} onChange={e => update('lastName', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile (Canada)</label>
                <input className="form-input" placeholder="+1 (416) 555-0100" value={form.mobile} onChange={e => update('mobile', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Province</label>
                <select className="form-select" value={form.province} onChange={e => update('province', e.target.value)}>
                  {PROVINCES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input className="form-input" placeholder="M4Y 1C1" value={form.postalCode} onChange={e => update('postalCode', e.target.value)} />
              </div>
            </div>
          </div>

          {/* 02 Payment */}
          <div style={{ marginBottom: 30 }}>
            <div className="form-section-label">02 &nbsp; Payment Method</div>
            <div className="payment-methods">
              {PAYMENT_METHODS.map(pm => (
                <div
                  key={pm.id}
                  className={`pay-method ${payMethod === pm.id ? 'selected' : ''}`}
                  onClick={() => setPayMethod(pm.id)}
                >
                  <div className="pay-method-icon">{pm.icon}</div>
                  <div className="pay-method-name">{pm.label}</div>
                </div>
              ))}
            </div>

            {payMethod === 'credit' && (
              <>
                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="form-label">Card Number</label>
                  <input className="form-input" placeholder="0000 0000 0000 0000" value={form.cardNumber} onChange={e => update('cardNumber', e.target.value)} />
                </div>
                <div className="card-row">
                  <div className="form-group">
                    <label className="form-label">Name on Card</label>
                    <input className="form-input" value={form.cardName} onChange={e => update('cardName', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expiry</label>
                    <input className="form-input" placeholder="MM/YY" value={form.expiry} onChange={e => update('expiry', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input className="form-input" placeholder="•••" value={form.cvv} onChange={e => update('cvv', e.target.value)} />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 03 Promo */}
          <div>
            <div className="form-section-label">03 &nbsp; Promo / Scene+ Code</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                className="form-input"
                placeholder="Enter promo or Scene+ code"
                style={{ flex: 1 }}
                value={promo}
                onChange={e => setPromo(e.target.value)}
              />
              <button className="btn-ghost" style={{ padding: '11px 18px', whiteSpace: 'nowrap' }}>Apply</button>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', marginTop: 20, fontSize: '0.75rem', color: 'var(--muted)' }}>
            ♿ Need accessible seating?{' '}
            <a style={{ color: 'var(--butter)', textDecoration: 'none', cursor: 'pointer' }}>
              Request wheelchair / companion seats
            </a>{' '}
            — available at all partnered theatres.
          </div>
        </div>

        {/* ── ORDER SUMMARY ── */}
        <div className="checkout-summary">
          <div className="summary-title">Order Summary</div>
          <div className="summary-movie-card">
            <div className="summary-poster">🌌</div>
            <div className="summary-movie-info">
              <div className="summary-movie-title">Nebula Protocol</div>
              <div className="summary-movie-meta">
                IMAX · English<br />
                Tue, 18 Feb 2026 · 4:00 PM EST<br />
                Cineplex — Yonge-Eglinton, Toronto<br />
                Seats: A5, A6 (VIP) · 14A
              </div>
            </div>
          </div>

          <div className="summary-row">
            <span className="summary-row-label">2× VIP Seats</span>
            <span className="summary-row-val">$38.00</span>
          </div>
          <div className="summary-row">
            <span className="summary-row-label">IMAX Surcharge</span>
            <span className="summary-row-val">$6.00</span>
          </div>
          <div className="summary-row">
            <span className="summary-row-label">Online Booking Fee</span>
            <span className="summary-row-val">$3.50</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
          <div className="summary-row">
            <span className="summary-row-label">Subtotal</span>
            <span className="summary-row-val">${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-row-label">HST (13% · Ontario)</span>
            <span className="summary-row-val">${hst.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span className="summary-total-label">Total (CAD)</span>
            <span className="summary-total-val">${total.toFixed(2)}</span>
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--muted)', textAlign: 'right', marginTop: 4 }}>
            HST rate varies by province
          </div>

          <button className="checkout-submit" onClick={handleSubmit}>
            Pay CAD ${total.toFixed(2)} Securely 🍿
          </button>
          <div className="secure-note">
            🔒 256-bit SSL ·{' '}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', background: 'var(--surface)', border: '1px solid var(--border)', padding: '2px 7px', borderRadius: 3 }}>
              PCI DSS
            </span>{' '}
            · Instant e-ticket
          </div>
          <div style={{ marginTop: 12, fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
            By booking you agree to our Terms &amp; Privacy Policy (PIPEDA compliant).<br />
            Tickets non-refundable unless show is cancelled.
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
