'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: 'blue' | 'orange' | 'emerald' | 'indigo';
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-uel-blue',
    accent: 'bg-uel-blue',
    shadow: 'shadow-uel-blue/20'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-uel-orange',
    accent: 'bg-uel-orange',
    shadow: 'shadow-uel-orange/20'
  },
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    accent: 'bg-emerald-600',
    shadow: 'shadow-emerald-600/20'
  },
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    accent: 'bg-indigo-600',
    shadow: 'shadow-indigo-600/20'
  }
};

export function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  const styles = colorMap[color];

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-premium transition-all group overflow-hidden relative"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl ${styles.bg} flex items-center justify-center ${styles.icon} transition-transform group-hover:scale-110`}>
          <Icon size={28} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black tracking-wider uppercase">
            <TrendingUp size={12} />
            {trend}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">{title}</p>
      </div>

      {/* Background decoration */}
      <div className={`absolute -right-6 -bottom-6 w-32 h-32 ${styles.accent} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />
      
      <div className="absolute right-8 bottom-8 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
        <ArrowUpRight size={24} className={styles.icon} />
      </div>
    </motion.div>
  );
}
