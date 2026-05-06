'use client';

import { Navbar } from '@/components/layout/navbar';
import { getLoggedInUser } from '@/lib/mock-data';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(undefined);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    setUser(loggedInUser);

    // Public paths within dashboard
    const isPublicPath = pathname === '/dashboard' || pathname === '/dashboard/forum' || pathname.startsWith('/dashboard/forum/');

    if (!loggedInUser && !isPublicPath) {
      router.push('/login');
    }
  }, [pathname, router]);

  if (user === undefined) return <div className="min-h-screen bg-white" />; // Loader placeholder

  const isMentor = user?.roles?.includes('mentor') || false;
  const isPending = user?.applied_to_be_mentor || false;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar isMentor={isMentor} isPending={isPending} />
      <main className="pt-28 min-h-screen">
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
      
      {/* Footer UEL Style - Dark Gray */}
      <footer className="bg-[#212121] text-white py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-uel-blue rounded flex items-center justify-center text-white font-black text-2xl shadow-lg">
                U
              </div>
              <div>
                <h2 className="text-sm font-black leading-tight tracking-wider">TRƯỜNG ĐẠI HỌC</h2>
                <h2 className="text-sm font-black leading-tight text-uel-orange tracking-wider">KINH TẾ - LUẬT</h2>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Khu phố 3, Phường Linh Xuân, Thành phố Thủ Đức, Thành phố Hồ Chí Minh.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-sm font-black border-l-4 border-uel-orange pl-4 uppercase tracking-widest">LIÊN HỆ</h3>
            <div className="text-xs text-slate-400 space-y-4 font-medium">
              <p className="flex items-center gap-3">Điện thoại: <span className="text-white">(028) 3724 4555</span></p>
              <p className="flex items-center gap-3">Hotline: <span className="text-white">098 123 4567</span></p>
              <p className="flex items-center gap-3">Email: <span className="text-white font-bold">info@uel.edu.vn</span></p>
              <p className="flex items-center gap-3">Website: <span className="text-white">www.uel.edu.vn</span></p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black border-l-4 border-uel-blue pl-4 uppercase tracking-widest">KẾT NỐI</h3>
            <div className="flex gap-4">
              <SocialIcon label="f" color="hover:bg-uel-blue" />
              <SocialIcon label="y" color="hover:bg-uel-orange" />
              <SocialIcon label="in" color="hover:bg-uel-blue" />
            </div>
            <div className="pt-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Đối tác chiến lược</p>
                <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                  <span className="font-black text-sm">VNU</span>
                  <span className="font-black text-sm">TECH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[3px]">
            Copyright © 2024 UEL. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SocialIcon({ label, color }: any) {
  return (
    <div className={cn(
      "w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all cursor-pointer border border-white/10",
      color
    )}>
      <span className="font-bold text-sm">{label}</span>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
