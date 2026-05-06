'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Search, 
  Settings, 
  LogOut,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Mentees', href: '/dashboard/mentees/my-mentees' },
  { icon: FileText, label: 'Applications', href: '/dashboard/mentees/applications' },
  { icon: Calendar, label: 'Calendar', href: '/dashboard/mentees/my-mentees?openCalendar=true' },
  { icon: MessageSquare, label: 'Forum', href: '/dashboard/forum' },
  { icon: Search, label: 'Search Mentees', href: '/dashboard/mentees/search' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col sticky top-0 overflow-y-auto custom-scrollbar">
      {/* Logo */}
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-uel-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-uel-blue/20 group-hover:rotate-6 transition-transform">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tighter uppercase leading-none">UEL ALUMNI</h1>
            <p className="text-[10px] font-black text-uel-orange uppercase tracking-[2px] mt-1">Mentor Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">MAIN MENU</p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative overflow-hidden",
                isActive 
                  ? "bg-uel-blue text-white shadow-lg shadow-uel-blue/15" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-uel-blue"
              )}
            >
              <item.icon size={20} className={cn("transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-uel-blue")} />
              <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-slate-100 space-y-2">
        <Link 
          href="/dashboard/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-uel-blue transition-all group"
        >
          <Settings size={20} className="text-slate-400 group-hover:text-uel-blue" />
          <span className="text-[13px] font-bold">Settings</span>
        </Link>
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all group">
          <LogOut size={20} />
          <span className="text-[13px] font-bold">Logout</span>
        </button>
      </div>
    </div>
  );
}
