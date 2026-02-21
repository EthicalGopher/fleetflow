export default function ExpenseReports() {
  const expenses = [
    { id: 'E001', category: 'Fuel', amount: '$5,400', date: '2023-11-01', status: 'Approved' },
    { id: 'E002', category: 'Maintenance', amount: '$1,200', date: '2023-11-05', status: 'Pending' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Expense Reports</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{e.id}</td>
                <td className="px-6 py-4">{e.category}</td>
                <td className="px-6 py-4 font-medium">{e.amount}</td>
                <td className="px-6 py-4">{e.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${e.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {e.status}
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
