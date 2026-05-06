'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  MessageSquare, 
  Search, 
  FileText, 
  Users, 
  UserPlus,
  Phone,
  Mail,
  Globe,
  LogIn,
  LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { USERS, getLoggedInUser } from '@/lib/mock-data';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  isMentor: boolean;
  isPending: boolean;
}

export function Navbar({ isMentor, isPending }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getLoggedInUser());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('logged_in_user');
    // Clear any other possible session data
    sessionStorage.clear();
    // Force a full page reload to the dashboard
    window.location.href = '/dashboard';
  };

  const isUserB = user?.id === 'user-b';

  const navItems = [
    { name: 'TRANG CHỦ', href: '/dashboard', icon: Home, visible: true },
    { name: 'DIỄN ĐÀN', href: '/dashboard/forum', icon: MessageSquare, visible: true },
    { 
      name: 'MEMBER SEARCH', 
      href: '/dashboard/mentees/search', 
      icon: Search, 
      visible: isMentor 
    },
    { 
      name: 'APPLICATIONS', 
      href: '/dashboard/mentees/applications', 
      icon: FileText, 
      visible: isMentor 
    },
    { 
      name: 'QUẢN LÝ MENTEE', 
      href: '/dashboard/mentees/my-mentees', 
      icon: Users, 
      visible: isMentor 
    },
  ];

  // Note: user is handled dynamically in the return to allow Guest mode

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Premium Utility Bar */}
      <div className="bg-uel-blue py-1.5 px-8 hidden md:flex justify-between items-center text-[9px] font-black text-white/70 tracking-widest uppercase border-b border-white/5">
        <div className="flex gap-6">
          <div className="hover:text-white transition-colors cursor-default">UEL MENTOR PORTAL</div>
          <div className="w-[1px] h-3 bg-white/10" />
          <div className="hover:text-white transition-colors cursor-default">SUPPORT: 028 3724 4555</div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"><Globe size={10} className="text-uel-orange" /> VI</div>
          <div className="w-[1px] h-3 bg-white/10" />
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-1.5 hover:text-uel-orange transition-colors">
              <LogOut size={10} /> ĐĂNG XUẤT
            </button>
          ) : (
            <Link href="/login" className="flex items-center gap-1.5 hover:text-uel-orange transition-colors">
              <LogIn size={10} /> ĐĂNG NHẬP
            </Link>
          )}
        </div>
      </div>

      {/* Main Minimalist Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="h-14 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 border-b border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-10 h-full">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <img src="https://upload.wikimedia.org/wikipedia/vi/c/c7/Logo_UEL.png" alt="UEL Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-[12px] font-black tracking-tighter text-slate-900 group-hover:text-uel-blue transition-colors">
              UEL<span className="text-uel-orange">PORTAL</span>
            </h1>
          </Link>

          <div className="hidden lg:flex items-center gap-1 h-full">
            {navItems.filter(item => item.visible).map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 h-14 flex items-center transition-all duration-300 relative text-[10px] font-black tracking-widest uppercase",
                    isActive 
                      ? "text-uel-blue bg-uel-blue/[0.03] border-b-2 border-uel-blue" 
                      : "text-slate-400 hover:text-slate-900 hover:bg-slate-50/50"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <Link 
              href="/dashboard/profile"
              className="flex items-center gap-2.5 bg-slate-50 p-1 pr-4 rounded-xl border border-slate-100 hover:border-uel-blue/30 transition-all cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-uel-blue flex items-center justify-center text-white text-[9px] font-black overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
                {user.avatar_url ? <img src={user.avatar_url} alt="User" className="w-full h-full object-cover" /> : user.full_name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] font-black text-slate-900 leading-none uppercase group-hover:text-uel-blue transition-colors">{user.full_name}</p>
                <p className="text-[7px] font-black text-uel-orange uppercase tracking-wider mt-1 opacity-70">
                  {user.roles?.includes('mentor') ? 'OFFICIAL MENTOR' : 'ALUMNUS'}
                </p>
              </div>
            </Link>
          )}

          {!user && (
            <div className="text-[9px] font-black text-slate-300 uppercase tracking-[3px] hidden lg:block">
              UNIVERSITY OF ECONOMICS AND LAW
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
