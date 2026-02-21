import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { Send, CheckCircle2 } from 'lucide-react';

export default function DriverAssignment() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [assignment, setAssignment] = useState({
    shipment_id: '',
    driver_id: '',
    vehicle_id: '',
    task_message: '',
    eta: '',
    status: 'In Transit'
  });

  useEffect(() => {
    // Fetch unassigned or pending shipments
    api.get('/shipments').then(data => {
        if (Array.isArray(data)) {
            setShipments(data.filter(s => s.status === 'Pending'));
        }
    });
    // Fetch active drivers
    api.get('/drivers').then(data => {
        if (Array.isArray(data)) {
            setDrivers(data.filter(d => d.status === 'Active'));
        }
    });
    // Fetch active vehicles
    api.get('/vehicles').then(data => {
        if (Array.isArray(data)) {
            setVehicles(data.filter(v => v.status === 'Active'));
        }
    });
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignment.shipment_id || !assignment.driver_id || !assignment.vehicle_id) {
        alert("Please select all required fields");
        return;
    }
    
    setLoading(true);
    const response = await api.put(`/shipments/${assignment.shipment_id}`, {
        driver_id: assignment.driver_id,
        vehicle_id: assignment.vehicle_id,
        task_message: assignment.task_message,
        eta: assignment.eta,
        status: 'In Transit'
    });

    if (response && !response.error) {
        alert("Assignment successful! Task message sent to driver.");
        setAssignment({
            shipment_id: '',
            driver_id: '',
            vehicle_id: '',
            task_message: '',
            eta: '',
            status: 'In Transit'
        });
        // Refresh shipments
        api.get('/shipments').then(data => {
            if (Array.isArray(data)) {
                setShipments(data.filter(s => s.status === 'Pending'));
            }
        });
    } else {
        alert(response.error || "Failed to assign driver");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Driver Assignment</h2>
        <p className="text-slate-500 mt-1">Dispatch vehicles and notify drivers of new tasks</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleAssign} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Select Shipment</label>
                        <select 
                            required
                            value={assignment.shipment_id}
                            onChange={e => setAssignment({...assignment, shipment_id: e.target.value})}
                            className="w-full border rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                            <option value="">Choose a pending shipment...</option>
                            {shipments.map(s => (
                                <option key={s.id} value={s.id}>{s.id}: {s.origin} → {s.destination}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Assign Driver</label>
                        <select 
                            required
                            value={assignment.driver_id}
                            onChange={e => setAssignment({...assignment, driver_id: e.target.value})}
                            className="w-full border rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                            <option value="">Choose an active driver...</option>
                            {drivers.map(d => (
                                <option key={d.id} value={d.id}>{d.name} ({d.id})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Assign Vehicle</label>
                        <select 
                            required
                            value={assignment.vehicle_id}
                            onChange={e => setAssignment({...assignment, vehicle_id: e.target.value})}
                            className="w-full border rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                            <option value="">Choose an available vehicle...</option>
                            {vehicles.map(v => (
                                <option key={v.id} value={v.id}>{v.make} {v.model} ({v.id})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Set ETA</label>
                        <input 
                            type="text"
                            required
                            placeholder="e.g. 2 hrs, 3:00 PM"
                            value={assignment.eta}
                            onChange={e => setAssignment({...assignment, eta: e.target.value})}
                            className="w-full border rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Task Message</label>
                        <textarea 
                            rows={8}
                            value={assignment.task_message}
                            onChange={e => setAssignment({...assignment, task_message: e.target.value})}
                            placeholder="Type instructions for the driver here..."
                            className="w-full border rounded-xl p-4 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : (
                        <>
                            <Send size={18} />
                            Dispatch & Notify Driver
                        </>
                    )}
                </button>
            </div>
        </form>
      </div>

      {shipments.length === 0 && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <CheckCircle2 size={20} />
            <p className="text-sm font-medium">All shipments have been successfully assigned and dispatched!</p>
        </div>
      )}
    </div>
  );
}
