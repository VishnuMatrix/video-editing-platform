import { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const profileNavigation = (role) => [
  { label: 'Overview', path: `/dashboard/${role}`, key: 'overview' },
  { label: 'Projects', path: `/dashboard/${role}/projects`, key: 'projects' },
  { label: 'Profile', path: `/dashboard/${role}/profile`, key: 'profile' },
  { label: 'Settings', path: `/dashboard/${role}/settings`, key: 'settings' },
];

export default function Profile() {
  const { user, userProfile, updateProfile } = useAuth();
  const role = userProfile?.role === 'admin' ? 'admin' : 'client';
  const [form, setForm] = useState(() => ({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    company: userProfile?.company || '',
    timeZone: userProfile?.timeZone || '',
    bio: userProfile?.bio || '',
  }));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const initials = (form.name || user?.email || 'U')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError('Your name is required.');
      return;
    }

    setIsSaving(true);
    setError('');
    setSuccess('');
    try {
      await updateProfile({
        name: form.name.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        timeZone: form.timeZone.trim(),
        bio: form.bio.trim(),
      });
      setSuccess('Your profile has been updated.');
    } catch (saveError) {
      console.error('Failed to update profile:', saveError);
      setError('Your profile could not be saved. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout
      role={role}
      title="Your profile"
      description="Keep your studio or client details up to date."
      navItems={profileNavigation(role)}
    >
      <section className="profile-banner">
        <div className="profile-avatar" aria-hidden="true">{initials}</div>
        <div className="profile-banner-copy">
          <span className="profile-eyebrow">{role === 'admin' ? 'Studio administrator' : 'Client account'}</span>
          <h2>{form.name || 'Complete your profile'}</h2>
          <p>{user?.email || 'Email unavailable'}</p>
        </div>
        <span className="profile-account-mark">OF</span>
      </section>

      <section className="section-card profile-section">
        <div className="profile-section-heading">
          <div>
            <span className="profile-eyebrow">Account details</span>
            <h3>Personal information</h3>
          </div>
          <span className="profile-section-index">01 / PROFILE</span>
        </div>

        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="dashboard-form-grid">
            <div className="form-field">
              <label htmlFor="profile-name">Full name</label>
              <input id="profile-name" className="form-input" name="name" value={form.name} onChange={handleChange} autoComplete="name" required />
            </div>
            <div className="form-field">
              <label htmlFor="profile-email">Email address</label>
              <input id="profile-email" className="form-input" value={user?.email || ''} readOnly />
            </div>
            <div className="form-field">
              <label htmlFor="profile-phone">Phone</label>
              <input id="profile-phone" className="form-input" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" placeholder="Add a contact number" />
            </div>
            <div className="form-field">
              <label htmlFor="profile-company">Company</label>
              <input id="profile-company" className="form-input" name="company" value={form.company} onChange={handleChange} autoComplete="organization" placeholder="Studio or organization" />
            </div>
            <div className="form-field">
              <label htmlFor="profile-timezone">Time zone</label>
              <input id="profile-timezone" className="form-input" name="timeZone" value={form.timeZone} onChange={handleChange} placeholder="e.g. America/New_York" />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="profile-bio">About</label>
            <textarea id="profile-bio" className="form-textarea compact-textarea" name="bio" value={form.bio} onChange={handleChange} maxLength={400} placeholder="A short introduction for the studio team." />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          {success && <p className="form-success" role="status">{success}</p>}
          <div className="form-actions">
            <button className="form-submit-btn" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving profile...' : 'Save profile'}
            </button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}