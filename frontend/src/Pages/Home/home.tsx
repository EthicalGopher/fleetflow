const Home = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome Home</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-lg">Hello, <strong>{user.full_name}</strong>!</p>
        <p className="text-gray-600">Your role is: <span className="text-indigo-600 font-semibold">{user.role}</span></p>
      </div>
      <div className="mt-6 space-y-4">
        <p>You can access your dashboard based on your role:</p>
        <div className="flex gap-4">
          {user.role === 'Dispatcher' && (
            <a href="/dispatcher" className="bg-indigo-600 text-white px-4 py-2 rounded">Go to Dispatcher Dashboard</a>
          )}
          {user.role === 'FinancialAnalyst' && (
            <a href="/financial-analyst" className="bg-indigo-600 text-white px-4 py-2 rounded">Go to Financial Analyst Dashboard</a>
          )}
          {user.role === 'FleetManager' && (
            <a href="/fleet-manager" className="bg-indigo-600 text-white px-4 py-2 rounded">Go to Fleet Manager Dashboard</a>
          )}
          {user.role === 'SafetyOfficer' && (
            <a href="/safety-officer" className="bg-indigo-600 text-white px-4 py-2 rounded">Go to Safety Officer Dashboard</a>
          )}
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth';
          }}
          className="mt-8 text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
