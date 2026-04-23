import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Fraunces:ital,wght@0,300;1,300&display=swap');

  .login-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4f6f9;
    padding: 2rem;
    box-sizing: border-box;
  }
  .login-card {
    background: #ffffff;
    border: 0.5px solid #e0e0e0;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }
  .login-eyebrow {
    font-family: 'Fraunces', serif;
    font-weight: 300;
    font-style: italic;
    font-size: 13px;
    color: #888;
    letter-spacing: 0.02em;
    margin: 0 0 6px;
  }
  .login-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 26px;
    font-weight: 500;
    color: #1a1a1a;
    margin: 0 0 1.75rem;
    line-height: 1.2;
  }
  .login-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
  }
  .login-field label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    color: #888;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
  .login-input {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    padding: 11px 14px;
    background: #f8f8f8;
    border: 0.5px solid #ddd;
    border-radius: 8px;
    color: #1a1a1a;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
    box-sizing: border-box;
  }
  .login-input:focus {
    border-color: #185FA5;
    box-shadow: 0 0 0 3px rgba(55,138,221,0.12);
  }
  .login-input::placeholder {
    color: #bbb;
  }
  .pass-wrap {
    position: relative;
  }
  .pass-wrap .login-input {
    padding-right: 42px;
  }
  .toggle-pass {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: #aaa;
    display: flex;
    align-items: center;
  }
  .toggle-pass:hover {
    color: #555;
  }
  .forgot-link {
    font-size: 12px;
    color: #888;
    text-align: right;
    margin: -4px 0 16px;
    display: block;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    background: none;
    border: none;
    padding: 0;
    width: 100%;
  }
  .forgot-link:hover {
    color: #1a1a1a;
  }
  .error-msg {
    font-size: 12px;
    color: #c0392b;
    font-family: 'DM Sans', sans-serif;
    margin: -6px 0 10px;
  }
  .btn-login {
    width: 100%;
    padding: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    background: #185FA5;
    color: #E6F1FB;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s, opacity 0.15s;
    margin-top: 4px;
  }
  .btn-login:hover {
    background: #0C447C;
  }
  .btn-login:active {
    transform: scale(0.98);
  }
  .btn-login:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 1.25rem 0;
  }
  .divider-line {
    flex: 1;
    height: 0.5px;
    background: #e0e0e0;
  }
  .divider-text {
    font-size: 12px;
    color: #bbb;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-guest {
    width: 100%;
    padding: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #555;
    background: transparent;
    border: 0.5px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .btn-guest:hover {
    background: #f4f4f4;
    color: #1a1a1a;
  }
  .signup-row {
    text-align: center;
    margin-top: 1.25rem;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #888;
  }
  .signup-link {
    color: #185FA5;
    cursor: pointer;
    text-decoration: none;
    background: none;
    border: none;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }
  .signup-link:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate async login — replace with real auth call
    setTimeout(() => {
      setLoading(false);
      navigate("/leads");
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-wrap">
        <div className="login-card">
          <p className="login-eyebrow">welcome back</p>
          <h2 className="login-title">Sign in to your account</h2>

          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              className="login-input"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="pass-wrap">
              <input
                id="password"
                className="login-input"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
              />
              <button
                className="toggle-pass"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
                aria-label="Toggle password visibility"
                type="button"
              >
                {showPass ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button className="forgot-link" type="button" style={{ textAlign: "right" }}>
            Forgot password?
          </button>

          {error && <p className="error-msg">{error}</p>}

          <button
            className="btn-login"
            onClick={handleLogin}
            disabled={loading}
            type="button"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <div className="divider">
            <span className="divider-line" />
            <p className="divider-text">or</p>
            <span className="divider-line" />
          </div>

          <button className="btn-guest" type="button" onClick={() => navigate("/leads")}>
            Continue as guest →
          </button>

          <p className="signup-row">
            No account yet?{" "}
            <button className="signup-link" type="button" onClick={() => navigate("/register")}>
              Create one for free
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
