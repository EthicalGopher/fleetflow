import { Navigate, Outlet } from 'react-router-dom';

interface ProtectAccessProps {
  allowedRoles: string[];
}

const ProtectAccess = ({ allowedRoles }: ProtectAccessProps) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectAccess;
