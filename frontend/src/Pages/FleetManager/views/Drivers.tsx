import { cn } from '../../../lib/utils';
import { Mail, Phone, MapPin } from 'lucide-react';

const drivers = [
  { id: 'DR-001', name: 'John Smith', status: 'Active', email: 'john.smith@fleetflow.com', phone: '+1 555 0101', location: 'New York', rating: 4.8 },
  { id: 'DR-002', name: 'Sarah Wilson', status: 'Active', email: 'sarah.w@fleetflow.com', phone: '+1 555 0102', location: 'Chicago', rating: 4.9 },
  { id: 'DR-003', name: 'Robert Brown', status: 'On Leave', email: 'robert.b@fleetflow.com', phone: '+1 555 0103', location: 'Boston', rating: 4.5 },
  { id: 'DR-004', name: 'Emily Davis', status: 'Active', email: 'emily.d@fleetflow.com', phone: '+1 555 0104', location: 'Austin', rating: 4.7 },
  { id: 'DR-005', name: 'Michael Chen', status: 'Suspended', email: 'm.chen@fleetflow.com', phone: '+1 555 0105', location: 'Seattle', rating: 3.9 },
];

export default function Drivers() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-800">Drivers Directory</h3>
          <div className="flex gap-2">
            {['Active', 'On Leave', 'Suspended'].map((status) => (
              <span
                key={status}
                className={cn(
                  "text-[10px] px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider",
                  status === 'Active' && "bg-emerald-100 text-emerald-700",
                  status === 'On Leave' && "bg-amber-100 text-amber-700",
                  status === 'Suspended' && "bg-rose-100 text-rose-700"
                )}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Driver ID</th>
                <th className="px-8 py-4">Driver Name</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Contact Info</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-bold">
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-slate-800 group-hover:text-primary transition-colors">{driver.id}</td>
                  <td className="px-8 py-5 text-slate-800">{driver.name}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest",
                      driver.status === 'Active' && "bg-emerald-100 text-emerald-700",
                      driver.status === 'On Leave' && "bg-amber-100 text-amber-700",
                      driver.status === 'Suspended' && "bg-rose-100 text-rose-700"
                    )}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                        <Mail size={12} />
                        {driver.email}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                        <Phone size={12} />
                        {driver.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={14} />
                      {driver.location}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-extrabold text-amber-500">
                    {driver.rating.toFixed(1)} ★
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 flex justify-center">
          <button className="text-[10px] font-extrabold text-slate-400 hover:text-primary uppercase tracking-widest transition-all">
            Load More Drivers
          </button>
        </div>
      </div>
    </div>
  );
}
