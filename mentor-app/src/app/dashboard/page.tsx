'use client';

import React, { useState, useEffect } from 'react';
import { CURRENT_USER, MENTORS, EVENTS, COMMUNITY_ACTIVITIES, FORUM_POSTS, getLoggedInUser, MOCK_ACTIVE_MENTEES_DATA, NETWORK_METRICS, NEWS_ITEMS, SPOTLIGHT_ALUMNI } from '@/lib/mock-data';
import { 
  Users, 
  FileText, 
  UserPlus,
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  Calendar, 
  MessageSquare, 
  Search, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Info,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  X,
  BookOpen,
  Shield,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DashboardPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [activeMenteesData, setActiveMenteesData] = useState<any[]>(MOCK_ACTIVE_MENTEES_DATA);
  const [capacity, setCapacity] = useState(10);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  useEffect(() => {
    setUser(getLoggedInUser());
    
    const savedMentees = localStorage.getItem('activeMenteesData');
    if (savedMentees) {
      try {
        setActiveMenteesData(JSON.parse(savedMentees));
      } catch (e) {
        console.error('Failed to parse mentees data', e);
      }
    }

    const savedConfig = localStorage.getItem('mentorConfig');
    if (savedConfig) {
      try {
        const { capacity: savedCapacity } = JSON.parse(savedConfig);
        setCapacity(savedCapacity);
      } catch (e) {
        console.error('Failed to parse mentor config', e);
      }
    }

    const timer = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % EVENTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const isMentor = user?.roles?.includes('mentor') || false;
  const isGuest = !user;

  return (
    <div className="space-y-12 pb-20">
      {/* Premium Hero Carousel */}
      <section className="relative -mx-6 md:-mx-10 -mt-6 md:-mt-10 h-[400px] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <img 
              src={EVENTS[currentEvent].image} 
              className="w-full h-full object-cover"
              alt={EVENTS[currentEvent].title}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-uel-blue/80 via-uel-blue/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-12 md:p-24">
              <div className="max-w-2xl space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-10 h-[2px] bg-uel-orange" />
                  <span className="text-white/80 text-[10px] font-black uppercase tracking-[3px]">FEATURED EVENT</span>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter"
                >
                  {EVENTS[currentEvent].title}
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4 pt-4"
                >
                  <Link href={EVENTS[currentEvent].link || "/dashboard/forum"} className="bg-white text-uel-blue px-10 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-uel-orange hover:text-white transition-all shadow-2xl">
                    XEM NGAY
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 left-24 flex gap-2">
          {EVENTS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentEvent(i)}
              className={cn(
                "h-1 transition-all duration-500 rounded-full",
                i === currentEvent ? "w-12 bg-white" : "w-4 bg-white/20 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </section>

      {/* Network Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { label: 'TỔNG SỐ ALUMNI', value: NETWORK_METRICS.totalAlumni, color: 'text-uel-blue' },
          { label: 'MENTORS HOẠT ĐỘNG', value: NETWORK_METRICS.activeMentors, color: 'text-uel-orange' },
          { label: 'SINH VIÊN ĐƯỢC HỖ TRỢ', value: NETWORK_METRICS.menteesSupported, color: 'text-emerald-600' },
          { label: 'CƠ HỘI NGHỀ NGHIỆP', value: NETWORK_METRICS.jobOpportunities, color: 'text-indigo-600' }
        ].map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 text-center hover:shadow-xl transition-all">
            <h3 className={cn("text-3xl md:text-4xl font-black tracking-tighter mb-2", metric.color)}>{metric.value}</h3>
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{metric.label}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      {isMentor && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <UELStatCard title="ĐANG HỖ TRỢ" value={activeMenteesData.length} icon={Users} color="border-uel-blue" href="/dashboard/mentees/my-mentees" />
          <UELStatCard title="YÊU CẦU MỚI" value={6} icon={FileText} color="border-uel-orange" href="/dashboard/mentees/applications" />
          <UELStatCard title="CÒN TRỐNG" value={Math.max(0, capacity - activeMenteesData.length)} icon={CheckCircle} color="border-uel-blue" href="/dashboard/mentees/applications" />
          <UELStatCard title="BUỔI HẸN" value="14:00" icon={Clock} color="border-uel-blue" href="/dashboard/mentees/my-mentees?openCalendar=true" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Activity Stream */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[11px] font-black text-uel-blue uppercase tracking-[2.5px] flex items-center gap-3">
                <span className="w-8 h-[2px] bg-uel-orange" />
                HOẠT ĐỘNG CỘNG ĐỒNG
              </h2>
              <Link href="/dashboard/forum" className="text-[10px] font-black text-slate-400 hover:text-uel-blue transition-colors uppercase tracking-widest">
                Xem tất cả
              </Link>
            </div>
            <div className="space-y-3">
              {COMMUNITY_ACTIVITIES.slice(0, 4).map((act) => (
                <Link 
                  key={act.id} 
                  href={act.link || "/dashboard/forum"} 
                  className="flex items-center gap-4 p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-100 shrink-0">
                    <img src={act.avatar} className="w-full h-full object-cover" alt={act.user} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 font-medium truncate">
                      <span className="font-black text-slate-900">{act.user}</span> {act.action} <span className="text-uel-blue font-bold italic">{act.target}</span>
                    </p>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{act.time}</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-uel-orange transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 border border-slate-100 rounded-3xl space-y-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="w-12 h-12 bg-uel-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-uel-blue/20">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight pt-2">DIỄN ĐÀN THẢO LUẬN</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Tham gia các chủ đề thảo luận về kỹ năng, nghề nghiệp và cơ hội việc làm cùng cộng đồng Alumni UEL.
              </p>
              <Link href="/dashboard/forum" className="inline-flex items-center gap-2 text-[10px] font-black text-uel-blue hover:text-uel-orange transition-colors uppercase tracking-widest pt-2">
                KHÁM PHÁ NGAY <ArrowUpRight size={14} />
              </Link>
            </div>
            
            {isMentor ? (
              <div className="bg-white p-8 border border-slate-100 rounded-3xl space-y-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                <div className="w-12 h-12 bg-uel-orange rounded-2xl flex items-center justify-center text-white shadow-lg shadow-uel-orange/20">
                  <Search size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight pt-2">TÌM KIẾM MENTEE</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Chủ động tìm kiếm và kết nối với các sinh viên tiềm năng đang cần sự hướng dẫn từ kinh nghiệm của bạn.
                </p>
                <Link href="/dashboard/mentees/search" className="inline-flex items-center gap-2 text-[10px] font-black text-uel-orange hover:text-uel-blue transition-colors uppercase tracking-widest pt-2">
                  TÌM KIẾM NGAY <ArrowUpRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="bg-slate-900 p-8 rounded-3xl space-y-4 shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-uel-orange mb-4">
                    <UserPlus size={24} />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">TRỞ THÀNH MENTOR</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium mb-4">
                    Chia sẻ giá trị và dẫn dắt đàn em. Hãy đăng ký để trở thành Mentor chính thức.
                  </p>
                  <Link href="/dashboard/apply" className="inline-flex items-center gap-2 text-[10px] font-black text-uel-orange hover:text-white transition-colors uppercase tracking-widest">
                    ĐĂNG KÝ NGAY <ArrowUpRight size={14} />
                  </Link>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-uel-orange/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-white p-8 border border-slate-100 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={14} className="text-uel-blue" />
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">THÔNG TIN SEASON</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-black text-slate-900">
                <span>SPRING 2026</span>
                <span className="text-[9px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded uppercase tracking-wider">Đang mở</span>
              </div>
              <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-uel-blue rounded-full shadow-sm" />
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <span>01/01</span>
                <span>30/06</span>
              </div>
            </div>
          </div>

          <div className="bg-uel-blue p-8 rounded-xl text-white space-y-4 relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <h3 className="text-lg font-black uppercase tracking-tight">HỖ TRỢ TRỰC TUYẾN</h3>
              <p className="text-xs text-blue-100 opacity-80 leading-relaxed font-medium">
                Nếu bạn gặp khó khăn trong quá trình sử dụng hệ thống, vui lòng liên hệ Ban điều hành.
              </p>
              <button 
                onClick={() => setShowContactModal(true)}
                className="mt-4 px-6 py-2.5 bg-uel-orange text-white rounded-sm text-[11px] font-black uppercase tracking-widest hover:brightness-110 transition-all inline-block"
              >
                LIÊN HỆ NGAY
              </button>
            </div>
            <Info className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10" />
          </div>

          <div className="bg-white p-8 border border-slate-100 rounded-xl shadow-sm">
            <h3 className="text-sm font-black text-uel-blue border-b-2 border-slate-50 pb-4 mb-6 uppercase tracking-widest">TÀI LIỆU HƯỚNG DẪN</h3>
            <div className="space-y-4">
              <GuideLink label="Quy trình dành cho Mentor" onClick={() => setSelectedGuide('guide-mentor')} />
              <GuideLink label="Hướng dẫn sử dụng Portal" onClick={() => setSelectedGuide('guide-portal')} />
              <GuideLink label="Bộ quy tắc ứng xử Alumni" onClick={() => setSelectedGuide('guide-conduct')} />
            </div>
          </div>
        </div>
      </div>

      {/* News & Events */}
      <section className="space-y-8 pt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
            <span className="w-12 h-2 bg-uel-blue" />
            TIN TỨC & SỰ KIỆN NỔI BẬT
          </h2>
          <Link href="#" className="text-xs font-black text-slate-400 hover:text-uel-orange uppercase tracking-widest flex items-center gap-2">
            Xem tất cả <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.map(news => (
            <Link key={news.id} href="#" className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-uel-blue text-[9px] font-black uppercase tracking-widest rounded-lg">
                  {news.category}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar size={12} /> {news.date}
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-uel-blue transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 line-clamp-2">
                  {news.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Alumni Spotlight */}
      <section className="space-y-8 pt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
            <span className="w-12 h-2 bg-uel-orange" />
            CỰU SINH VIÊN TIÊU BIỂU
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPOTLIGHT_ALUMNI.map(alumni => (
            <div key={alumni.id} className="bg-slate-900 rounded-[32px] p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <Quote size={40} className="text-uel-orange/20 mb-6" />
                  <p className="text-white/90 font-medium leading-relaxed italic mb-8">
                    {alumni.quote}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={alumni.avatar} alt={alumni.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10" />
                  <div>
                    <h4 className="text-white font-black">{alumni.name}</h4>
                    <p className="text-uel-orange text-[10px] font-black uppercase tracking-widest">{alumni.batch}</p>
                    <p className="text-white/50 text-[10px] font-medium">{alumni.role}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-uel-blue/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-uel-orange/20 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Giving & Career Banner */}
      <section className="pt-10">
        <div className="bg-gradient-to-r from-uel-blue to-slate-900 rounded-[40px] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
          <div className="relative z-10 max-w-2xl space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              CHUNG TAY XÂY DỰNG <br/><span className="text-uel-orange">TƯƠNG LAI UEL</span>
            </h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed">
              Cùng UEL Alumni tạo ra những giá trị tích cực thông qua Quỹ học bổng và chia sẻ Cơ hội nghề nghiệp cho thế hệ sinh viên tiếp nối.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="px-10 py-5 bg-uel-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-orange/20 hover:scale-105 transition-transform">
              ĐÓNG GÓP QUỸ (GIVING)
            </button>
            <button className="px-10 py-5 bg-white text-uel-blue rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
              ĐĂNG TUYỂN DỤNG
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 bg-uel-blue text-white relative">
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-black uppercase tracking-tight">Hỗ trợ trực tuyến</h3>
                <p className="text-blue-100 text-sm mt-2 font-medium">Ban điều hành Alumni UEL luôn sẵn sàng hỗ trợ bạn.</p>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-uel-blue group-hover:bg-uel-blue group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email hỗ trợ</p>
                    <p className="font-bold text-slate-900">alumni.support@uel.edu.vn</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-uel-orange group-hover:bg-uel-orange group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hotline kỹ thuật</p>
                    <p className="font-bold text-slate-900">028.3724.4555 (Ext: 612)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Văn phòng</p>
                    <p className="font-bold text-slate-900">Phòng A.001, ĐH Kinh tế - Luật</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowContactModal(false)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:brightness-110 transition-all"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Guide Modal */}
      <AnimatePresence>
        {selectedGuide && (() => {
          const guide = FORUM_POSTS.find(p => p.id === selectedGuide);
          if (!guide) return null;
          
          let guideImage = "";
          if (selectedGuide === 'guide-mentor') guideImage = "mentorship_process_graph_1777428699154.png";
          else if (selectedGuide === 'guide-portal') guideImage = "portal_guide_ui_1777428717081.png";
          else if (selectedGuide === 'guide-conduct') guideImage = "code_of_conduct_illustration_1777428737873.png";

          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGuide(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-uel-blue/10 flex items-center justify-center text-uel-blue">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">{guide.title}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tài liệu hướng dẫn chuyên sâu</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedGuide(null)}
                    className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-slate-50/30">
                  <div className="max-w-3xl mx-auto space-y-10">
                    {/* Hero Image / Graph */}
                    {guideImage && (
                      <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-white">
                        <img 
                          src={`/${guideImage}`} 
                          className="w-full h-auto object-cover" 
                          alt={guide.title} 
                          onError={(e: any) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-slate max-w-none">
                      <div 
                        className="text-slate-600 leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ 
                          __html: guide.content
                            .replace(/\n### (.*)/g, '<h3 class="text-xl font-black text-slate-900 mt-8 mb-4 uppercase tracking-tight">$1</h3>')
                            .replace(/\n\* (.*)/g, '<li class="flex items-start gap-3 mb-2"><span class="w-1.5 h-1.5 rounded-full bg-uel-orange mt-2 shrink-0"></span> <span class="text-slate-600 font-medium">$1</span></li>')
                            .replace(/\n# (.*)/g, '<h1 class="text-4xl font-black text-uel-blue mb-8 uppercase tracking-tighter">$1</h1>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
                            .replace(/\n\n/g, '<div class="h-4"></div>')
                            .split('\n').join('<br/>')
                        }} 
                      />
                    </div>

                    {/* Footer inside content */}
                    <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <Shield size={20} />
                        </div>
                        <p className="text-sm font-bold text-slate-500">Tài liệu đã được phê duyệt bởi Ban điều hành.</p>
                      </div>
                      <button 
                        onClick={() => setSelectedGuide(null)}
                        className="px-8 py-3 bg-uel-blue text-white rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-uel-blue/20"
                      >
                        Đã hiểu
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

// Components
function UELStatCard({ title, value, icon: Icon, color, href = "#" }: any) {
  return (
    <Link href={href} className={`bg-white p-8 border-b-4 ${color} shadow-sm rounded-lg hover:shadow-xl transition-all group block`}>
      <div className="flex justify-between items-start mb-4">
        <div className="text-slate-300 group-hover:text-uel-blue transition-colors">
          <Icon size={28} />
        </div>
        <ArrowUpRight size={16} className="text-slate-200 group-hover:text-uel-orange" />
      </div>
      <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mt-2">{title}</p>
    </Link>
  );
}

function GuideLink({ label, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between group cursor-pointer text-left">
      <span className="text-xs font-bold text-slate-600 group-hover:text-uel-blue transition-colors">{label}</span>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-uel-orange" />
    </button>
  );
}
