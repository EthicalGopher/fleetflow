import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SafetyIncidents from './views/SafetyIncidents';
import ComplianceCheck from './views/ComplianceCheck';
import type { View } from './types';

export default function SafetyOfficerDashboard() {
  const [currentView, setCurrentView] = useState<View>('incidents');

  const getTitle = () => {
    switch (currentView) {
      case 'incidents': return 'Safety Incidents';
      case 'compliance': return 'Compliance Checks';
      default: return 'Safety Officer Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 ml-64 flex flex-col min-w-0 h-full">
        <Header title={getTitle()} />
        <div className="flex-1 overflow-auto bg-slate-50 p-6">
          {currentView === 'incidents' && <SafetyIncidents />}
          {currentView === 'compliance' && <ComplianceCheck />}
        </div>
      </main>
    </div>
  );
}
