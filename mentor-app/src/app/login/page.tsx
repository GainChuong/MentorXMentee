'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { USERS } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { LogIn, User, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (user: any) => {
    localStorage.setItem('logged_in_user', JSON.stringify(user));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Branding */}
        <div className="md:w-1/2 bg-uel-blue p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-uel-blue shadow-xl mb-8">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">
              UEL MENTOR <br />
              <span className="text-uel-orange text-5xl">PORTAL</span>
            </h1>
            <p className="text-sm font-medium text-blue-100 opacity-80 max-w-xs leading-relaxed">
              Hệ thống kết nối và quản lý Mentorship dành riêng cho cộng đồng Cựu sinh viên và Sinh viên UEL.
            </p>
          </div>
          
          <div className="relative z-10 pt-12 flex flex-col gap-6">
            <p className="text-[10px] font-black uppercase tracking-[2px] text-blue-200">University of Economics and Law</p>
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Quay lại Dashboard
            </Link>
          </div>

          {/* Decorative background circles */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-uel-orange/20 rounded-full blur-3xl" />
        </div>

        {/* Right Side - Login Options */}
        <div className="md:w-1/2 p-12">
          <div className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">ĐĂNG NHẬP HỆ THỐNG</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Chọn tài khoản để bắt đầu trải nghiệm</p>
          </div>

          <div className="space-y-6">
            {USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user)}
                className="w-full group bg-slate-50 hover:bg-white p-6 rounded-3xl border-2 border-transparent hover:border-uel-blue transition-all duration-300 text-left flex items-center gap-6 shadow-sm hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                  <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-slate-900 uppercase tracking-tight">{user.full_name}</h3>
                    <LogIn size={18} className="text-slate-300 group-hover:text-uel-blue transition-colors" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider line-clamp-1">{user.role}</p>
                  <div className="flex gap-2 mt-2">
                    {user.roles.map(role => (
                      <span key={role} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[8px] font-black uppercase text-uel-blue">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest leading-loose">
              Trang web đang trong chế độ <span className="text-uel-orange">DEMO</span>. <br/>
              Dữ liệu sẽ được lưu trữ tạm thời tại trình duyệt của bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
