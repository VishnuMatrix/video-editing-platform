import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import About from '../pages/About/About';
import Services from '../pages/Services/Services';
import Portfolio from '../pages/Portfolio/Portfolio';
import Pricing from '../pages/Pricing/Pricing';
import Contact from '../pages/Contact/Contact';
import ClientDashboard from '../pages/Dashboard/ClientDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import Clients from '../pages/Dashboard/admin/Clients';
import Projects from '../pages/Dashboard/admin/Projects';
import Reviews from '../pages/Dashboard/admin/Reviews';
import ClientProjects from '../pages/Dashboard/client/Projects';
import SubmitProject from '../pages/Dashboard/client/SubmitProject';
import Profile from '../pages/Dashboard/Profile';
import Settings from '../pages/Dashboard/Settings';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

function DashboardRootRedirect() {
  const { isAuthenticated, userProfile, loading } = useAuth();

  if (loading) {
    return <div className="auth-loading-screen">Loading your workspace...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={userProfile?.role === 'admin' ? '/dashboard/admin' : '/dashboard/client'} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardRootRedirect /></ProtectedRoute>} />

      <Route
        path="/dashboard/client"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={['client']} fallbackPath="/dashboard/admin">
              <ClientDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={['admin']} fallbackPath="/dashboard/client">
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route path="/dashboard/admin/clients" element={<ProtectedRoute><RoleRoute allowedRoles={['admin']} fallbackPath="/dashboard/client"><Clients /></RoleRoute></ProtectedRoute>} />
      <Route path="/dashboard/admin/projects" element={<ProtectedRoute><RoleRoute allowedRoles={['admin']} fallbackPath="/dashboard/client"><Projects /></RoleRoute></ProtectedRoute>} />
      <Route path="/dashboard/admin/reviews" element={<ProtectedRoute><RoleRoute allowedRoles={['admin']} fallbackPath="/dashboard/client"><Reviews /></RoleRoute></ProtectedRoute>} />
      <Route path="/dashboard/admin/profile" element={<ProtectedRoute><RoleRoute allowedRoles={['admin']} fallbackPath="/dashboard/client"><Profile /></RoleRoute></ProtectedRoute>} />
      <Route path="/dashboard/admin/settings" element={<ProtectedRoute><RoleRoute allowedRoles={['admin']} fallbackPath="/dashboard/client"><Settings /></RoleRoute></ProtectedRoute>} />
      <Route path="/dashboard/client/projects" element={<ProtectedRoute><RoleRoute allowedRoles={['client']} fallbackPath="/dashboard/admin"><ClientProjects /></RoleRoute></ProtectedRoute>} />
      <Route path="/dashboard/client/submit-project" element={<ProtectedRoute><RoleRoute allowedRoles={['client']} fallbackPath="/dashboard/admin"><SubmitProject /></RoleRoute></ProtectedRoute>} />
      <Route path="/dashboard/client/profile" element={<ProtectedRoute><RoleRoute allowedRoles={['client']} fallbackPath="/dashboard/admin"><Profile /></RoleRoute></ProtectedRoute>} />
      <Route path="/dashboard/client/settings" element={<ProtectedRoute><RoleRoute allowedRoles={['client']} fallbackPath="/dashboard/admin"><Settings /></RoleRoute></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
