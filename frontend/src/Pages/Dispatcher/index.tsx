import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ActiveShipments from './views/ActiveShipments';
import DriverAssignment from './views/DriverAssignment';
import type { View } from './types';

export default function DispatcherDashboard() {
  const [currentView, setCurrentView] = useState<View>('shipments');

  const getTitle = () => {
    switch (currentView) {
      case 'shipments': return 'Active Shipments';
      case 'assignments': return 'Driver Assignments';
      default: return 'Dispatcher Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-ice-blue font-sans text-slate-900 overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 ml-64 flex flex-col min-w-0 h-full">
        <Header title={getTitle()} />
        <div className="flex-1 overflow-auto p-6">
          {currentView === 'shipments' && <ActiveShipments />}
          {currentView === 'assignments' && <DriverAssignment />}
        </div>
      </main>
    </div>
  );
}
