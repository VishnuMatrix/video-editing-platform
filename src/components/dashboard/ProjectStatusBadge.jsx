const STATUS_CLASS = {
  submitted: 'status-submitted',
  started: 'status-started',
  in_progress: 'status-in_progress',
  review: 'status-review',
  revision_requested: 'status-revision_requested',
  completed: 'status-completed',
};

export default function ProjectStatusBadge({ status = 'submitted' }) {
  const normalized = String(status || 'submitted').toLowerCase().replace(/\s+/g, '_');
  const className = STATUS_CLASS[normalized] || 'status-submitted';

  return <span className={`status-badge ${className}`}>{normalized.replace(/_/g, ' ')}</span>;
}
