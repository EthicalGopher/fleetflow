import type { View } from '../types';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { Trash2 } from 'lucide-react';

interface MaintenanceLogProps {
  setCurrentView: (view: View) => void;
  onEdit: (log: any) => void;
}

export default function MaintenanceLog({ setCurrentView, onEdit }: MaintenanceLogProps) {
  const [logs, setLogs] = useState<any[]>([]);

  const fetchLogs = () => {
    api.get('/maintenance').then(data => {
        if (Array.isArray(data)) {
            setLogs(data);
        }
    });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm(`Are you sure you want to delete maintenance record #${id}?`)) {
        const response = await api.delete(`/maintenance/${id}`);
        if (response && !response.error) {
            fetchLogs();
        } else {
            alert(response.error || 'Failed to delete maintenance log');
        }
    }
  };

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
                <th className="px-6 py-4 text-right">Actions</th>
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                        <button 
                            onClick={() => onEdit(log)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(log.id)}
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
      </div>
    </div>
  );
}
