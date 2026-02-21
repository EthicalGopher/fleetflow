import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ExpenseReports from './views/ExpenseReports';
import BudgetOverview from './views/BudgetOverview';
import type { View } from './types';

export default function FinancialAnalystDashboard() {
  const [currentView, setCurrentView] = useState<View>('expenses');

  const getTitle = () => {
    switch (currentView) {
      case 'expenses': return 'Expense Reports';
      case 'budget': return 'Budget Overview';
      default: return 'Analyst Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 ml-64 flex flex-col min-w-0 h-full">
        <Header title={getTitle()} />
        <div className="flex-1 overflow-auto bg-slate-50 p-6">
          {currentView === 'expenses' && <ExpenseReports />}
          {currentView === 'budget' && <BudgetOverview />}
        </div>
      </main>
    </div>
  );
}
