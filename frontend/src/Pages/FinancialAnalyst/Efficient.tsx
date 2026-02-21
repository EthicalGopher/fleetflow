import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const data = [
    { name: 'VH-442', value: 12.5, type: 'efficient' },
    { name: 'VH-223', value: 11.2, type: 'efficient' },
    { name: 'VH-901', value: 10.8, type: 'efficient' },
    { name: 'VH-012', value: 6.4, type: 'guzzler' },
    { name: 'VH-665', value: 5.2, type: 'guzzler' },
    { name: 'VH-334', value: 4.8, type: 'guzzler' },
];

export function EfficiencyChart() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-extrabold text-slate-800">Fuel Efficiency Analysis</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">KM per Liter by Vehicle</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="size-3 bg-primary rounded-sm" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Cost Efficient</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 bg-rose-400 rounded-sm" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Gas Guzzlers</span>
                    </div>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.type === 'efficient' ? '#3b0b5b' : '#fb7185'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
