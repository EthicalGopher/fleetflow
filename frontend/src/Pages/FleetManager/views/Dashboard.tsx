import { Truck, Wrench, Users, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_vehicles: 0,
    in_maintenance: 0,
    active_drivers: 0,
    safety_alerts: 0,
    recent_activity: [] as any[],
    upcoming_service: [] as any[]
  });

  useEffect(() => {
    api.get('/dashboard/stats').then(data => {
        if (data && !data.error) {
            setStats(data);
        }
    });
  }, []);

  const statCards = [
    { label: 'Total Vehicles', value: stats.total_vehicles, icon: Truck, color: 'bg-blue-100 text-blue-600' },
    { label: 'In Maintenance', value: stats.in_maintenance, icon: Wrench, color: 'bg-orange-100 text-orange-600' },
    { label: 'Active Drivers', value: stats.active_drivers, icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Safety Alerts', value: stats.safety_alerts, icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-extrabold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 mb-6">Recent Fleet Activity</h3>
          <div className="space-y-6">
            {stats.recent_activity.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">
                    {item.vehicle} completed {item.type}
                  </p>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
              </div>
            ))}
            {stats.recent_activity.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No recent activity found.</p>
            )}
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 mb-6">Upcoming Service</h3>
          <div className="space-y-6">
             {stats.upcoming_service.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <Wrench size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.vehicle}</p>
                    <p className="text-xs text-slate-400">{item.type}</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                    {item.date}
                </span>
              </div>
            ))}
            {stats.upcoming_service.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No upcoming service scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
