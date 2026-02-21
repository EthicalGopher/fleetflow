import type { View } from '../types';
import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';

interface AddMaintenanceProps {
  setCurrentView: (view: View) => void;
  initialData?: any;
  isEdit?: boolean;
}

export default function AddMaintenance({ setCurrentView, initialData, isEdit }: AddMaintenanceProps) {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    vehicle_id: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Routine Maintenance',
    cost: 0,
    status: 'Pending',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/vehicles').then(data => {
        if (Array.isArray(data)) {
            setVehicles(data);
        }
    });

    if (isEdit && initialData) {
      // Extract numeric cost from "$250.00" string if necessary
      const costValue = typeof initialData.cost === 'string' 
        ? parseFloat(initialData.cost.replace(/[^0-9.]/g, '')) 
        : initialData.cost;

      // Extract vehicle ID from "Toyota Hilux (V001)"
      const vehicleIdMatch = initialData.vehicle.match(/\(([^)]+)\)/);
      const vehicleId = vehicleIdMatch ? vehicleIdMatch[1] : '';

      setFormData({
        id: initialData.id,
        vehicle_id: vehicleId,
        date: initialData.date,
        type: initialData.type,
        cost: costValue,
        status: initialData.status,
        description: initialData.description || ''
      });
    }
  }, [isEdit, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vehicle_id) {
        alert("Please select a vehicle");
        return;
    }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        cost: parseFloat(formData.cost.toString()),
      };

      let response;
      if (isEdit) {
        response = await api.put(`/maintenance/${formData.id}`, payload);
      } else {
        response = await api.post('/maintenance', payload);
      }

      if (response && !response.error) {
        setCurrentView('maintenance');
      } else {
        alert(response.error || `Failed to ${isEdit ? 'update' : 'add'} maintenance log`);
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
       <div className="flex items-center mb-8">
        <button 
          onClick={() => setCurrentView('maintenance')}
          className="mr-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-slate-900">
            {isEdit ? 'Edit Maintenance Record' : 'Log Maintenance Record'}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle</label>
                <select 
                    required
                    disabled={isEdit}
                    value={formData.vehicle_id}
                    onChange={(e) => setFormData({...formData, vehicle_id: e.target.value})}
                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 bg-white disabled:bg-slate-50"
                >
                    <option value="">Select Vehicle...</option>
                    {vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.make} {v.model} ({v.id})</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Date</label>
                    <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cost Estimate</label>
                    <input 
                        type="number" 
                        step="0.01"
                        required
                        value={formData.cost}
                        onChange={(e) => setFormData({...formData, cost: parseFloat(e.target.value)})}
                        placeholder="$0.00" 
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
                    <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 bg-white"
                    >
                        <option>Routine Maintenance</option>
                        <option>Repair</option>
                        <option>Inspection</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 bg-white"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description / Notes</label>
                <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" 
                    rows={4} 
                    placeholder="Describe the service performed..." 
                />
            </div>

             <div className="flex justify-end pt-6 border-t border-slate-100 mt-6 gap-3">
                <button 
                    type="button"
                    onClick={() => setCurrentView('maintenance')}
                    className="px-5 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (isEdit ? 'Update Record' : 'Save Record')}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
