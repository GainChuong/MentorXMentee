'use client';

import React from 'react';
import { MENTEES } from '@/lib/mock-data';
import { Calendar, MessageSquare, BarChart, ChevronRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MyMenteesPage() {
  const activeMentees = MENTEES.slice(0, 1); // Mock 1 active mentee

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Mentee của tôi</h1>
        <p className="text-slate-500 font-medium mt-2">Theo dõi tiến độ và quản lý lộ trình học tập của các Mentee đang hoạt động.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeMentees.map((mentee) => (
          <motion.div 
            key={mentee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
          >
            <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative">
              <div className="flex items-center gap-6 relative z-10">
                <img 
                  src={mentee.avatar_url} 
                  className="w-20 h-20 rounded-2xl border-4 border-white/20 shadow-xl"
                  alt={mentee.full_name}
                />
                <div>
                  <h2 className="text-2xl font-black">{mentee.full_name}</h2>
                  <p className="text-blue-100 font-bold opacity-90">{mentee.career_track}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                      Season: Spring 2024
                    </span>
                    <span className="px-2 py-1 bg-emerald-400 text-emerald-950 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      Đang hoạt động
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <User size={120} />
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Tiến độ lộ trình</h3>
                  <span className="text-sm font-black text-blue-600">65%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-blue-600 rounded-full shadow-lg shadow-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MenteeAction icon={Calendar} label="Đặt lịch hẹn" color="text-blue-600" />
                <MenteeAction icon={MessageSquare} label="Nhắn tin" color="text-indigo-600" />
                <MenteeAction icon={BarChart} label="Xem báo cáo" color="text-emerald-600" />
                <MenteeAction icon={ChevronRight} label="Xem chi tiết" color="text-slate-600" />
              </div>
            </div>
          </motion.div>
        ))}

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-300 shadow-sm">
            <User size={32} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Thêm Mentee mới</h3>
            <p className="text-sm text-slate-500 max-w-[200px] mt-1 mx-auto">Bạn vẫn còn 2 vị trí trống trong season này.</p>
          </div>
          <button className="bg-white border border-slate-200 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-white hover:border-blue-500 hover:text-blue-600 transition-all">
            Tìm kiếm ngay
          </button>
        </div>
      </div>
    </div>
  );
}

function MenteeAction({ icon: Icon, label, color }: any) {
  return (
    <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-slate-100 transition-all group">
      <div className={`${color} mb-3 transition-transform group-hover:scale-110`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <span className="text-xs font-black text-slate-700">{label}</span>
    </button>
  );
}
