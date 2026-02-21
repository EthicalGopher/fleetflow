import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SigninandSignup from './Pages/SigninandSignup';
import Home from './Pages/Home/home';
import DispatcherDashboard from './Pages/Dispatcher';
import FinancialAnalystDashboard from './Pages/FinancialAnalyst';
import FleetManagerDashboard from './Pages/FleetManager';
import SafetyOfficerDashboard from './Pages/SafetyOfficer';

// Specialized ProtectAccess components
import ProtectedRoute from './Pages/ProtectAccess';
import FinancialAnalystProtect from './Pages/FinancialAnalyst/ProtectAccess';

function App() {
  const allRoles = ['Dispatcher', 'FinancialAnalyst', 'FleetManager', 'SafetyOfficer', 'user'];

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<SigninandSignup />} />
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={allRoles} />}>
          {/* Add other general protected routes here if needed */}
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Dispatcher']} />}>
          <Route path="/dispatcher" element={<DispatcherDashboard />} />
        </Route>

        <Route element={<FinancialAnalystProtect />}>
          <Route path="/financial-analyst/*" element={<FinancialAnalystDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['FleetManager']} />}>
          <Route path="/fleet-manager" element={<FleetManagerDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['SafetyOfficer']} />}>
          <Route path="/safety-officer" element={<SafetyOfficerDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
