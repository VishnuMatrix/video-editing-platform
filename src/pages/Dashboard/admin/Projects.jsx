import { Fragment, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProjectStatusBadge from '../../../components/dashboard/ProjectStatusBadge';
import { getAllProjects, updateProject } from '../../../services/firestore/projects';
import { getProjectReviews } from '../../../services/firestore/reviews';

const navItems = [
  { label: 'Overview', path: '/dashboard/admin', key: 'overview' },
  { label: 'Clients', path: '/dashboard/admin/clients', key: 'clients' },
  { label: 'Projects', path: '/dashboard/admin/projects', key: 'projects' },
  { label: 'Project Reviews', path: '/dashboard/admin/projects', key: 'reviews' },
  { label: 'Homepage Content', path: '/dashboard/admin#homepage', key: 'homepage' },
  { label: 'Profile', path: '/dashboard/admin#profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/admin#settings', key: 'settings' },
];

const initialForm = {
  status: 'submitted',
  reviewStatus: 'pending',
  reviewRemarks: '',
  clientNote: '',
  deliveryLink: '',
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

export default function Projects() {
  const [searchParams] = useSearchParams();
  const clientFilter = searchParams.get('client');
  const requestedProjectId = searchParams.get('project');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [form, setForm] = useState(initialForm);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    getAllProjects()
      .then((items) => {
        if (isCurrent) {
          setProjects(items);
          const requestedProject = items.find((project) => project.id === requestedProjectId);
          if (requestedProject) {
            setSelectedProjectId(requestedProject.id);
            setReviewsLoading(true);
            setForm({
              status: requestedProject.status || 'submitted',
              reviewStatus: requestedProject.reviewStatus || 'pending',
              reviewRemarks: requestedProject.reviewRemarks || '',
              clientNote: requestedProject.clientNote || '',
              deliveryLink: requestedProject.deliveryLink || '',
            });
          }
        }
      })
      .catch((loadError) => {
        console.error('Failed to load projects:', loadError);
        if (isCurrent) setError('Projects could not be loaded. Please try again later.');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [requestedProjectId]);

  useEffect(() => {
    if (!selectedProjectId) return undefined;

    let isCurrent = true;
    getProjectReviews(selectedProjectId)
      .then((items) => {
        if (isCurrent) setReviews(items);
      })
      .catch((loadError) => {
        console.error('Failed to load project feedback:', loadError);
        if (isCurrent) setReviewError('Client feedback could not be loaded.');
      })
      .finally(() => {
        if (isCurrent) setReviewsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [selectedProjectId]);

  const formatDate = (value) => {
    const date = value?.toDate?.() ?? (value ? new Date(value) : null);
    return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString() : '—';
  };

  const visibleProjects = clientFilter
    ? projects.filter((project) => project.clientId === clientFilter)
    : projects;

  const handleProjectSelect = (project) => {
    if (selectedProjectId === project.id) {
      setSelectedProjectId('');
      return;
    }

    setSelectedProjectId(project.id);
    setReviews([]);
    setReviewsLoading(true);
    setReviewError('');
    setSaveError('');
    setSaveMessage('');
    setForm({
      status: project.status || 'submitted',
      reviewStatus: project.reviewStatus || 'pending',
      reviewRemarks: project.reviewRemarks || '',
      clientNote: project.clientNote || '',
      deliveryLink: project.deliveryLink || '',
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSaveError('');
    setSaveMessage('');
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaveError('');
    setSaveMessage('');

    const deliveryLink = form.deliveryLink.trim();
    if (deliveryLink && !isValidUrl(deliveryLink)) {
      setSaveError('Enter a valid delivery link beginning with https:// or http://.');
      return;
    }

    setIsSaving(true);
    const updates = {
      status: form.status,
      reviewStatus: form.reviewStatus,
      reviewRemarks: form.reviewRemarks.trim(),
      clientNote: form.clientNote.trim(),
      deliveryLink,
    };

    try {
      await updateProject(selectedProjectId, updates);
      setProjects((current) => current.map((project) => (
        project.id === selectedProjectId ? { ...project, ...updates } : project
      )));
      setSaveMessage('Project updates saved and visible to the client.');
    } catch (saveProjectError) {
      console.error('Failed to update project:', saveProjectError);
      setSaveError('Project updates could not be saved. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout role="admin" title="Projects" description="Monitor submitted work orders and editorial progress." navItems={navItems}>
      <section className="section-card">
        <div className="panel-header">
          <h3>{clientFilter ? 'Client project queue' : 'Project queue'}</h3>
          {clientFilter && <Link className="table-action-btn" to="/dashboard/admin/projects">Clear client filter</Link>}
        </div>

        <div className="table-shell">
          {isLoading ? (
            <div className="empty-state"><div><p>Loading projects...</p></div></div>
          ) : error ? (
            <div className="empty-state"><div><p className="form-error">{error}</p></div></div>
          ) : visibleProjects.length ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Assigned editor</th>
                  <th>Review</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleProjects.map((project) => (
                  <Fragment key={project.id}>
                    <tr>
                      <td>{project.title}</td>
                      <td>{project.client || project.clientId || '—'}</td>
                      <td><ProjectStatusBadge status={project.status} /></td>
                      <td>{project.editor || 'Unassigned'}</td>
                      <td>{project.reviewStatus || 'Pending'}</td>
                      <td>{formatDate(project.createdAt)}</td>
                      <td>
                        <button
                          type="button"
                          className="table-action-btn"
                          aria-expanded={selectedProjectId === project.id}
                          onClick={() => handleProjectSelect(project)}
                        >
                          {selectedProjectId === project.id ? 'Close review' : 'Review'}
                        </button>
                      </td>
                    </tr>
                    {selectedProjectId === project.id && (
                      <tr>
                        <td colSpan="7">
                          <div className="project-review-panel">
                            <div className="review-feedback">
                              <h4>Client feedback</h4>
                              {reviewsLoading ? <p>Loading feedback...</p> : reviewError ? <p className="form-error">{reviewError}</p> : reviews.length ? (
                                reviews.map((review) => (
                                  <blockquote key={review.id}>
                                    <p>{review.feedback || review.comment || review.text || 'Feedback submitted.'}</p>
                                    <cite>{formatDate(review.createdAt)}</cite>
                                  </blockquote>
                                ))
                              ) : <p>No client feedback yet.</p>}
                            </div>

                            <form className="dashboard-form" onSubmit={handleSave}>
                              <h4>Project update</h4>
                              <div className="dashboard-form-grid">
                                <div className="form-field">
                                  <label htmlFor={`project-status-${project.id}`}>Project status</label>
                                  <select id={`project-status-${project.id}`} className="form-select" name="status" value={form.status} onChange={handleFormChange}>
                                    <option value="submitted">Submitted</option>
                                    <option value="started">Started</option>
                                    <option value="in_progress">In progress</option>
                                    <option value="review">In review</option>
                                    <option value="revision_requested">Revision requested</option>
                                    <option value="completed">Completed</option>
                                  </select>
                                </div>
                                <div className="form-field">
                                  <label htmlFor={`review-status-${project.id}`}>Review status</label>
                                  <select id={`review-status-${project.id}`} className="form-select" name="reviewStatus" value={form.reviewStatus} onChange={handleFormChange}>
                                    <option value="pending">Pending</option>
                                    <option value="in_review">In review</option>
                                    <option value="approved">Approved</option>
                                    <option value="revision_requested">Revision requested</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-field">
                                <label htmlFor={`review-remarks-${project.id}`}>Review remarks for client</label>
                                <textarea id={`review-remarks-${project.id}`} className="form-textarea" name="reviewRemarks" value={form.reviewRemarks} onChange={handleFormChange} placeholder="Share review notes or requested changes." />
                              </div>
                              <div className="dashboard-form-grid">
                                <div className="form-field">
                                  <label htmlFor={`client-note-${project.id}`}>Note for client</label>
                                  <textarea id={`client-note-${project.id}`} className="form-textarea compact-textarea" name="clientNote" value={form.clientNote} onChange={handleFormChange} placeholder="Add a delivery update or message." />
                                </div>
                                <div className="form-field">
                                  <label htmlFor={`delivery-link-${project.id}`}>Delivery / upload link</label>
                                  <input id={`delivery-link-${project.id}`} className="form-input" type="url" name="deliveryLink" value={form.deliveryLink} onChange={handleFormChange} placeholder="https://drive.google.com/..." />
                                </div>
                              </div>
                              {saveError && <p className="form-error">{saveError}</p>}
                              {saveMessage && <p className="form-success" role="status">{saveMessage}</p>}
                              <div className="form-actions">
                                <button className="form-submit-btn" type="submit" disabled={isSaving}>
                                  {isSaving ? 'Saving...' : 'Save and share with client'}
                                </button>
                              </div>
                            </form>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div>
                <h3>{clientFilter ? 'No projects for this client.' : 'No projects submitted yet.'}</h3>
                <p>{clientFilter ? 'This client has not submitted a project yet.' : 'Incoming client projects will appear here with status, review state, and assignment details.'}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}
