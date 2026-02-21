import { LayoutDashboard, Truck, Wrench, Users, BarChart, Settings, LogOut } from 'lucide-react';
import type { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar text-slate-300 flex flex-col shrink-0 fixed h-full z-20">
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
        <div className="bg-accent size-10 rounded-lg flex items-center justify-center text-sidebar">
          <Truck size={24} />
        </div>
        <div>
          <h1 className="text-white text-base font-bold leading-tight">FleetAdmin</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Executive Portal</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
          <LayoutDashboard size={20} />
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentView('registry')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${currentView === 'registry' || currentView === 'add-vehicle' ? 'bg-accent text-sidebar font-bold shadow-lg shadow-accent/20' : 'hover:bg-slate-800 font-medium'}`}
        >
          <Truck size={20} />
          Fleet Registry
        </button>
        <button 
          onClick={() => setCurrentView('maintenance')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${currentView === 'maintenance' || currentView === 'add-maintenance' ? 'bg-accent text-sidebar font-bold shadow-lg shadow-accent/20' : 'hover:bg-slate-800 font-medium'}`}
        >
          <Wrench size={20} />
          Maintenance Log
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
          <Users size={20} />
          Drivers
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
          <BarChart size={20} />
          Reports
        </button>
      </nav>
      <div className="p-4 border-t border-slate-700/50">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium mb-4">
          <Settings size={20} />
          Settings
        </button>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold border border-accent/30">
            JD
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-white truncate">James Dupont</p>
            <p className="text-xs text-slate-400 truncate">Fleet Director</p>
          </div>
          <button className="text-slate-400 hover:text-white">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
