import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ProjectStatusBadge from '../../components/dashboard/ProjectStatusBadge';
import { getAllProjects } from '../../services/firestore/projects';

const navItems = [
  { label: 'Overview', path: '/dashboard/admin', key: 'overview' },
  { label: 'Clients', path: '/dashboard/admin/clients', key: 'clients' },
  { label: 'Projects', path: '/dashboard/admin/projects', key: 'projects' },
  { label: 'Project Reviews', path: '/dashboard/admin/projects', key: 'reviews' },
  { label: 'Homepage Content', path: '/dashboard/admin#homepage', key: 'homepage' },
  { label: 'Profile', path: '/dashboard/admin#profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/admin#settings', key: 'settings' },
];

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const clients = [];

  useEffect(() => {
    let isCurrent = true;

    getAllProjects()
      .then((items) => {
        if (isCurrent) setProjects(items);
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
  }, []);

  const countStatus = (...statuses) => projects.filter((project) => statuses.includes(project.status)).length;
  const metrics = [
    { label: 'Total Clients', value: '0', foot: 'Active and onboarded' },
    { label: 'Active Projects', value: countStatus('submitted', 'started', 'in_progress', 'review', 'revision_requested'), foot: 'Currently in production' },
    { label: 'Awaiting Review', value: countStatus('review'), foot: 'Requires editor attention' },
    { label: 'Completed', value: countStatus('completed'), foot: 'Ready to archive' },
  ];

  return (
    <DashboardLayout role="admin" title="Admin Dashboard" description="Studio operations overview for clients, projects, and content coordination." navItems={navItems}>
      <div className="dashboard-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <span className="metric-label">{metric.label}</span>
            <div className="metric-value">
              <strong>{metric.value}</strong>
              <span>total</span>
            </div>
            <div className="metric-foot">{metric.foot}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-row">
        <section className="section-card">
          <div className="panel-header">
            <h3>Recent projects</h3>
          </div>

          {isLoading ? (
            <div className="empty-state"><div><p>Loading projects...</p></div></div>
          ) : error ? (
            <div className="empty-state"><div><p className="form-error">{error}</p></div></div>
          ) : projects.length ? (
            <div className="stack-list">
              {projects.map((item) => (
                <div key={item.id} className="list-item">
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.client || item.clientId || '—'}</span>
                  </div>
                  <ProjectStatusBadge status={item.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>
                <h3>No projects yet.</h3>
                <p>Client submissions will appear here once they are created in Firestore.</p>
              </div>
            </div>
          )}
        </section>

        <section className="section-card">
          <div className="panel-header">
            <h3>Recent clients</h3>
          </div>

          {clients.length ? (
            <div className="stack-list">
              {clients.map((client) => (
                <div key={client.id} className="list-item">
                  <div>
                    <strong>{client.name}</strong>
                    <span>{client.email}</span>
                  </div>
                  <span className="muted">{client.role}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>
                <h3>No clients yet.</h3>
                <p>Client accounts will appear here after registration and profile creation.</p>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="section-card" style={{ marginTop: '20px' }}>
        <div className="panel-header">
          <h3>Project status overview</h3>
        </div>

        <div className="stack-list">
          {['submitted', 'started', 'in_progress', 'review', 'revision_requested', 'completed'].map((status) => (
            <div key={status} className="list-item">
              <strong>{status.replace(/_/g, ' ')}</strong>
              <ProjectStatusBadge status={status} />
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
