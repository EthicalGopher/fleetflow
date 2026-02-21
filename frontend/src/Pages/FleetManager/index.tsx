

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import VehicleRegistry from './views/VehicleRegistry';
import AddVehicle from './views/AddVehicle';
import MaintenanceLog from './views/MaintenanceLog';
import AddMaintenance from './views/AddMaintenance';
import Drivers from './views/Drivers';
import AddDriver from './views/AddDriver';
import Reports from './views/Reports';
import type { View } from './types';

export default function FleetManagerDashboard() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Fleet Management Overview';
      case 'registry':
      case 'add-vehicle':
      case 'edit-vehicle':
        return 'Vehicle Registry Dashboard';
      case 'maintenance':
      case 'add-maintenance':
      case 'edit-maintenance':
        return 'Maintenance & Service Log';
      case 'drivers':
      case 'add-driver':
      case 'edit-driver':
        return 'Driver Network Directory';
      case 'reports':
        return 'Fleet Performance Reports';
      default:
        return 'Dashboard';
    }
  };

  const handleEdit = (view: View, item: any) => {
    setSelectedItem(item);
    setCurrentView(view);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 ml-64 flex flex-col min-w-0 h-full">
        <Header title={getTitle()} />
        <div className="flex-1 overflow-auto bg-slate-50 p-6">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'registry' && <VehicleRegistry setCurrentView={setCurrentView} onEdit={(v) => handleEdit('edit-vehicle', v)} />}
          {currentView === 'add-vehicle' && <AddVehicle setCurrentView={setCurrentView} />}
          {currentView === 'edit-vehicle' && <AddVehicle setCurrentView={setCurrentView} initialData={selectedItem} isEdit />}
          {currentView === 'maintenance' && <MaintenanceLog setCurrentView={setCurrentView} onEdit={(m) => handleEdit('edit-maintenance', m)} />}
          {currentView === 'add-maintenance' && <AddMaintenance setCurrentView={setCurrentView} />}
          {currentView === 'edit-maintenance' && <AddMaintenance setCurrentView={setCurrentView} initialData={selectedItem} isEdit />}
          {currentView === 'drivers' && <Drivers setCurrentView={setCurrentView} onEdit={(d) => handleEdit('edit-driver', d)} />}
          {currentView === 'add-driver' && <AddDriver setCurrentView={setCurrentView} />}
          {currentView === 'edit-driver' && <AddDriver setCurrentView={setCurrentView} initialData={selectedItem} isEdit />}
          {currentView === 'reports' && <Reports />}
        </div>
      </main>
    </div>
  );
}
