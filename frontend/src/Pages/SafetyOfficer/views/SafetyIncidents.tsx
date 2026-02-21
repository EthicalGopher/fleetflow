export default function SafetyIncidents() {
  const incidents = [
    { id: 'I001', type: 'Accident', location: 'Hwy 401', date: '2023-11-02', status: 'Under Investigation' },
    { id: 'I002', type: 'Speeding Violation', location: 'City Center', date: '2023-11-04', status: 'Resolved' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Safety Incidents</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {incidents.map((i) => (
              <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{i.id}</td>
                <td className="px-6 py-4">{i.type}</td>
                <td className="px-6 py-4">{i.location}</td>
                <td className="px-6 py-4">{i.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${i.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {i.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
