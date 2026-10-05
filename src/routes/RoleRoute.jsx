import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleRoute({ children, allowedRoles = [], fallbackPath = '/dashboard/client' }) {
  const { userProfile, loading, isAuthenticated, isAdmin, isClient } = useAuth();

  if (loading) {
    return <div className="auth-loading-screen">Loading your access...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.length) {
    return children;
  }

  const hasAccess = allowedRoles.some((role) => {
    if (role === 'admin') return isAdmin;
    if (role === 'client') return isClient;
    return userProfile?.role === role;
  });

  if (!hasAccess) {
    const redirectPath = isAdmin ? '/dashboard/admin' : '/dashboard/client';
    return <Navigate to={fallbackPath || redirectPath} replace />;
  }

  return children;
}
