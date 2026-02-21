import { Navigate, Outlet } from 'react-router-dom';

const FinancialAnalystProtect = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== 'FinancialAnalyst') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default FinancialAnalystProtect;
