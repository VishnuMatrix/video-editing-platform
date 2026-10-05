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

export default function DashboardMobileNav({ role, navItems, open, onClose }) {
  const items = navItems || navMap[role] || navMap.client;

  if (!open) return null;

  return (
    <>
      <div className="mobile-overlay" onClick={onClose} />
      <aside className={`mobile-drawer ${open ? 'open' : ''}`}>
        <div className="dashboard-brand" style={{ marginBottom: '18px' }}>
          <span className="dashboard-brand-mark">OF</span>
          <span className="dashboard-brand-name">Oneforedit</span>
        </div>

        <nav className="dashboard-nav-group">
          {items.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              end={item.path === '/dashboard/client' || item.path === '/dashboard/admin'}
              onClick={onClose}
            >
              <span>{item.label}</span>
              <small>→</small>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
