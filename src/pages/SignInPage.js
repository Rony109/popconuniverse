import React, { useState } from 'react';
import './AuthPages.css';

function SignInPage({ navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your auth backend
    console.log('Sign in:', { email, password, remember });
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: 70 }}>
      <div className="auth-page">
        {/* Visual panel */}
        <div className="auth-visual">
          <div className="auth-visual-bg" />
          <div className="auth-visual-content">
            <div className="auth-visual-icon">🍿</div>
            <h2 className="auth-visual-title">
              Welcome back to <span className="accent">Popcorn Universe</span>
            </h2>
            <p className="auth-visual-desc">
              Sign in to access your booking history, Kernels rewards points, and saved watchlist.
            </p>
            <div className="auth-perks">
              {[
                ['🎟️', 'Instant e-tickets delivered to your email'],
                ['🍁', 'Exclusive Canadian premiere early access'],
                ['🏆', 'Earn Kernels points on every purchase'],
                ['💳', 'Save payment info for faster checkout'],
                ['🔔', 'Get notified when your films drop'],
              ].map(([icon, text]) => (
                <div key={text} className="auth-perk">
                  <span className="perk-icon">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-form-area">
          <h1 className="auth-form-title">Sign In</h1>
          <p className="auth-form-sub">
            Don't have an account?{' '}
            <a onClick={() => navigate('join')}>Join Free →</a>
          </p>

          <div className="social-btns">
            <button className="social-btn">🍎 Apple</button>
            <button className="social-btn">G Google</button>
            <button className="social-btn">📘 Facebook</button>
          </div>
          <div className="auth-divider">or sign in with email</div>

          <form onSubmit={handleSubmit}>
            <div className="auth-field" style={{ marginBottom: 12 }}>
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@email.ca"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ marginTop: 6 }}
              />
            </div>
            <div className="auth-field" style={{ marginBottom: 14 }}>
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ marginTop: 6 }}
              />
            </div>
            <div className="remember-row">
              <label className="remember-check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a className="forgot-link">Forgot password?</a>
            </div>
            <button type="submit" className="auth-submit">
              Sign In to Popcorn Universe
            </button>
          </form>

          <p className="auth-terms">
            By signing in you agree to our <a>Terms of Service</a> and <a>Privacy Policy</a>.<br />
            Protected under Canada's PIPEDA privacy legislation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
