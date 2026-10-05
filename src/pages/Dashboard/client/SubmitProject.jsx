import { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { useAuth } from '../../../context/AuthContext';
import { createProject } from '../../../services/firestore/projects';

const navItems = [
  { label: 'Overview', path: '/dashboard/client', key: 'overview' },
  { label: 'Projects', path: '/dashboard/client/projects', key: 'projects' },
  { label: 'Submit Project', path: '/dashboard/client/submit-project', key: 'submit-project' },
  { label: 'Reviews', path: '/dashboard/client#reviews', key: 'reviews' },
  { label: 'Profile', path: '/dashboard/client#profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/client#settings', key: 'settings' },
];

const initialForm = {
  title: '',
  description: '',
  sourceLinks: '',
  referenceLinks: '',
  requirements: '',
  deadline: '',
  notes: '',
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

export default function SubmitProject() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title.trim() || !form.description.trim()) {
      setError('Please add a project title and a description before submitting.');
      return;
    }

    const urls = [
      ...form.sourceLinks.split(',').map((value) => value.trim()).filter(Boolean),
      ...form.referenceLinks.split(',').map((value) => value.trim()).filter(Boolean),
    ];

    const invalidUrl = urls.find((url) => !isValidUrl(url));

    if (invalidUrl) {
      setError('Please enter valid full URLs for source and reference links.');
      return;
    }

    if (!user?.uid) {
      setError('You must be logged in to submit a project brief.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createProject({
        clientId: user.uid,
        title: form.title.trim(),
        description: form.description.trim(),
        sourceLinks: form.sourceLinks
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean),
        referenceLinks: form.referenceLinks
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean),
        requirements: form.requirements.trim(),
        deadline: form.deadline || null,
        notes: form.notes.trim(),
        status: 'submitted',
        assignedEditorId: null,
      });

      setSuccess('Project brief submitted successfully.');
      setForm(initialForm);
    } catch (submitError) {
      console.error('Submit project error:', submitError);
      setError('Something went wrong while submitting your brief. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout role="client" title="Submit Project" description="Share your brief, media URLs, and delivery requirements." navItems={navItems}>
      <section className="section-card">
        <div className="panel-header">
          <h3>New project brief</h3>
        </div>

        <form className="dashboard-form" onSubmit={handleSubmit} noValidate>
          <div className="dashboard-form-grid">
            <div className="form-field">
              <label htmlFor="title">Project title</label>
              <input id="title" className="form-input" name="title" value={form.title} onChange={handleChange} placeholder="Example: Product Reel — Q4 Launch" />
            </div>

            <div className="form-field">
              <label htmlFor="deadline">Deadline</label>
              <input id="deadline" className="form-input" name="deadline" type="date" value={form.deadline} onChange={handleChange} />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="description">Project description</label>
            <textarea id="description" className="form-textarea" name="description" value={form.description} onChange={handleChange} placeholder="Describe the intended outcome, audience, and deliverables." />
          </div>

          <div className="dashboard-form-grid">
            <div className="form-field">
              <label htmlFor="sourceLinks">Video / source links</label>
              <input id="sourceLinks" className="form-input" name="sourceLinks" value={form.sourceLinks} onChange={handleChange} placeholder="https://drive.google.com/..., https://dropbox.com/..." />
            </div>

            <div className="form-field">
              <label htmlFor="referenceLinks">Reference links</label>
              <input id="referenceLinks" className="form-input" name="referenceLinks" value={form.referenceLinks} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="requirements">Editing requirements</label>
            <textarea id="requirements" className="form-textarea" name="requirements" value={form.requirements} onChange={handleChange} placeholder="Length, editing style, motion needs, brand notes, pacing instructions, voiceover requirements,..." />
          </div>

          <div className="form-field">
            <label htmlFor="notes">Additional notes</label>
            <textarea id="notes" className="form-textarea" name="notes" value={form.notes} onChange={handleChange} placeholder="Anything else we should know before the edit begins." />
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="auth-error" style={{ color: '#93f0a6' }}>{success}</p>}

          <div className="form-actions">
            <button type="button" className="ghost-btn">Save draft</button>
            <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? <><span className="button-spinner" /> Submit brief</> : 'Submit brief'}
            </button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}
