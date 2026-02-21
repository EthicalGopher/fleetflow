import type { View } from '../types';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { Trash2 } from 'lucide-react';

interface VehicleRegistryProps {
  setCurrentView: (view: View) => void;
  onEdit: (vehicle: any) => void;
}

export default function VehicleRegistry({ setCurrentView, onEdit }: VehicleRegistryProps) {
  const [vehicles, setVehicles] = useState<any[]>([]);

  const fetchVehicles = () => {
    api.get('/vehicles').then(data => {
        if (Array.isArray(data)) {
            setVehicles(data);
        }
    });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete vehicle ${id}?`)) {
        const response = await api.delete(`/vehicles/${id}`);
        if (response && !response.error) {
            fetchVehicles();
        } else {
            alert(response.error || 'Failed to delete vehicle');
        }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Vehicle Registry</h2>
            <p className="text-slate-500 mt-1">Manage and track fleet vehicles</p>
        </div>
        <button 
          onClick={() => setCurrentView('add-vehicle')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <span>+</span> Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Make & Model</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Mileage</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{vehicle.id}</td>
                  <td className="px-6 py-4">{vehicle.make} {vehicle.model}</td>
                  <td className="px-6 py-4">{vehicle.year}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${vehicle.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{vehicle.mileage}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                        <button 
                            onClick={() => onEdit(vehicle)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(vehicle.id)}
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
        {vehicles.length === 0 && (
            <div className="p-12 text-center text-slate-500">
                <p>No vehicles found. Add your first vehicle to get started.</p>
            </div>
        )}
      </div>
    </div>
  );
}
