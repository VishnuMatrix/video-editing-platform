import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProjectStatusBadge from '../../../components/dashboard/ProjectStatusBadge';
import { useAuth } from '../../../context/AuthContext';
import { getClientProjects } from '../../../services/firestore/projects';
import { addReview } from '../../../services/firestore/reviews';

const navItems = [
  { label: 'Overview', path: '/dashboard/client', key: 'overview' },
  { label: 'Projects', path: '/dashboard/client/projects', key: 'projects' },
  { label: 'Submit Project', path: '/dashboard/client/submit-project', key: 'submit-project' },
  { label: 'Reviews', path: '/dashboard/client/projects', key: 'reviews' },
  { label: 'Profile', path: '/dashboard/client#profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/client#settings', key: 'settings' },
];

export default function ClientProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedbackProjectId, setFeedbackProjectId] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccessId, setFeedbackSuccessId] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    getClientProjects(user?.uid)
      .then((items) => {
        if (isCurrent) {
          setProjects(items);
          setError('');
        }
      })
      .catch((loadError) => {
        console.error('Failed to load client projects:', loadError);
        if (isCurrent) setError('Projects could not be loaded. Please try again later.');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [user?.uid]);

  const handleFeedbackSubmit = async (event, projectId) => {
    event.preventDefault();
    const feedback = feedbackText.trim();
    if (!feedback) {
      setFeedbackError('Add a comment before sending feedback.');
      return;
    }

    setIsSubmittingFeedback(true);
    setFeedbackError('');
    try {
      const project = projects.find((item) => item.id === projectId);
      await addReview({ projectId, projectTitle: project?.title || 'Project feedback', clientId: user.uid, feedback });
      setFeedbackText('');
      setFeedbackProjectId('');
      setFeedbackSuccessId(projectId);
    } catch (submitError) {
      console.error('Failed to submit project feedback:', submitError);
      setFeedbackError('Your feedback could not be sent. Please try again.');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <DashboardLayout role="client" title="Projects" description="Monitor your brief history and current delivery status." navItems={navItems}>
      <section className="section-card">
        <div className="panel-header">
          <h3>Your project list</h3>
          <button type="button" className="dashboard-action-btn">Submit Project</button>
        </div>

        {isLoading ? (
          <div className="empty-state"><div><p>Loading projects...</p></div></div>
        ) : error ? (
          <div className="empty-state"><div><p className="form-error">{error}</p></div></div>
        ) : projects.length ? (
          <div className="stack-list">
            {projects.map((project) => (
              <article key={project.id} className="list-item client-project-item">
                <div className="client-project-content">
                  <div className="client-project-heading">
                    <div>
                      <strong>{project.title}</strong>
                      <span>{project.description}</span>
                      {project.reviewStatus && <span className="review-status-label">Review: {project.reviewStatus.replace(/_/g, ' ')}</span>}
                    </div>
                    <ProjectStatusBadge status={project.status} />
                  </div>

                  {project.reviewRemarks && (
                    <div className="client-project-message">
                      <strong>Review remarks</strong>
                      <p>{project.reviewRemarks}</p>
                    </div>
                  )}
                  {project.clientNote && (
                    <div className="client-project-message">
                      <strong>Note from the studio</strong>
                      <p>{project.clientNote}</p>
                    </div>
                  )}
                  {project.deliveryLink && (
                    <a className="delivery-link" href={project.deliveryLink} target="_blank" rel="noreferrer">
                      Open delivery / upload link
                    </a>
                  )}

                  {feedbackSuccessId === project.id && <p className="form-success" role="status">Feedback sent to the studio.</p>}
                  {feedbackProjectId === project.id ? (
                    <form className="project-feedback-form" onSubmit={(event) => handleFeedbackSubmit(event, project.id)}>
                      <label className="form-field" htmlFor={`feedback-${project.id}`}>
                        <span className="feedback-label">Your review or remarks</span>
                        <textarea
                          id={`feedback-${project.id}`}
                          className="form-textarea compact-textarea"
                          value={feedbackText}
                          onChange={(event) => setFeedbackText(event.target.value)}
                          placeholder="Share feedback or request a change."
                          maxLength={2000}
                        />
                      </label>
                      {feedbackError && <p className="form-error">{feedbackError}</p>}
                      <div className="table-actions">
                        <button className="form-submit-btn" type="submit" disabled={isSubmittingFeedback}>
                          {isSubmittingFeedback ? 'Sending...' : 'Send feedback'}
                        </button>
                        <button className="table-action-btn" type="button" onClick={() => setFeedbackProjectId('')}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <button
                      className="table-action-btn"
                      type="button"
                      onClick={() => {
                        setFeedbackProjectId(project.id);
                        setFeedbackText('');
                        setFeedbackError('');
                        setFeedbackSuccessId('');
                      }}
                    >
                      Leave feedback
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div>
              <h3>No projects yet.</h3>
              <p>When your first brief is submitted, it will appear here with status updates and review history.</p>
            </div>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
