import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProjectStatusBadge from '../../../components/dashboard/ProjectStatusBadge';
import { getAllProjects } from '../../../services/firestore/projects';
import { getAllClients } from '../../../services/firestore/users';
import { markReviewAsRead, subscribeToProjectReviews } from '../../../services/firestore/reviews';

const navItems = [
  { label: 'Overview', path: '/dashboard/admin', key: 'overview' },
  { label: 'Clients', path: '/dashboard/admin/clients', key: 'clients' },
  { label: 'Projects', path: '/dashboard/admin/projects', key: 'projects' },
  { label: 'Project Reviews', path: '/dashboard/admin/reviews', key: 'reviews' },
  { label: 'Homepage Videos', path: '/dashboard/admin/homepage-videos', key: 'homepage' },
  { label: 'Profile', path: '/dashboard/admin/profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/admin/settings', key: 'settings' },
];

const DELIVERY_STAGES = [
  { status: 'submitted', label: 'Submitted' },
  { status: 'started', label: 'Started' },
  { status: 'in_progress', label: 'In progress' },
  { status: 'review', label: 'Studio review' },
  { status: 'revision_requested', label: 'Revision' },
  { status: 'completed', label: 'Delivered' },
];

const getDate = (value) => value?.toDate?.() ?? (value ? new Date(value) : null);
const getTime = (value) => {
  const date = getDate(value);
  return date && !Number.isNaN(date.getTime()) ? date.getTime() : 0;
};

const formatDate = (value) => {
  const date = getDate(value);
  return date && !Number.isNaN(date.getTime())
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
    : 'Date unavailable';
};

const formatMilestoneDate = (value) => {
  const date = getDate(value);
  return date && !Number.isNaN(date.getTime())
    ? new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)
    : '';
};

const normalizeStatus = (status) => String(status || 'submitted').toLowerCase().replace(/[\s-]+/g, '_');

const getStageIndex = (status) => {
  const normalized = normalizeStatus(status);
  const index = DELIVERY_STAGES.findIndex((stage) => stage.status === normalized);
  return index < 0 ? 0 : index;
};

const getStageDate = (project, status) => {
  const events = Array.isArray(project.statusHistory) ? project.statusHistory : [];
  const event = [...events].reverse().find((item) => normalizeStatus(item.status) === status);
  if (event?.at || event?.createdAt) return formatMilestoneDate(event.at || event.createdAt);
  if (status === 'submitted') return formatMilestoneDate(project.createdAt);
  return '';
};

