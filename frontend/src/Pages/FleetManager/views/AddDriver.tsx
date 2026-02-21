import type { View } from '../types';
import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';

interface AddDriverProps {
  setCurrentView: (view: View) => void;
  initialData?: any;
  isEdit?: boolean;
}

export default function AddDriver({ setCurrentView, initialData, isEdit }: AddDriverProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'Active',
    rating: 5.0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        location: initialData.location,
        status: initialData.status,
        rating: initialData.rating,
      });
    }
  }, [isEdit, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await api.put(`/drivers/${formData.id}`, formData);
      } else {
        response = await api.post('/drivers', formData);
      }

      if (response && !response.error) {
        setCurrentView('drivers');
      } else {
        alert(response.error || `Failed to ${isEdit ? 'update' : 'add'} driver`);
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
          onClick={() => setCurrentView('drivers')}
          className="mr-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-slate-900">
            {isEdit ? 'Edit Driver' : 'Register New Driver'}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Driver ID</label>
                    <input 
                        type="text" 
                        required
                        disabled={isEdit}
                        value={formData.id}
                        onChange={(e) => setFormData({...formData, id: e.target.value})}
                        placeholder="DR-001" 
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 disabled:bg-slate-50" 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@fleetflow.com" 
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input 
                        type="text" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+1 555 0000" 
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input 
                        type="text" 
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="City, State" 
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 bg-white"
                    >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
            </div>

             <div className="flex justify-end pt-6 border-t border-slate-100 mt-6 gap-3">
                <button 
                    type="button"
                    onClick={() => setCurrentView('drivers')}
                    className="px-5 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (isEdit ? 'Update Driver' : 'Register Driver')}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
