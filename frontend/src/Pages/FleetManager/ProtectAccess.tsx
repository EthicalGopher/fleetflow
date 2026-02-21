import { Navigate, Outlet } from 'react-router-dom';

const FleetManagerProtectAccess = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== 'FleetManager') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default FleetManagerProtectAccess;
