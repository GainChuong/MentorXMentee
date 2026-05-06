'use client';

import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  ArrowUpRight,
  MoreVertical,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const RECENT_MENTEES = [
  { id: 1, name: 'Nguyễn Văn A', major: 'Kinh tế đối ngoại', status: 'Active', progress: 75, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A' },
  { id: 2, name: 'Trần Thị B', major: 'Luật kinh doanh', status: 'Pending', progress: 30, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B' },
  { id: 3, name: 'Lê Văn C', major: 'Hệ thống thông tin', status: 'Active', progress: 90, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C' },
  { id: 4, name: 'Phạm Thị D', major: 'Quản trị kinh doanh', status: 'Completed', progress: 100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=D' },
];

export default function RebuildDashboard() {
  return (
    <div className="flex h-screen bg-uel-bg overflow-hidden font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Welcome Section */}
            <header className="flex items-center justify-between">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl font-black text-slate-900 tracking-tighter uppercase"
                >
                  Welcome back, <span className="text-uel-blue">Hùng!</span>
                </motion.h2>
                <p className="text-slate-500 font-medium mt-1">Here is what happened with your mentees today.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                  View Report
                </button>
                <button className="px-6 py-3 bg-uel-blue text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-uel-blue/20">
                  New Application
                </button>
              </div>
            </header>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Active Mentees" value={12} icon={Users} color="blue" trend="+2.5%" />
              <StatCard title="New Requests" value={5} icon={FileText} color="orange" />
              <StatCard title="Completed" value={48} icon={CheckCircle} color="emerald" trend="+12" />
              <StatCard title="Avg. Progress" value="82%" icon={Star} color="indigo" />
            </section>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column - Mentees */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Recent Mentees</h3>
                    <button className="text-xs font-black text-uel-blue hover:text-uel-orange transition-colors uppercase tracking-widest flex items-center gap-2">
                      View All <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {RECENT_MENTEES.map((mentee) => (
                      <div key={mentee.id} className="p-6 flex items-center gap-6 hover:bg-slate-50/50 transition-colors group">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-uel-blue/20 transition-all">
                          <img src={mentee.avatar} alt={mentee.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-slate-900 truncate">{mentee.name}</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{mentee.major}</p>
                        </div>
                        <div className="hidden md:block w-48">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                            <span className="text-[10px] font-black text-slate-900">{mentee.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-uel-blue rounded-full" style={{ width: `${mentee.progress}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                            mentee.status === 'Active' ? "bg-emerald-50 text-emerald-600" : 
                            mentee.status === 'Pending' ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-uel-blue"
                          )}>
                            {mentee.status}
                          </span>
                          <button className="p-2 hover:bg-white rounded-xl transition-all">
                            <MoreVertical size={18} className="text-slate-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promotional Banner */}
                <div className="bg-uel-orange-deep rounded-[40px] p-10 text-white relative overflow-hidden shadow-xl">
                  <div className="relative z-10 space-y-4 max-w-lg">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight">Elevate your mentoring skills</h3>
                    <p className="text-orange-50 font-medium opacity-90">Join our exclusive workshop for Super Mentors this Saturday. Learn advanced leadership patterns.</p>
                    <button className="px-8 py-3 bg-white text-uel-orange-deep rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-50 transition-all">
                      Register Now
                    </button>
                  </div>
                  <ArrowUpRight className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 rotate-12" />
                </div>
              </div>

              {/* Right Column - Sidebar Widgets */}
              <div className="space-y-8">
                {/* Upcoming Session */}
                <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-uel-orange">
                        <Clock size={24} />
                      </div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-[2px]">Next Session</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black tracking-tight">Mentorship Sync</h4>
                      <p className="text-white/60 font-medium mt-1">with Nguyễn Văn A</p>
                    </div>
                    <div className="pt-4 flex items-center justify-between border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-uel-orange rounded-full animate-pulse" />
                        <span className="text-xs font-bold">14:00 - 15:00 PM</span>
                      </div>
                      <button className="text-[10px] font-black text-uel-orange hover:text-white transition-colors uppercase tracking-widest">
                        Join Call
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notifications/Tasks */}
                <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-6">Action Required</h3>
                  <div className="space-y-6">
                    {[
                      { title: 'Approve application', user: 'Lê Hoàng Minh', time: '2h ago' },
                      { title: 'Update progress report', user: 'Trần Thị B', time: '5h ago' },
                      { title: 'Schedule follow-up', user: 'Phạm Thị D', time: 'Yesterday' },
                    ].map((task, i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                        <div className="w-1 h-12 bg-uel-blue/10 rounded-full overflow-hidden shrink-0 group-hover:bg-uel-orange transition-colors" />
                        <div>
                          <h5 className="text-[13px] font-black text-slate-900 group-hover:text-uel-blue transition-colors">{task.title}</h5>
                          <p className="text-[11px] font-medium text-slate-500">{task.user} • {task.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
