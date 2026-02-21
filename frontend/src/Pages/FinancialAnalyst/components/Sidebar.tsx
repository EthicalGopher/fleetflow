import type { View } from '../types';
import { PieChart, TrendingUp } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const menuItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'expenses', label: 'Expense Reports', icon: <TrendingUp size={20} /> },
    { id: 'budget', label: 'Budget Overview', icon: <PieChart size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-full fixed top-0 left-0 overflow-y-auto shadow-xl z-10 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-tight text-blue-400">FleetFlow</h2>
        <p className="text-xs text-slate-400 mt-1">Finance Portal</p>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out
              ${currentView === item.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">FA</div>
            <div className="ml-3">
                <p className="text-sm font-medium">Analyst</p>
                <p className="text-xs text-slate-500">View Profile</p>
            </div>
        </div>
      </div>
    </aside>
  );
}
