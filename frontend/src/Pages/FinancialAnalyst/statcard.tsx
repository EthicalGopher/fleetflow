import React from 'react';
import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    subtext?: string;
    variant?: 'default' | 'warning';
}

export function StatCard({ label, value, icon: Icon, trend, subtext, variant = 'default' }: StatCardProps) {
    return (
        <div className={cn(
            "bg-white p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md",
            variant === 'warning' ? "border-amber-200 bg-amber-50/30" : "border-slate-200"
        )}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">{label}</span>
                <div className={cn(
                    "p-2 rounded-lg",
                    variant === 'warning' ? "bg-amber-100 text-amber-600" : "bg-primary/10 text-primary"
                )}>
                    <Icon className="size-5" />
                </div>
            </div>

            <div className="flex flex-col">
                <span className={cn(
                    "text-3xl font-extrabold tracking-tight",
                    variant === 'warning' ? "text-amber-600" : "text-slate-900"
                )}>
                    {value}
                </span>

                {trend && (
                    <div className={cn(
                        "flex items-center gap-1 mt-2 text-[11px] font-bold",
                        trend.isPositive ? "text-emerald-600" : "text-rose-600"
                    )}>
                        {trend.isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                        <span>{trend.value}</span>
                    </div>
                )}

                {subtext && (
                    <span className="text-slate-400 text-[11px] font-semibold mt-2 italic">
                        {subtext}
                    </span>
                )}
            </div>
        </div>
    );
}
