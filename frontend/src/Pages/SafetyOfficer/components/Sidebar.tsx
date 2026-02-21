import type { View } from '../types';
import { AlertTriangle, ClipboardCheck } from 'lucide-react';
import logo from "../../../assets/logo.png";

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const menuItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'incidents', label: 'Safety Incidents', icon: <AlertTriangle size={20} /> },
    { id: 'compliance', label: 'Compliance Checks', icon: <ClipboardCheck size={20} /> },
  ];

  return (
    <aside className="w-64 bg-navy-primary text-white h-full fixed top-0 left-0 overflow-y-auto shadow-xl z-10 flex flex-col">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <img src={logo} alt="FleetFlow Logo" className="w-8 h-8 object-contain" />
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">FleetFlow</h2>
          <p className="text-xs text-white/50">Safety Portal</p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out
              ${currentView === item.id 
                ? 'bg-primary-orange text-white shadow-md' 
                : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">SO</div>
            <div className="ml-3">
                <p className="text-sm font-medium">Officer</p>
                <p className="text-xs text-white/40">View Profile</p>
            </div>
        </div>
      </div>
    </aside>
  );
}
