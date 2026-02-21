import React from 'react';
import { Sidebar, type ViewType } from './sidebar';
import { Header } from './Header';
import { ProfitabilityTable } from './Profitability';
import { EfficiencyChart } from './Efficient';
import { AlertsList } from './AlertList';
import { StatCard } from './statcard';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Fuel, Wrench, AlertCircle } from 'lucide-react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'overview';
  const activeView = currentPath === 'financial-analyst' ? 'overview' : (currentPath as ViewType);

  const Overview = () => (
    <div className="p-8 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Fleet Revenue"
          value="$2.4M"
          icon={DollarSign}
          trend={{ value: "+12.5%", isPositive: true }}
        />
        <StatCard
          label="Avg. Fuel Efficiency"
          value="8.4 km/L"
          icon={Fuel}
          trend={{ value: "-2.1%", isPositive: false }}
        />
        <StatCard
          label="Maintenance Costs"
          value="$142.8K"
          icon={Wrench}
          trend={{ value: "+5.4%", isPositive: false }}
          variant="warning"
        />
        <StatCard
          label="Priority Alerts"
          value="12"
          icon={AlertCircle}
          subtext="3 critical issues"
          variant="warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <EfficiencyChart />
          <ProfitabilityTable />
        </div>
        <div className="space-y-8">
          <AlertsList />
          {/* Recent Reports/Quick Actions could go here */}
          <div className="bg-primary rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-extrabold text-lg mb-2">Quarterly Review</h3>
              <p className="text-white/70 text-sm font-medium mb-6">Generate the consolidated financial report for Q1 2024.</p>
              <button className="bg-accent-gold text-primary px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-white transition-all">
                Generate Report
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 size-32 bg-white/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );

  const getHeaderInfo = () => {
    switch (activeView) {
      case 'overview': return { title: 'Fleet Analytics Dashboard', badge: 'Enterprise' };
      case 'vehicles': return { title: 'Vehicle Inventory', badge: 'Live' };
      case 'drivers': return { title: 'Driver Management', badge: 'Active' };
      case 'maintenance': return { title: 'Maintenance Hub', badge: 'Operations' };
      case 'reports': return { title: 'Fleet Reports', badge: 'Analytics' };
      case 'settings': return { title: 'System Settings', badge: 'Admin' };
      default: return { title: 'FleetPro Dashboard' };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="flex min-h-screen bg-background-light">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        <Header title={headerInfo.title} badge={headerInfo.badge} />

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="overview" element={<Navigate to="/financial-analyst" replace />} />
                <Route path="vehicles" element={<div className="p-8"><ProfitabilityTable /></div>} />
                <Route path="drivers" element={<div className="p-8"><EfficiencyChart /></div>} />
                <Route path="reports" element={<div className="p-8"><AlertsList /></div>} />
                <Route path="maintenance" element={<div className="flex items-center justify-center min-h-[400px] text-slate-400 font-bold uppercase tracking-widest">Maintenance module under development</div>} />
                <Route path="settings" element={<div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400"><h3 className="text-xl font-extrabold text-slate-800">System Settings</h3><p className="font-bold text-sm">Main settings module coming soon.</p></div>} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
