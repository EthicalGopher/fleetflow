import { cn } from '../../../lib/utils';
import { Mail, Phone, MapPin, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import type { View } from '../types';

interface DriversProps {
  setCurrentView: (view: View) => void;
  onEdit: (driver: any) => void;
}

export default function Drivers({ setCurrentView, onEdit }: DriversProps) {
  const [drivers, setDrivers] = useState<any[]>([]);

  const fetchDrivers = () => {
    api.get('/drivers').then(data => {
        if (Array.isArray(data)) {
            setDrivers(data);
        }
    });
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete driver ${id}?`)) {
        const response = await api.delete(`/drivers/${id}`);
        if (response && !response.error) {
            fetchDrivers();
        } else {
            alert(response.error || 'Failed to delete driver');
        }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Drivers Directory</h2>
            <p className="text-slate-500 mt-1">Manage fleet personnel and assignments</p>
        </div>
        <button 
          onClick={() => setCurrentView('add-driver')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <span>+</span> Add Driver
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-800">Fleet Personnel</h3>
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
                <th className="px-8 py-4 text-right">Actions</th>
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
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3">
                        <button 
                            onClick={() => onEdit(driver)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(driver.id)}
                            className="text-rose-600 hover:text-rose-800 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
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
