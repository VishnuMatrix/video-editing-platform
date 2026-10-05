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
  { label: 'Homepage Content', path: '/dashboard/admin#homepage', key: 'homepage' },
  { label: 'Profile', path: '/dashboard/admin/profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/admin/settings', key: 'settings' },
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
  const visibleReviews = sortedReviews.filter((review) => activeFilter === 'all' || !review.readByAdmin);
  const projectById = new Map(projects.map((project) => [project.id, project]));
  const clientById = new Map(clients.map((client) => [client.id, client]));

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
          <span className="profile-eyebrow">STUDIO INBOX / CLIENT FEEDBACK</span>
          <h2>Listen closely. Ship better work.</h2>
          <p>Every client note and revision request, connected to its project.</p>
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
            <span className="profile-eyebrow">THE FEEDBACK LOG</span>
            <h3>Project conversation</h3>
          </div>
          <div className="review-filter" role="group" aria-label="Filter feedback">
            <button className={activeFilter === 'all' ? 'active' : ''} type="button" onClick={() => setActiveFilter('all')}>All <span>{reviews.length}</span></button>
            <button className={activeFilter === 'new' ? 'active' : ''} type="button" onClick={() => setActiveFilter('new')}>New <span>{unreadCount}</span></button>
          </div>
        </div>

        {actionError && <p className="form-error" role="alert">{actionError}</p>}
        {error ? (
          <div className="empty-state"><div><p className="form-error">{error}</p></div></div>
        ) : isLoading ? (
          <div className="empty-state"><div><p>Loading feedback...</p></div></div>
        ) : visibleReviews.length ? (
          <div className="review-timeline">
            {visibleReviews.map((review) => {
              const project = projectById.get(review.projectId);
              const client = clientById.get(review.clientId);
              const projectTitle = project?.title || review.projectTitle || 'Project feedback';
              const clientName = client?.name || client?.email || 'Client';

              return (
                <article
                  className={`review-entry ${review.readByAdmin ? 'is-reviewed' : 'is-unread'}`}
                  id={`review-${review.id}`}
                  key={review.id}
                >
                  <div className="review-entry-rail">
                    <span className="review-entry-dot" />
                    <time>{formatDate(review.createdAt)}</time>
                  </div>
                  <div className="review-entry-content">
                    <div className="review-entry-heading">
                      <div>
                        <div className="review-entry-kicker">
                          <span>{review.readByAdmin ? 'Reviewed' : 'New feedback'}</span>
                          <span className="review-entry-divider">/</span>
                          <span>{clientName}</span>
                        </div>
                        <h4>{projectTitle}</h4>
                      </div>
                      {project?.status && <ProjectStatusBadge status={project.status} />}
                    </div>
                    <blockquote className="review-quote">
                      <span className="review-quote-mark" aria-hidden="true">“</span>
                      <p>{review.feedback || review.comment || review.text || 'Feedback submitted.'}</p>
                    </blockquote>
                    <div className="review-entry-actions">
                      {project && (
                        <Link
                          className="review-open-project"
                          to={`/dashboard/admin/projects?client=${encodeURIComponent(project.clientId || '')}&project=${encodeURIComponent(project.id)}`}
                        >
                          Open project controls <span aria-hidden="true">↗</span>
                        </Link>
                      )}
                      {review.readByAdmin ? (
                        <span className="review-read-state"><span /> Reviewed</span>
                      ) : (
                        <button className="review-mark-button" type="button" disabled={markingId === review.id} onClick={() => handleMarkReviewed(review.id)}>
                          {markingId === review.id ? 'Saving...' : 'Mark reviewed'}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="review-empty-state">
            <span className="review-empty-mark" aria-hidden="true">✓</span>
            <h4>{activeFilter === 'new' ? 'Nothing new in the inbox.' : 'No client feedback yet.'}</h4>
            <p>{activeFilter === 'new' ? 'New feedback will appear here as soon as a client sends it.' : 'Client notes and revision requests will collect here.'}</p>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}