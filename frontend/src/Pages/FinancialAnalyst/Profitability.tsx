import { cn } from '../../lib/utils';

const data = [
    { id: 'VH-442-Enterprise', status: 'Profitable', revenue: 12450, fuel: 3200, maint: 850, profit: 8400 },
    { id: 'VH-223-Standard', status: 'Profitable', revenue: 10120, fuel: 2900, maint: 1200, profit: 6020 },
    { id: 'VH-901-Express', status: 'Break-even', revenue: 6200, fuel: 4100, maint: 1800, profit: 300 },
    { id: 'VH-012-Logistics', status: 'Loss-making', revenue: 4500, fuel: 5600, maint: 2400, profit: -3500 },
    { id: 'VH-665-Heavy', status: 'Loss-making', revenue: 3800, fuel: 6200, maint: 900, profit: -3300 },
];

export function ProfitabilityTable() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-800">Vehicle Profitability (ROI)</h3>
                <div className="flex gap-2">
                    {['Profitable', 'Break-even', 'Loss-making'].map((status) => (
                        <span
                            key={status}
                            className={cn(
                                "text-[10px] px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider",
                                status === 'Profitable' && "bg-emerald-100 text-emerald-700",
                                status === 'Break-even' && "bg-amber-100 text-amber-700",
                                status === 'Loss-making' && "bg-rose-100 text-rose-700"
                            )}
                        >
                            {status}
                        </span>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                        <tr>
                            <th className="px-8 py-4">Vehicle ID</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4 text-right">Revenue</th>
                            <th className="px-8 py-4 text-right">Fuel Exp.</th>
                            <th className="px-8 py-4 text-right">Maint. Exp.</th>
                            <th className="px-8 py-4 text-right">Net Profit</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-bold">
                        {data.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5 text-slate-800 group-hover:text-primary transition-colors">{row.id}</td>
                                <td className="px-8 py-5">
                                    <span className={cn(
                                        "text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest",
                                        row.status === 'Profitable' && "bg-emerald-100 text-emerald-700",
                                        row.status === 'Break-even' && "bg-amber-100 text-amber-700",
                                        row.status === 'Loss-making' && "bg-rose-100 text-rose-700"
                                    )}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right text-slate-600">${row.revenue.toLocaleString()}</td>
                                <td className="px-8 py-5 text-right text-slate-400 font-medium">${row.fuel.toLocaleString()}</td>
                                <td className="px-8 py-5 text-right text-slate-400 font-medium">${row.maint.toLocaleString()}</td>
                                <td className={cn(
                                    "px-8 py-5 text-right font-extrabold",
                                    row.profit >= 0 ? "text-emerald-600" : "text-rose-600"
                                )}>
                                    {row.profit >= 0 ? '+' : ''}{row.profit.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-slate-50/50 flex justify-center">
                <button className="text-[10px] font-extrabold text-slate-400 hover:text-primary uppercase tracking-widest transition-all">
                    Load 50 More Vehicles
                </button>
            </div>
        </div>
    );
}


