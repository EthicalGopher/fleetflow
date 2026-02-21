import type { View } from '../types';

interface AddMaintenanceProps {
  setCurrentView: (view: View) => void;
}

export default function AddMaintenance({ setCurrentView }: AddMaintenanceProps) {
  return (
    <div className="p-8 max-w-3xl mx-auto">
       <div className="flex items-center mb-8">
        <button 
          onClick={() => setCurrentView('maintenance')}
          className="mr-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Log Maintenance Record</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle</label>
                <select className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 bg-white">
                    <option>Select Vehicle...</option>
                    <option>Toyota Hilux (V001)</option>
                    <option>Ford Ranger (V002)</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Date</label>
                    <input type="date" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Cost Estimate</label>
                    <input type="text" placeholder="$0.00" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
                <select className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5 bg-white">
                    <option>Routine Maintenance</option>
                    <option>Repair</option>
                    <option>Inspection</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description / Notes</label>
                <textarea className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" rows={4} placeholder="Describe the service performed..." />
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
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
                >
                    Save Record
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
