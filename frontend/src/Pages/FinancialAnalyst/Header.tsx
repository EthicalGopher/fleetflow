import React from 'react';
import { Search, Bell, Download, ChevronDown } from 'lucide-react';

interface HeaderProps {
    title: string;
    badge?: string;
}

export function Header({ title, badge }: HeaderProps) {
    return (
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-extrabold text-slate-800">{title}</h2>
                {badge && (
                    <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider">
                        {badge}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                    <input
                        type="text"
                        placeholder="Search fleet data..."
                        className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                        <Download className="size-4" />
                        <span>Download Report</span>
                        <ChevronDown className="size-4 opacity-50" />
                    </button>

                    <div className="h-8 w-px bg-slate-200 mx-1" />

                    <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
                        <Bell className="size-5" />
                        <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border-2 border-white" />
                    </button>

                    <div className="flex items-center gap-3 pl-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800">Alex Rivera</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Fleet Admin</p>
                        </div>
                        <div className="size-10 rounded-full bg-accent-gold flex items-center justify-center text-primary font-bold shadow-sm border-2 border-white">
                            JD
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
