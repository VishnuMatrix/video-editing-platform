import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProjectStatusBadge from '../../../components/dashboard/ProjectStatusBadge';
import { getAllProjects } from '../../../services/firestore/projects';
import { getAllClients } from '../../../services/firestore/users';

const navItems = [
  { label: 'Overview', path: '/dashboard/admin', key: 'overview' },
  { label: 'Clients', path: '/dashboard/admin/clients', key: 'clients' },
  { label: 'Projects', path: '/dashboard/admin/projects', key: 'projects' },
  { label: 'Project Reviews', path: '/dashboard/admin/projects', key: 'reviews' },
  { label: 'Homepage Content', path: '/dashboard/admin#homepage', key: 'homepage' },
  { label: 'Profile', path: '/dashboard/admin#profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/admin#settings', key: 'settings' },
];

const getTimestamp = (value) => {
  if (value?.toMillis) return value.toMillis();
  const timestamp = value ? new Date(value).getTime() : 0;
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    Promise.all([getAllClients(), getAllProjects()])
      .then(([clientItems, projectItems]) => {
        if (isCurrent) {
          setClients(clientItems);
          setProjects(projectItems);
        }
      })
      .catch((loadError) => {
        console.error('Failed to load clients:', loadError);
        if (isCurrent) setError('Clients could not be loaded. Please try again later.');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const projectStatsByClient = projects.reduce((result, project) => {
    const stats = result.get(project.clientId) || { count: 0, activeCount: 0, recentProject: null };
    stats.count += 1;
    if (project.status !== 'completed') stats.activeCount += 1;
    if (getTimestamp(project.updatedAt || project.createdAt) > getTimestamp(stats.recentProject?.updatedAt || stats.recentProject?.createdAt)) {
      stats.recentProject = project;
    }
    result.set(project.clientId, stats);
    return result;
  }, new Map());
  const filteredClients = clients.filter((client) => {
    const searchValue = search.trim().toLowerCase();
    return !searchValue || `${client.name || ''} ${client.email || ''}`.toLowerCase().includes(searchValue);
  });

  const formatDate = (value) => {
    const date = value?.toDate?.() ?? (value ? new Date(value) : null);
    return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString() : '—';
  };

  return (
    <DashboardLayout role="admin" title="Clients" description="Manage client accounts and delivery readiness." navItems={navItems}>
      <section className="section-card">
        <div className="panel-header">
          <h3>Client list</h3>
          <label className="client-search">
            <span className="sr-only">Search clients</span>
            <input
              className="form-input"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search clients"
            />
          </label>
        </div>

        <div className="table-shell">
          {isLoading ? (
            <div className="empty-state"><div><p>Loading clients...</p></div></div>
          ) : error ? (
            <div className="empty-state"><div><p className="form-error">{error}</p></div></div>
          ) : filteredClients.length ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Projects</th>
                  <th>Active Projects</th>
                  <th>Last Activity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => {
                  const stats = projectStatsByClient.get(client.id) || { count: 0, activeCount: 0, recentProject: null };
                  const recentProject = stats.recentProject;

                  return (
                    <tr key={client.id}>
                      <td>{client.name || 'Unnamed client'}</td>
                      <td>{client.email || '—'}</td>
                      <td>{stats.count}</td>
                      <td>{stats.activeCount}</td>
                      <td>{formatDate(recentProject?.updatedAt || recentProject?.createdAt || client.updatedAt)}</td>
                      <td>{recentProject?.status ? <ProjectStatusBadge status={recentProject.status} /> : <span className="muted">No projects</span>}</td>
                      <td>
                        <div className="table-actions">
                          <Link className="table-action-btn" to={`/dashboard/admin/projects?client=${encodeURIComponent(client.id)}`}>Projects</Link>
                          {client.email && <a className="table-action-btn" href={`mailto:${client.email}`}>Email</a>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div>
                <h3>{search ? 'No matching clients.' : 'No clients found.'}</h3>
                <p>{search ? 'Try another name or email address.' : 'Client profiles will appear here after registration.'}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}
