import React from 'react';
import { Timer, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const alerts = [
    { id: 'VH-098-FD', time: '5 days', severity: 'critical', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'VH-112-XG', time: '3 days', severity: 'warning', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'VH-882-MK', time: '2 days', severity: 'info', icon: Info, color: 'text-slate-400', bg: 'bg-slate-50' },
];

export function AlertsList() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-extrabold text-slate-800">Idle Alerts</h3>
                <span className="bg-rose-100 text-rose-600 text-[10px] font-extrabold px-2 py-1 rounded-full uppercase tracking-wider">
                    Priority
                </span>
            </div>

            <div className="space-y-4 flex-1">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer group"
                    >
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                            <Timer className="size-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-extrabold text-slate-800 group-hover:text-primary transition-colors">
                                {alert.id}
                            </h4>
                            <p className="text-xs font-bold text-slate-400">Idle for {alert.time}</p>
                        </div>
                        <alert.icon className={alert.color} size={20} />
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 text-primary font-extrabold text-xs uppercase tracking-widest hover:bg-primary/5 rounded-xl transition-all">
                View All Alerts
            </button>
        </div>
    );
}
