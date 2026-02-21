import {
    LayoutDashboard,
    Truck,
    Users,
    Wrench,
    BarChart3,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export type ViewType = 'overview' | 'vehicles' | 'drivers' | 'maintenance' | 'reports' | 'settings';

export function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop() || 'overview';
    const activeView = currentPath === 'financial-analyst' ? 'overview' : currentPath;

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/financial-analyst' },
        { id: 'vehicles', label: 'Vehicles', icon: Truck, path: '/financial-analyst/vehicles' },
        { id: 'drivers', label: 'Drivers', icon: Users, path: '/financial-analyst/drivers' },
        { id: 'maintenance', label: 'Maintenance', icon: Wrench, path: '/financial-analyst/maintenance' },
        { id: 'reports', label: 'Reports', icon: BarChart3, path: '/financial-analyst/reports' },
    ] as const;

    return (
        <aside className="w-64 bg-primary text-white flex flex-col shrink-0 h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-accent-gold p-2 rounded-lg">
                    <Truck className="text-primary size-6" strokeWidth={2.5} />
                </div>
                <h1 className="text-xl font-extrabold tracking-tight">FleetPro</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                            activeView === item.id
                                ? "bg-white/15 text-white shadow-lg"
                                : "text-white/60 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <item.icon className={cn(
                            "size-5 transition-transform duration-200",
                            activeView === item.id ? "scale-110" : "group-hover:scale-110"
                        )} />
                        <span className="font-semibold text-sm">{item.label}</span>
                        {activeView === item.id && (
                            <ChevronRight className="ml-auto size-4 opacity-50" />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                <Link
                    to="/financial-analyst/settings"
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                        activeView === 'settings'
                            ? "bg-white/15 text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                >
                    <Settings className="size-5" />
                    <span className="font-semibold text-sm">Settings</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-400/10 transition-all">
                    <LogOut className="size-5" />
                    <span className="font-semibold text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}
