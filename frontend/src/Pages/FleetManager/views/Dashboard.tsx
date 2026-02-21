import { Truck, Wrench, Users, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Vehicles', value: '42', icon: Truck, color: 'bg-blue-100 text-blue-600' },
    { label: 'In Maintenance', value: '5', icon: Wrench, color: 'bg-orange-100 text-orange-600' },
    { label: 'Active Drivers', value: '38', icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Safety Alerts', value: '2', icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">Vehicle V001 completed maintenance</p>
                  <p className="text-xs text-slate-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-800 mb-6">Upcoming Service</h3>
          <div className="space-y-6">
             {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <Wrench size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Toyota Hilux (V004)</p>
                    <p className="text-xs text-slate-400">Routine Checkup</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">Tomorrow</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
