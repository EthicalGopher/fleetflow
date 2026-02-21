import { LayoutDashboard, Truck, Wrench, Users, BarChart, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { View } from '../types';
import logo from "../../../assets/logo.png";

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <aside className="w-64 bg-navy-primary text-slate-300 flex flex-col shrink-0 fixed h-full z-20">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <img src={logo} alt="FleetFlow Logo" className="w-10 h-10 object-contain" />
        <div>
          <h1 className="text-white text-base font-bold leading-tight">FleetFlow</h1>
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Fleet Portal</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
          <LayoutDashboard size={20} />
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentView('registry')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${currentView === 'registry' || currentView === 'add-vehicle' ? 'bg-primary-orange text-white font-bold shadow-lg shadow-primary-orange/20' : 'hover:bg-white/5 font-medium'}`}
        >
          <Truck size={20} />
          Fleet Registry
        </button>
        <button 
          onClick={() => setCurrentView('maintenance')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${currentView === 'maintenance' || currentView === 'add-maintenance' ? 'bg-primary-orange text-white font-bold shadow-lg shadow-primary-orange/20' : 'hover:bg-white/5 font-medium'}`}
        >
          <Wrench size={20} />
          Maintenance Log
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
          <Users size={20} />
          Drivers
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
          <BarChart size={20} />
          Reports
        </button>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium mb-4">
          <Settings size={20} />
          Settings
        </button>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
          <div className="size-10 rounded-full bg-navy-primary flex items-center justify-center text-white font-bold border border-white/10">
            JD
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold text-white truncate">James Dupont</p>
            <p className="text-xs text-white/40 truncate">Fleet Director</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-white/40 hover:text-white transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
