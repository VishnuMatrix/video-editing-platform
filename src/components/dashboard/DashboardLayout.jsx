import { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardMobileNav from './DashboardMobileNav';
import '../../styles/dashboard.css';

export default function DashboardLayout({ role, title, description, navItems, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const resolvedNavItems = navItems?.map((item) => {
    if (item.key === 'profile' || item.key === 'settings') {
      return { ...item, path: `/dashboard/${role}/${item.key}` };
    }

    if (item.key === 'reviews') {
      return { ...item, path: role === 'admin' ? '/dashboard/admin/reviews' : '/dashboard/client/projects' };
    }

    return item;
  });

  return (
    <div className="dashboard-shell">
      <DashboardSidebar role={role} navItems={resolvedNavItems} />
      <DashboardMobileNav
        role={role}
        navItems={resolvedNavItems}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="dashboard-main">
        <DashboardHeader
          title={title}
          description={description}
          role={role}
          onMenuClick={() => setMobileOpen(true)}
        />

        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}
