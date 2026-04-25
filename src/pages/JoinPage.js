import React, { useState } from 'react';
import './AuthPages.css';

const PROVINCES = [
  'Ontario','British Columbia','Alberta','Quebec','Manitoba',
  'Saskatchewan','Nova Scotia','New Brunswick','PEI',
  'Newfoundland & Labrador','NWT','Yukon','Nunavut',
];

function JoinPage({ navigate }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', mobile: '',
    province: 'Ontario', postalCode: '', password: '', confirmPassword: '',
    agreeTerms: false, marketingEmails: true, frenchComms: false,
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your registration backend
    console.log('Register:', form);
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: 70 }}>
      <div className="join-page">
        {/* ── LEFT: registration form ── */}
        <div className="join-left">
          <h1 className="auth-form-title">Create Your Account</h1>
          <p className="auth-form-sub" style={{ marginBottom: 24 }}>
            Already a member? <a onClick={() => navigate('signin')}>Sign In →</a>
          </p>

          <div className="social-btns">
            <button className="social-btn">🍎 Apple</button>
            <button className="social-btn">G Google</button>
          </div>
          <div className="auth-divider">or register with email</div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" placeholder="Alex" value={form.firstName} onChange={e => update('firstName', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" placeholder="Morgan" value={form.lastName} onChange={e => update('lastName', e.target.value)} />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 13 }}>
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="alex@email.ca" value={form.email} onChange={e => update('email', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 13 }}>
              <label className="form-label">Mobile Number (Canadian)</label>
              <input className="form-input" placeholder="+1 (416) 555-0100" value={form.mobile} onChange={e => update('mobile', e.target.value)} />
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
            <div className="form-group" style={{ marginBottom: 13 }}>
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => update('password', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">Confirm Password</label>
              <input className="form-input" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
            </div>

            {/* Consent checkboxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.8rem', color: 'var(--muted)', cursor: 'pointer', lineHeight: 1.5 }}>
                <input type="checkbox" checked={form.agreeTerms} onChange={e => update('agreeTerms', e.target.checked)} style={{ accentColor: 'var(--butter)', marginTop: 2 }} />
                I agree to the <a style={{ color: 'var(--caramel)', marginLeft: 3 }}>Terms of Service</a>&nbsp;and&nbsp;<a style={{ color: 'var(--caramel)' }}>Privacy Policy</a> (PIPEDA compliant)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.8rem', color: 'var(--muted)', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.marketingEmails} onChange={e => update('marketingEmails', e.target.checked)} style={{ accentColor: 'var(--butter)' }} />
                Send me exclusive movie alerts, Kernels rewards &amp; promotions
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.8rem', color: 'var(--muted)', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.frenchComms} onChange={e => update('frenchComms', e.target.checked)} style={{ accentColor: 'var(--butter)' }} />
                Receive communications in French (Français)
              </label>
            </div>

            <button type="submit" className="auth-submit">Create My Free Account 🍿</button>
          </form>
        </div>

        {/* ── RIGHT: membership tiers ── */}
        <div className="join-right">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="page-hero-tag" style={{ marginBottom: 20 }}>🏆 Choose Your Plan</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>
              Kernels Membership
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: 24 }}>
              Start free and upgrade anytime. No credit card required for the free tier.
            </p>
            <div className="membership-cards">
              <div className="membership-card">
                <div className="mc-header">
                  <div className="mc-name">🍿 Free</div>
                  <div className="mc-price">$0 / mo</div>
                </div>
                <div className="mc-features">
                  {['Book tickets at 300+ theatres','E-tickets by email','Basic Kernels points (1×)','Watchlist (up to 10 films)'].map(f => (
                    <div key={f} className="mc-feature"><span className="check">✓</span> {f}</div>
                  ))}
                </div>
              </div>
              <div className="membership-card featured">
                <div className="mc-header">
                  <div className="mc-name">🌟 Kernels Plus</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="mc-price">$8.99 / mo</div>
                    <span className="mc-badge">POPULAR</span>
                  </div>
                </div>
                <div className="mc-features">
                  {['Everything in Free','2× Kernels points on every booking','1 free popcorn per month','Early access to premiere tickets','No online booking fees','Unlimited watchlist'].map(f => (
                    <div key={f} className="mc-feature"><span className="check">✓</span> {f}</div>
                  ))}
                </div>
              </div>
              <div className="membership-card">
                <div className="mc-header">
                  <div className="mc-name">💎 Universe Pass</div>
                  <div className="mc-price">$19.99 / mo</div>
                </div>
                <div className="mc-features">
                  {['Everything in Kernels Plus','Unlimited movies (1/day)','Free IMAX upgrades (2/mo)','VIP lounge access','Guest passes (2/mo)'].map(f => (
                    <div key={f} className="mc-feature"><span className="check">✓</span> {f}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
