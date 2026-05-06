'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Video, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SchedulePage() {
  const appointments = [
    { id: 1, title: 'Review Portfolio', mentee: 'Nguyễn Văn B', time: '14:00 - 15:00', date: 'Hôm nay', type: 'Online' },
    { id: 2, title: 'Career Guidance', mentee: 'Lê Thị C', time: '09:00 - 10:00', date: 'Ngày mai', type: 'Offline' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Lịch hẹn Mentoring</h1>
          <p className="text-slate-500 font-medium mt-2">Quản lý thời gian và các buổi hướng dẫn trực tiếp.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
          <Plus size={20} strokeWidth={3} /> Đặt lịch mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black">Tháng 4, 2026</h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft size={20} /></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={20} /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`
                    aspect-square flex items-center justify-center rounded-2xl text-sm font-bold transition-all cursor-pointer
                    ${i + 1 === 26 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-slate-50 text-slate-700'}
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-900">Sắp diễn ra</h2>
          <div className="space-y-4">
            {appointments.map((apt) => (
              <motion.div 
                key={apt.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {apt.date}
                  </span>
                  <div className="text-slate-400">
                    {apt.type === 'Online' ? <Video size={18} /> : <MapPin size={18} />}
                  </div>
                </div>
                <h3 className="font-black text-slate-900 text-lg mb-1">{apt.title}</h3>
                <p className="text-sm font-bold text-slate-500 mb-4">{apt.mentee}</p>
                <div className="flex items-center gap-2 text-xs font-black text-slate-400">
                  <Clock size={14} /> {apt.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
