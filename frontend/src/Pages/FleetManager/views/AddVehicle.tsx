import type { View } from '../types';

interface AddVehicleProps {
  setCurrentView: (view: View) => void;
}

export default function AddVehicle({ setCurrentView }: AddVehicleProps) {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => setCurrentView('registry')}
          className="mr-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Register New Vehicle</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
                    <input type="text" placeholder="e.g. Toyota" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                    <input type="text" placeholder="e.g. Hilux" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                    <input type="number" placeholder="2024" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">License Plate</label>
                    <input type="text" placeholder="ABC-1234" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">VIN (Vehicle Identification Number)</label>
                <input type="text" className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2.5" />
            </div>

             <div className="flex justify-end pt-6 border-t border-slate-100 mt-6 gap-3">
                <button 
                    type="button"
                    onClick={() => setCurrentView('registry')}
                    className="px-5 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
                >
                    Register Vehicle
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
