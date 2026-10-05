import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';

export default function Register() {
  const { register, isAuthenticated, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (loading) {
    return <div className="auth-loading-screen">Preparing your access...</div>;
  }

  if (isAuthenticated && userProfile?.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (isAuthenticated && userProfile?.role === 'client') {
    return <Navigate to="/dashboard/client" replace />;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please complete every field before continuing.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!form.agreed) {
      setError('Please accept the terms before creating an account.');
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate('/dashboard/client', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <a href="/" className="auth-brand">
          <span className="auth-brand-mark">OF</span>
          <span>Oneforedit</span>
        </a>

        <div className="auth-visual-copy">
          <span className="auth-kicker">New account</span>
          <h1>Start your next project.</h1>
          <p>
            Create your client workspace to brief your editing team, track milestones, and manage creative feedback.
          </p>
        </div>

        <div className="auth-visual-features">
          {[
            ['Briefs', 'Ready'],
            ['Review', 'Built-in'],
            ['Delivery', 'Clear'],
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
            <h2>Create account</h2>
            <p>Register to begin your client dashboard.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="name">Full name</label>
              <div className="auth-input-wrap">
                <input id="name" className="auth-input" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email</label>
              <div className="auth-input-wrap">
                <input id="register-email" className="auth-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Password</label>
              <div className="auth-input-wrap">
                <input id="register-password" className="auth-input" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Choose a password" autoComplete="new-password" />
                <button type="button" className="auth-password-toggle" onClick={() => setShowPassword((current) => !current)}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="confirm-password">Confirm password</label>
              <div className="auth-input-wrap">
                <input id="confirm-password" className="auth-input" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" autoComplete="new-password" />
              </div>
            </div>

            <label className="auth-checkbox">
              <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
              <span>I agree to the terms and project workflow policies.</span>
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-primary-btn" disabled={isSubmitting}>
              {isSubmitting ? <><span className="button-spinner" /> Creating account...</> : 'Register'}
            </button>

            <div className="auth-meta">
              Already have an account? <Link className="auth-link" to="/login">Login here</Link>
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
