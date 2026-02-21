import type { View } from '../types';

interface MaintenanceLogProps {
  setCurrentView: (view: View) => void;
}

export default function MaintenanceLog({ setCurrentView }: MaintenanceLogProps) {
  const logs = [
    { id: 'M001', vehicle: 'Toyota Hilux (V001)', date: '2023-10-15', type: 'Routine Service', cost: '$250', status: 'Completed' },
    { id: 'M002', vehicle: 'Ford Ranger (V002)', date: '2023-11-02', type: 'Brake Replacement', cost: '$450', status: 'In Progress' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Maintenance Logs</h2>
            <p className="text-slate-500 mt-1">Track service history and repairs</p>
        </div>
        <button 
          onClick={() => setCurrentView('add-maintenance')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <span>+</span> Log Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Service Type</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{log.id}</td>
                  <td className="px-6 py-4">{log.vehicle}</td>
                  <td className="px-6 py-4">{log.date}</td>
                  <td className="px-6 py-4">{log.type}</td>
                  <td className="px-6 py-4 font-medium">{log.cost}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${log.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
