export default function ActiveShipments() {
  const shipments = [
    { id: 'S001', origin: 'New York', destination: 'Boston', status: 'In Transit', eta: '2 hrs' },
    { id: 'S002', origin: 'Chicago', destination: 'Detroit', status: 'Pending', eta: 'N/A' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Shipments</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Origin</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{s.id}</td>
                <td className="px-6 py-4">{s.origin}</td>
                <td className="px-6 py-4">{s.destination}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${s.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4">{s.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
