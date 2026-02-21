import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'Dispatcher': return '/dispatcher';
      case 'FinancialAnalyst': return '/financial-analyst';
      case 'FleetManager': return '/fleet-manager';
      case 'SafetyOfficer': return '/safety-officer';
      default: return '/';
    }
  };

  // Optional: Auto-redirect if they are already logged in and land here
  useEffect(() => {
    if (user.role) {
       // Uncomment if you want auto-redirect
       // navigate(getDashboardPath(user.role));
    }
  }, [user.role, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-8 py-6">
          <h1 className="text-2xl font-bold text-white text-center">Welcome Back</h1>
          <p className="text-blue-100 text-center mt-1">FleetFlow Portal</p>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600">
              {user.full_name ? user.full_name.charAt(0) : 'U'}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user.full_name || 'User'}</h2>
            <span className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wide">
              {user.role || 'Guest'}
            </span>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate(getDashboardPath(user.role))}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center"
            >
              Access Dashboard
            </button>
            
            <button 
              onClick={handleLogout}
              className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-red-600 font-medium py-3 px-4 rounded-xl transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
