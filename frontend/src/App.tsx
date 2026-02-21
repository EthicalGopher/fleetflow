import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SigninandSignup from './Pages/SigninandSignup';
import Home from './Pages/Home/home';
import DispatcherDashboard from './Pages/Dispatcher/index';
import FinancialAnalystDashboard from './Pages/FinancialAnalyst/index';
import FleetManagerDashboard from './Pages/FleetManager/index';
import SafetyOfficerDashboard from './Pages/SaftyOfficer/index';

// Specialized ProtectAccess components
import DispatcherProtect from './Pages/Dispatcher/ProtectAccess';
import FinancialAnalystProtect from './Pages/FinancialAnalyst/ProtectAccess';
import FleetManagerProtect from './Pages/FleetManager/ProtectAccess';
import SafetyOfficerProtect from './Pages/SaftyOfficer/ProtectAccess';
import GeneralProtect from './Pages/ProtectAccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<SigninandSignup />} />

        {/* Protected Routes */}
        <Route element={<GeneralProtect allowedRoles={['Dispatcher', 'FinancialAnalyst', 'FleetManager', 'SafetyOfficer']} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<DispatcherProtect />}>
          <Route path="/dispatcher" element={<DispatcherDashboard />} />
        </Route>

        <Route element={<FinancialAnalystProtect />}>
          <Route path="/financial-analyst/*" element={<FinancialAnalystDashboard />} />
        </Route>

        <Route element={<FleetManagerProtect />}>
          <Route path="/fleet-manager" element={<FleetManagerDashboard />} />
        </Route>

        <Route element={<SafetyOfficerProtect />}>
          <Route path="/safety-officer" element={<SafetyOfficerDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
