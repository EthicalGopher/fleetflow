import {
    LayoutDashboard,
    Truck,
    Users,
    Wrench,
    BarChart3,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";

export type ViewType = 'overview' | 'vehicles' | 'drivers' | 'maintenance' | 'reports';

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname.split('/').pop() || 'overview';
    const activeView = currentPath === 'financial-analyst' ? 'overview' : currentPath;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth');
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/financial-analyst' },
        { id: 'vehicles', label: 'Vehicles', icon: Truck, path: '/financial-analyst/vehicles' },
        { id: 'drivers', label: 'Drivers', icon: Users, path: '/financial-analyst/drivers' },

        { id: 'reports', label: 'Reports', icon: BarChart3, path: '/financial-analyst/reports' },
    ] as const;

    return (
        <aside className="w-64 bg-navy-primary text-white flex flex-col shrink-0 h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <img src={logo} alt="FleetFlow Logo" className="w-10 h-10 object-contain" />
                <h1 className="text-xl font-extrabold tracking-tight text-white">FleetFlow</h1>
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

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-400/10 transition-all"
                >
                    <LogOut className="size-5" />
                    <span className="font-semibold text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}
