import { BarChart2, FileText, Download, TrendingUp } from 'lucide-react';

export default function Reports() {
  const reportCards = [
    { title: 'Fleet Performance', description: 'Monthly analysis of vehicle utilization and efficiency.', icon: TrendingUp, lastGenerated: '2 days ago' },
    { title: 'Maintenance Summary', description: 'Comprehensive log of all services and associated costs.', icon: FileText, lastGenerated: '1 week ago' },
    { title: 'Driver Safety Report', description: 'Detailed metrics on driver performance and safety alerts.', icon: BarChart2, lastGenerated: 'Today' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800">Fleet Reports</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Generate and download fleet data insights</p>
        </div>
        <button className="bg-primary-orange text-white px-6 py-3 rounded-xl font-extrabold flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-primary-orange/20">
          <Download size={18} />
          Export All Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reportCards.map((card, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-primary-orange/30 transition-all group">
            <div className="bg-slate-50 p-4 rounded-2xl w-fit mb-6 group-hover:bg-primary-orange/10 group-hover:text-primary-orange transition-colors">
              <card.icon size={32} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 mb-2">{card.title}</h3>
            <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
              {card.description}
            </p>
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400">Last generated: {card.lastGenerated}</span>
              <button className="text-sm font-extrabold text-primary-orange hover:text-orange-600 transition-colors">
                Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
