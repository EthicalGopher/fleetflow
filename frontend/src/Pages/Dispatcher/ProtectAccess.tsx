import { Navigate, Outlet } from 'react-router-dom';

const DispatcherProtectAccess = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== 'Dispatcher') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default DispatcherProtectAccess;
