import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ProjectStatusBadge from '../../components/dashboard/ProjectStatusBadge';
import { useAuth } from '../../context/AuthContext';
import { getClientProjects } from '../../services/firestore/projects';

const navItems = [
  { label: 'Overview', path: '/dashboard/client', key: 'overview' },
  { label: 'Projects', path: '/dashboard/client/projects', key: 'projects' },
  { label: 'Submit Project', path: '/dashboard/client/submit-project', key: 'submit-project' },
  { label: 'Reviews', path: '/dashboard/client/projects', key: 'reviews' },
  { label: 'Profile', path: '/dashboard/client#profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/client#settings', key: 'settings' },
];

export default function ClientDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

  const recentItems = [...projects].sort((first, second) => {
    const firstTime = first.createdAt?.toMillis?.() ?? 0;
    const secondTime = second.createdAt?.toMillis?.() ?? 0;
    return secondTime - firstTime;
  });
  const countStatus = (...statuses) => projects.filter((project) => statuses.includes(project.status)).length;
  const metrics = [
    { label: 'Active Projects', value: countStatus('submitted', 'started', 'in_progress', 'review', 'revision_requested'), foot: 'Currently in production' },
    { label: 'Completed', value: countStatus('completed'), foot: 'Ready to review' },
    { label: 'In Review', value: countStatus('review'), foot: 'Awaiting approval' },
    { label: 'Total Projects', value: projects.length, foot: 'All client work' },
  ];

  return (
    <DashboardLayout role="client" title="Client Dashboard" description="Track your projects and creative delivery." navItems={navItems}>
      <div className="dashboard-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <span className="metric-label">{metric.label}</span>
            <div className="metric-value">
              <strong>{metric.value}</strong>
              <span>items</span>
            </div>
            <div className="metric-foot">{metric.foot}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-row">
        <section className="section-card">
          <div className="panel-header">
            <h3>Recent activity</h3>
            <button type="button" className="dashboard-action-btn">Submit a Project</button>
          </div>

          {isLoading ? (
            <div className="empty-state"><div><p>Loading projects...</p></div></div>
          ) : error ? (
            <div className="empty-state"><div><p className="form-error">{error}</p></div></div>
          ) : recentItems.length ? (
            <div className="stack-list">
              {recentItems.map((item) => (
                <div key={item.id} className="list-item">
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.description || item.status || 'Project submitted'}</span>
                  </div>
                  <ProjectStatusBadge status={item.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>
                <h3>No active projects yet.</h3>
                <p>Start your first video editing project and keep each phase organized from brief to final delivery.</p>
              </div>
            </div>
          )}
        </section>

        <section className="section-card">
          <div className="panel-header">
            <h3>Quick actions</h3>
          </div>

          <div className="stack-list">
            {[
              'Submit a new project brief',
              'Review current revisions',
              'Check edit status and deadlines',
            ].map((item) => (
              <div key={item} className="list-item">
                <strong>{item}</strong>
                <span>→</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
