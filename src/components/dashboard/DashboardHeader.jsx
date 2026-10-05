import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { subscribeToProjectReviews } from '../../services/firestore/reviews';

export default function DashboardHeader({ title, description, role, onMenuClick }) {
  const { logout, userProfile } = useAuth();
  const navigate = useNavigate();
  const [unreadReviews, setUnreadReviews] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (role !== 'admin') return undefined;

    return subscribeToProjectReviews(
      (reviews) => {
        const unread = reviews
          .filter((review) => review.clientId && !review.readByAdmin)
          .sort((first, second) => {
            const firstTime = first.createdAt?.toMillis?.() ?? new Date(first.createdAt || 0).getTime();
            const secondTime = second.createdAt?.toMillis?.() ?? new Date(second.createdAt || 0).getTime();
            return secondTime - firstTime;
          });
        setUnreadReviews(unread);
      },
      (error) => console.error('Failed to listen for client feedback:', error)
    );
  }, [role]);

  const formatNotificationDate = (value) => {
    const date = value?.toDate?.() ?? (value ? new Date(value) : null);
    return date && !Number.isNaN(date.getTime())
      ? new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)
      : 'New';
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <button type="button" className="dashboard-mobile-toggle" onClick={onMenuClick} aria-label="Open menu">
          ☰
        </button>

        <div className="dashboard-header-title">
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </div>

      <div className="dashboard-header-actions">
        <span className="dashboard-pill">{role === 'admin' ? 'Admin workspace' : 'Client workspace'}</span>
        {role === 'admin' && (
          <div className="notification-wrap">
            <button
              className={`notification-button ${notificationsOpen ? 'is-open' : ''}`}
              type="button"
              aria-label={unreadReviews.length ? `${unreadReviews.length} new client feedback items` : 'Notifications'}
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>
              {unreadReviews.length > 0 && <span className="notification-count">{unreadReviews.length > 9 ? '9+' : unreadReviews.length}</span>}
            </button>
            {notificationsOpen && (
              <div className="notification-panel">
                <div className="notification-panel-heading">
                  <div>
                    <span className="profile-eyebrow">INBOX</span>
                    <h2>New feedback</h2>
                  </div>
                  <span className="notification-total">{unreadReviews.length}</span>
                </div>
                {unreadReviews.length ? (
                  <div className="notification-list">
                    {unreadReviews.slice(0, 5).map((review) => (
                      <Link
                        className="notification-item"
                        key={review.id}
                        to={`/dashboard/admin/reviews#review-${review.id}`}
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <span className="notification-unread-dot" />
                        <span className="notification-item-copy">
                          <strong>{review.projectTitle || 'Project feedback'}</strong>
                          <span>{review.feedback || review.comment || 'New client feedback'}</span>
                        </span>
                        <time>{formatNotificationDate(review.createdAt)}</time>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="notification-empty">You are all caught up. New client feedback will appear here.</p>
                )}
                <button
                  className="notification-view-all"
                  type="button"
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigate('/dashboard/admin/reviews');
                  }}
                >
                  Open review inbox <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        )}
        <button type="button" className="dashboard-action-btn" onClick={logout}>Logout</button>
        <span className="dashboard-pill">{userProfile?.name || 'Studio User'}</span>
      </div>
    </header>
  );
}
