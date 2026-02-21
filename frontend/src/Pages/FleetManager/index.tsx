

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import VehicleRegistry from './views/VehicleRegistry';
import AddVehicle from './views/AddVehicle';
import MaintenanceLog from './views/MaintenanceLog';
import AddMaintenance from './views/AddMaintenance';
import type { View } from './types';

export default function FleetManagerDashboard() {
  const [currentView, setCurrentView] = useState<View>('registry');

  const getTitle = () => {
    switch (currentView) {
      case 'registry':
      case 'add-vehicle':
        return 'Vehicle Registry Dashboard';
      case 'maintenance':
      case 'add-maintenance':
        return 'Maintenance & Service Log';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 ml-64 flex flex-col min-w-0 h-full">
        <Header title={getTitle()} />
        <div className="flex-1 overflow-auto bg-slate-50 p-6">
          {currentView === 'registry' && <VehicleRegistry setCurrentView={setCurrentView} />}
          {currentView === 'add-vehicle' && <AddVehicle setCurrentView={setCurrentView} />}
          {currentView === 'maintenance' && <MaintenanceLog setCurrentView={setCurrentView} />}
          {currentView === 'add-maintenance' && <AddMaintenance setCurrentView={setCurrentView} />}
        </div>
      </main>
    </div>
  );
}
