import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

export default function Login() {
  const { login, isAuthenticated, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (loading) {
    return <div className="auth-loading-screen">Loading your workspace...</div>;
  }

  if (isAuthenticated && userProfile?.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (isAuthenticated && userProfile?.role === 'client') {
    return <Navigate to="/dashboard/client" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please enter both your email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(form.email.trim(), form.password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const redirectTo = location.state?.from?.pathname || (result.role === 'admin' ? '/dashboard/admin' : '/dashboard/client');
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <a href="/" className="auth-brand">
          <span className="auth-brand-mark">OF</span>
          <span>Oneforedit</span>
        </a>

        <div className="auth-visual-copy">
          <span className="auth-kicker">Client access</span>
          <h1>Secure access to your edits.</h1>
          <p>
            Review project progress, submit briefs, and stay aligned with your creative team from one clean workspace.
          </p>
        </div>

        <div className="auth-visual-features">
          {[
            ['6', 'Phases'],
            ['24/7', 'Review'],
            ['1', 'Workspace'],
          ].map(([value, label]) => (
            <div key={label} className="auth-feature">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue with your project workflow.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <div className="auth-input-wrap">
                <input
                  id="email"
                  className="auth-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="password"
                  className="auth-input"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="auth-inline-row">
              <label className="auth-checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/register" className="auth-link">Create account</Link>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-primary-btn" disabled={isSubmitting}>
              {isSubmitting ? <><span className="button-spinner" /> Signing in...</> : 'Login'}
            </button>

            <div className="auth-meta">
              Need an account? <Link className="auth-link" to="/register">Register here</Link>
            </div>

            <div className="auth-meta">
              <Link className="auth-link" to="/">Back to Home</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
