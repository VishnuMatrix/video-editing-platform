import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

const settingsNavigation = (role) => [
  { label: 'Overview', path: `/dashboard/${role}`, key: 'overview' },
  { label: 'Projects', path: `/dashboard/${role}/projects`, key: 'projects' },
  { label: 'Profile', path: `/dashboard/${role}/profile`, key: 'profile' },
  { label: 'Settings', path: `/dashboard/${role}/settings`, key: 'settings' },
];

const preferenceOptions = [
  { key: 'projectUpdates', title: 'Project updates', description: 'Receive email when project status or delivery details change.' },
  { key: 'reviewReplies', title: 'Review replies', description: 'Receive email when the studio responds to your feedback.' },
];

export default function Settings() {
  const { user, userProfile, updateProfile } = useAuth();
  const role = userProfile?.role === 'admin' ? 'admin' : 'client';
  const [savingPreference, setSavingPreference] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [error, setError] = useState('');

  const handlePreferenceChange = async (event) => {
    const { name, checked } = event.target;
    setSavingPreference(name);
    setError('');
    setPasswordState('');
    try {
      await updateProfile({
        preferences: {
          ...(userProfile?.preferences || {}),
          [name]: checked,
        },
      });
    } catch (saveError) {
      console.error('Failed to update notification preference:', saveError);
      setError('Your preference could not be saved. Please try again.');
    } finally {
      setSavingPreference('');
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) {
      setError('There is no email address associated with this account.');
      return;
    }

    setError('');
    setPasswordState('Sending reset email...');
    try {
      await sendPasswordResetEmail(auth, user.email);
      setPasswordState(`Password reset instructions were sent to ${user.email}.`);
    } catch (resetError) {
      console.error('Failed to send password reset email:', resetError);
      setPasswordState('');
      setError('Password reset email could not be sent. Please try again.');
    }
  };

  return (
    <DashboardLayout
      role={role}
      title="Settings"
      description="Manage account access and the updates you receive."
      navItems={settingsNavigation(role)}
    >
      <section className="settings-intro">
        <span className="profile-eyebrow">PREFERENCES / {role.toUpperCase()}</span>
        <h2>Make this workspace yours.</h2>
        <p>Choose what reaches your inbox and keep your account secure.</p>
      </section>

      <section className="section-card settings-section">
        <div className="profile-section-heading">
          <div>
            <span className="profile-eyebrow">01 / NOTIFICATIONS</span>
            <h3>Email preferences</h3>
          </div>
          <span className="settings-live-mark"><span /> SAVED TO ACCOUNT</span>
        </div>

        <div className="preference-list">
          {preferenceOptions.map((option) => (
            <label className="preference-row" key={option.key}>
              <span className="preference-copy">
                <strong>{option.title}</strong>
                <span>{option.description}</span>
              </span>
              <span className="preference-control">
                <input
                  type="checkbox"
                  name={option.key}
                  checked={userProfile?.preferences?.[option.key] ?? true}
                  onChange={handlePreferenceChange}
                  disabled={Boolean(savingPreference)}
                />
                <span className="preference-switch" aria-hidden="true" />
              </span>
            </label>
          ))}
        </div>
        {savingPreference && <p className="settings-feedback" role="status">Saving preference...</p>}
      </section>

      <section className="section-card settings-section settings-security">
        <div className="profile-section-heading">
          <div>
            <span className="profile-eyebrow">02 / SECURITY</span>
            <h3>Password &amp; sign-in</h3>
          </div>
          <span className="security-symbol" aria-hidden="true">↗</span>
        </div>
        <div className="security-row">
          <div>
            <strong>Reset your password</strong>
            <p>We will email a secure password reset link to {user?.email || 'your account email'}.</p>
          </div>
          <button className="settings-secondary-btn" type="button" onClick={handlePasswordReset}>Send reset link</button>
        </div>
        {passwordState && <p className="settings-feedback" role="status">{passwordState}</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </section>
    </DashboardLayout>
  );
}