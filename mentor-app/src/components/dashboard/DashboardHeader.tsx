'use client';

import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardHeader() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-uel-blue transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search for mentees, topics, or events..."
            className="w-full bg-slate-50 border-transparent border focus:border-uel-blue/20 focus:bg-white px-12 py-3 rounded-2xl text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-black text-slate-400 bg-white">Ctrl</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-black text-slate-400 bg-white">K</kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-uel-blue hover:text-white transition-all group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-uel-orange rounded-full border-2 border-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-100 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 leading-none">Phan Tuấn Hùng</p>
            <p className="text-[10px] font-black text-uel-orange uppercase tracking-wider mt-1">Super Mentor</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-uel-blue/10 flex items-center justify-center text-uel-blue overflow-hidden border-2 border-transparent group-hover:border-uel-blue/20 transition-all">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronDown size={14} className="text-slate-400 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </div>
    </header>
  );
}
