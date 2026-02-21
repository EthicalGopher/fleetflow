import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { Plus, Trash2, Edit3, X, Save } from 'lucide-react';

export default function ActiveShipments() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newShipment, setNewShipment] = useState({
    id: '',
    origin: '',
    destination: '',
    status: 'Pending',
    eta: 'N/A'
  });
  const [editData, setEditData] = useState<any>(null);

  const fetchShipments = () => {
    api.get('/shipments').then(data => {
        if (Array.isArray(data)) {
            setShipments(data);
        }
    });
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.post('/shipments', newShipment);
    if (response && !response.error) {
        setShowAddForm(false);
        setNewShipment({ id: '', origin: '', destination: '', status: 'Pending', eta: 'N/A' });
        fetchShipments();
    } else {
        alert(response.error || "Failed to create shipment");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(`Delete shipment ${id}?`)) {
        const response = await api.delete(`/shipments/${id}`);
        if (response && !response.error) {
            fetchShipments();
        } else {
            alert(response.error || "Failed to delete");
        }
    }
  };

  const startEdit = (s: any) => {
    setEditingId(s.id);
    setEditData({ ...s });
  };

  const handleUpdate = async () => {
    const response = await api.put(`/shipments/${editingId}`, editData);
    if (response && !response.error) {
        setEditingId(null);
        fetchShipments();
    } else {
        alert(response.error || "Failed to update");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Active Shipments</h2>
        <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
            <Plus size={18} />
            New Shipment
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Shipment ID</label>
                    <input 
                        required
                        value={newShipment.id}
                        onChange={e => setNewShipment({...newShipment, id: e.target.value})}
                        className="w-full border rounded-lg p-2 text-sm" 
                        placeholder="S001" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Origin</label>
                    <input 
                        required
                        value={newShipment.origin}
                        onChange={e => setNewShipment({...newShipment, origin: e.target.value})}
                        className="w-full border rounded-lg p-2 text-sm" 
                        placeholder="Chicago" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Destination</label>
                    <input 
                        required
                        value={newShipment.destination}
                        onChange={e => setNewShipment({...newShipment, destination: e.target.value})}
                        className="w-full border rounded-lg p-2 text-sm" 
                        placeholder="Detroit" 
                    />
                </div>
                <div className="md:col-start-3 flex gap-2">
                    <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium">Cancel</button>
                    <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Create</button>
                </div>
            </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Origin</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Driver / Vehicle</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">ETA</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{s.id}</td>
                <td className="px-6 py-4">
                    {editingId === s.id ? (
                        <input value={editData.origin} onChange={e => setEditData({...editData, origin: e.target.value})} className="border rounded p-1 w-full" />
                    ) : s.origin}
                </td>
                <td className="px-6 py-4">
                    {editingId === s.id ? (
                        <input value={editData.destination} onChange={e => setEditData({...editData, destination: e.target.value})} className="border rounded p-1 w-full" />
                    ) : s.destination}
                </td>
                <td className="px-6 py-4 text-xs">
                    {s.driver_name ? (
                        <div>
                            <p className="font-bold text-slate-800">{s.driver_name}</p>
                            <p className="text-blue-600 font-medium">{s.driver_phone}</p>
                            <p className="text-slate-400 mt-1">{s.vehicle_name}</p>
                        </div>
                    ) : (
                        <span className="text-slate-400 italic">Unassigned</span>
                    )}
                </td>
                <td className="px-6 py-4">
                    {editingId === s.id ? (
                        <select value={editData.status} onChange={e => setEditData({...editData, status: e.target.value})} className="border rounded p-1">
                            <option value="Pending">Pending</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Completed">Completed</option>
                        </select>
                    ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${s.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                            s.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {s.status}
                        </span>
                    )}
                </td>
                <td className="px-6 py-4">
                    {editingId === s.id ? (
                        <input value={editData.eta} onChange={e => setEditData({...editData, eta: e.target.value})} className="border rounded p-1 w-full" />
                    ) : s.eta}
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        {editingId === s.id ? (
                            <>
                                <button onClick={handleUpdate} className="text-emerald-600 hover:text-emerald-800"><Save size={18}/></button>
                                <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-600"><X size={18}/></button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => startEdit(s)} className="text-blue-600 hover:text-blue-800"><Edit3 size={18}/></button>
                                <button onClick={() => handleDelete(s.id)} className="text-rose-600 hover:text-rose-800"><Trash2 size={18}/></button>
                            </>
                        )}
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shipments.length === 0 && (
            <div className="p-12 text-center text-slate-500 italic">
                No active shipments found.
            </div>
        )}
      </div>
    </div>
  );
}
