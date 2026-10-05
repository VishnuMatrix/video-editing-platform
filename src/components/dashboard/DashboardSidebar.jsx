import { NavLink } from 'react-router-dom';

const navMap = {
  client: [
    { label: 'Overview', path: '/dashboard/client', key: 'overview' },
    { label: 'Projects', path: '/dashboard/client/projects', key: 'projects' },
    { label: 'Submit Project', path: '/dashboard/client/submit-project', key: 'submit-project' },
    { label: 'Reviews', path: '/dashboard/client/projects', key: 'reviews' },
    { label: 'Profile', path: '/dashboard/client/profile', key: 'profile' },
    { label: 'Settings', path: '/dashboard/client/settings', key: 'settings' },
  ],
  admin: [
    { label: 'Overview', path: '/dashboard/admin', key: 'overview' },
    { label: 'Clients', path: '/dashboard/admin/clients', key: 'clients' },
    { label: 'Projects', path: '/dashboard/admin/projects', key: 'projects' },
    { label: 'Project Reviews', path: '/dashboard/admin/reviews', key: 'reviews' },
    { label: 'Homepage Content', path: '/dashboard/admin#homepage', key: 'homepage' },
    { label: 'Profile', path: '/dashboard/admin/profile', key: 'profile' },
    { label: 'Settings', path: '/dashboard/admin/settings', key: 'settings' },
  ],
};

export default function DashboardSidebar({ role, navItems }) {
  const items = navItems || navMap[role] || navMap.client;

  return (
    <aside className="dashboard-sidebar">
      <a className="dashboard-brand" href="/">
        <span className="dashboard-brand-mark">OF</span>
        <span className="dashboard-brand-name">Oneforedit</span>
      </a>

      <nav className="dashboard-nav-group">
        <div className="dashboard-nav-label">Navigation</div>

        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            end={item.path === '/dashboard/client' || item.path === '/dashboard/admin'}
          >
            <span>{item.label}</span>
            <small>{item.key === 'projects' ? '0' : '→'}</small>
          </NavLink>
        ))}
      </nav>

      <div className="dashboard-sidebar-footer">
        <h4>Studio status</h4>
        <p>Available for new client projects and editor review cycles.</p>
      </div>
    </aside>
  );
}