export default function Reviews() {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [markingId, setMarkingId] = useState('');

  useEffect(() => {
    let isCurrent = true;
    Promise.all([getAllProjects(), getAllClients()])
      .then(([projectItems, clientItems]) => {
        if (isCurrent) {
          setProjects(projectItems);
          setClients(clientItems);
        }
      })
      .catch((loadError) => {
        console.error('Failed to load review context:', loadError);
        if (isCurrent) setError('Project and client details could not be loaded.');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    const unsubscribe = subscribeToProjectReviews(
      (items) => {
        if (isCurrent) setReviews(items.filter((item) => item.clientId));
      },
      (loadError) => {
        console.error('Failed to load project reviews:', loadError);
        if (isCurrent) setError('Client feedback could not be loaded.');
      }
    );

    return () => {
      isCurrent = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return undefined;
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, reviews]);

  const sortedReviews = [...reviews].sort((first, second) => getTime(second.createdAt) - getTime(first.createdAt));
  const unreadCount = reviews.filter((review) => !review.readByAdmin).length;
  const reviewedCount = reviews.length - unreadCount;
  const visibleProjects = [...projects]
    .filter((project) => activeFilter === 'all' || reviews.some((review) => review.projectId === project.id && !review.readByAdmin))
    .sort((first, second) => getTime(second.updatedAt || second.createdAt) - getTime(first.updatedAt || first.createdAt));
  const clientById = new Map(clients.map((client) => [client.id, client]));
  const reviewsByProject = sortedReviews.reduce((grouped, review) => {
    const projectReviews = grouped.get(review.projectId) || [];
    projectReviews.push(review);
    grouped.set(review.projectId, projectReviews);
    return grouped;
  }, new Map());

  const handleMarkReviewed = async (reviewId) => {
    setMarkingId(reviewId);
    setActionError('');
    try {
      await markReviewAsRead(reviewId);
      setReviews((current) => current.map((review) => (
        review.id === reviewId ? { ...review, readByAdmin: true } : review
      )));
    } catch (markError) {
      console.error('Failed to mark feedback as reviewed:', markError);
      setActionError('This feedback could not be marked reviewed. Try again.');
    } finally {
      setMarkingId('');
    }
  };

  return (
    <DashboardLayout role="admin" title="Project reviews" description="Client feedback, organized for a clear next step." navItems={navItems}>
      <section className="review-inbox-intro">
        <div>
          <span className="profile-eyebrow">DELIVERY TRACKER / CLIENT FEEDBACK</span>
          <h2>Every project. Every milestone.</h2>
          <p>Follow the work from submission through delivery, with client feedback in context.</p>
        </div>
        <Link className="review-inbox-project-link" to="/dashboard/admin/projects">Project queue <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="review-stats-grid" aria-label="Feedback overview">
        <div className="review-stat-card review-stat-highlight">
          <span className="review-stat-label">New feedback</span>
          <strong>{unreadCount}</strong>
          <span className="review-stat-foot">Needs a first read</span>
        </div>
        <div className="review-stat-card">
          <span className="review-stat-label">Reviewed</span>
          <strong>{reviewedCount}</strong>
          <span className="review-stat-foot">Seen by the studio</span>
        </div>
        <div className="review-stat-card">
          <span className="review-stat-label">All feedback</span>
          <strong>{reviews.length}</strong>
          <span className="review-stat-foot">Across all projects</span>
        </div>
      </section>

      <section className="section-card review-inbox-section">
        <div className="review-inbox-toolbar">
          <div>
            <span className="profile-eyebrow">LIVE PROJECT MILESTONES</span>
            <h3>Delivery timeline</h3>
          </div>
          <div className="review-filter" role="group" aria-label="Filter feedback">
            <button className={activeFilter === 'all' ? 'active' : ''} type="button" onClick={() => setActiveFilter('all')}>All projects <span>{projects.length}</span></button>
            <button className={activeFilter === 'new' ? 'active' : ''} type="button" onClick={() => setActiveFilter('new')}>New feedback <span>{unreadCount}</span></button>
          </div>
        </div>

        {actionError && <p className="form-error" role="alert">{actionError}</p>}
        {error ? (
          <div className="empty-state"><div><p className="form-error">{error}</p></div></div>
        ) : isLoading ? (
          <div className="empty-state"><div><p>Loading feedback...</p></div></div>
        ) : visibleProjects.length ? (
          <div className="delivery-project-list">
            {visibleProjects.map((project, projectIndex) => {
              const projectReviews = reviewsByProject.get(project.id) || [];
              const client = clientById.get(project.clientId);
              const clientName = client?.name || client?.email || 'Client';
              const currentStageIndex = getStageIndex(project.status);
              const hasUnread = projectReviews.some((review) => !review.readByAdmin);

              return (
                <article className="delivery-project-card" id={`project-${project.id}`} key={project.id}>
                  <header className="delivery-project-header">
                    <div className="delivery-project-heading">
                      <span className="delivery-project-number">PROJECT {String(projectIndex + 1).padStart(2, '0')}</span>
                      <h4>{project.title || 'Untitled project'}</h4>
                      <span className="delivery-project-client">For {clientName}</span>
                    </div>
                    <div className="delivery-project-state">
                      {hasUnread && <span className="delivery-unread-label"><i /> New feedback</span>}
                      <ProjectStatusBadge status={project.status} />
                    </div>
                  </header>

                  <ol className="delivery-stage-track" aria-label={`${project.title || 'Project'} delivery progress`}>
                    {DELIVERY_STAGES.map((stage, stageIndex) => {
                      const stageState = stageIndex < currentStageIndex
                        ? 'complete'
                        : stageIndex === currentStageIndex
                          ? 'current'
                          : 'upcoming';
                      const stageDate = getStageDate(project, stage.status);

                      return (
                        <li className={`delivery-stage is-${stageState} stage-${stage.status}`} key={stage.status}>
                          <span className="delivery-stage-marker" aria-hidden="true">
                            {stageState === 'complete' ? '✓' : String(stageIndex + 1).padStart(2, '0')}
                          </span>
                          <span className="delivery-stage-copy">
                            <strong>{stage.label}</strong>
                            <span>{stageDate || (stageState === 'complete' ? 'Complete' : stageState === 'current' ? (stage.status === 'completed' ? 'Delivered' : 'Current stage') : 'Up next')}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ol>

                  {project.reviewRemarks && (
                    <div className="delivery-studio-note">
                      <span className="profile-eyebrow">STUDIO REVIEW</span>
                      <p>{project.reviewRemarks}</p>
                    </div>
                  )}

                  <div className="delivery-feedback-block">
                    <div className="delivery-feedback-heading">
                      <div>
                        <span className="profile-eyebrow">CLIENT VOICE</span>
                        <h5>Feedback &amp; remarks <span>{projectReviews.length}</span></h5>
                      </div>
                      <Link
                        className="review-open-project"
                        to={`/dashboard/admin/projects?client=${encodeURIComponent(project.clientId || '')}&project=${encodeURIComponent(project.id)}`}
                      >
                        Open project controls <span aria-hidden="true">↗</span>
                      </Link>
                    </div>

                    {projectReviews.length ? (
                      <div className="delivery-feedback-list">
                        {projectReviews.map((review) => (
                          <article className={`delivery-feedback-item ${review.readByAdmin ? 'is-read' : 'is-new'}`} id={`review-${review.id}`} key={review.id}>
                            <div className="delivery-feedback-meta">
                              <span className="delivery-feedback-client">{clientName}</span>
                              <time>{formatDate(review.createdAt)}</time>
                            </div>
                            <blockquote className="review-quote">
                              <span className="review-quote-mark" aria-hidden="true">“</span>
                              <p>{review.feedback || review.comment || review.text || 'Feedback submitted.'}</p>
                            </blockquote>
                            <div className="review-entry-actions">
                              {review.readByAdmin ? (
                                <span className="review-read-state"><span /> Reviewed</span>
                              ) : (
                                <button className="review-mark-button" type="button" disabled={markingId === review.id} onClick={() => handleMarkReviewed(review.id)}>
                                  {markingId === review.id ? 'Saving...' : 'Mark reviewed'}
                                </button>
                              )}
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <p className="delivery-no-feedback">No client feedback on this project yet.</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="review-empty-state">
            <span className="review-empty-mark" aria-hidden="true">✓</span>
            <h4>{activeFilter === 'new' ? 'Nothing new in the inbox.' : 'No projects to track yet.'}</h4>
            <p>{activeFilter === 'new' ? 'Projects with new client feedback will appear here.' : 'Project milestones and client feedback will appear as work is submitted.'}</p>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}