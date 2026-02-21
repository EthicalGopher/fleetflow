import { Navigate, Outlet } from 'react-router-dom';

const SafetyOfficerProtectAccess = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== 'SafetyOfficer') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default SafetyOfficerProtectAccess;
