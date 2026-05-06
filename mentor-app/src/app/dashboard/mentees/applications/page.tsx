'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MENTEES, MENTORS, CURRENT_USER, MOCK_ACTIVE_MENTEES_DATA } from '@/lib/mock-data';
import { 
  Check, 
  X, 
  FileText, 
  Download, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  Plus, 
  Minus, 
  Settings, 
  ToggleLeft, 
  ToggleRight,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  MapPin,
  GraduationCap,
  Star,
  MessageCircle,
  Info,
  Award,
  Target,
  Eye,
  FileSearch,
  ChevronRight,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ApplicationsPage() {
  const router = useRouter();
  const initialMentor = MENTORS.find(m => m.id === 'mentor-1') || MENTORS[0];
  
  const [apps, setApps] = useState(
    MENTEES.slice(2, 8).map(m => ({ ...m, appliedAt: '2024-04-20T10:00:00Z', status: 'pending' }))
  );
  
  // Mentor Capacity & Intake State
  const [capacity, setCapacity] = useState(initialMentor.capacity || 3);
  const [activeMentees, setActiveMentees] = useState(1);
  const [isIntakeOpen, setIsIntakeOpen] = useState(initialMentor.is_intake_open);
  const [showCapacityRule, setShowCapacityRule] = useState(false);
  const [showRulesTooltip, setShowRulesTooltip] = useState(false);
  const [hasLoadedConfig, setHasLoadedConfig] = useState(false);

  const [rejectingAppId, setRejectingAppId] = useState<string | null>(null);
  const [rejectMessage, setRejectMessage] = useState('');

  // Profile Modal State
  const [selectedMentee, setSelectedMentee] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Tổng quan');

  // CV Preview State
  const [previewCV, setPreviewCV] = useState<{ url: string, name: string } | null>(null);

  // Rules: Auto-close intake if capacity reached
  useEffect(() => {
    if (activeMentees >= capacity) {
      setIsIntakeOpen(false);
    }
  }, [capacity, activeMentees]);

  const handleAdjustCapacity = (delta: number) => {
    const newCapacity = capacity + delta;
    if (newCapacity < 1) return;
    if (delta < 0 && newCapacity < activeMentees) {
      setShowCapacityRule(true);
      setTimeout(() => setShowCapacityRule(false), 3000);
      return;
    }
    setCapacity(newCapacity);
  };

  const toggleIntake = () => {
    if (activeMentees >= capacity) return;
    setIsIntakeOpen(!isIntakeOpen);
  };

  const openProfile = (mentee: any) => {
    setSelectedMentee(mentee);
    setIsModalOpen(true);
    setActiveTab('Tổng quan');
  };

  const [activeMenteesData, setActiveMenteesData] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('activeMenteesData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setActiveMenteesData(data);
        setActiveMentees(data.length);
      } catch (e) {
        setActiveMenteesData(MOCK_ACTIVE_MENTEES_DATA);
        setActiveMentees(MOCK_ACTIVE_MENTEES_DATA.length);
      }
    }
    
    const savedConfig = localStorage.getItem('mentorConfig');
    if (savedConfig) {
      try {
        const { capacity: savedCapacity, isIntakeOpen: savedIntake } = JSON.parse(savedConfig);
        setCapacity(savedCapacity);
        setIsIntakeOpen(savedIntake);
      } catch (e) {
        console.error('Failed to parse mentor config', e);
      }
    }
    setHasLoadedConfig(true);
  }, []);

  useEffect(() => {
    if (hasLoadedConfig) {
      localStorage.setItem('mentorConfig', JSON.stringify({ capacity, isIntakeOpen }));
    }
  }, [capacity, isIntakeOpen, hasLoadedConfig]);

  const handleAction = (id: string, action: 'accept' | 'reject', message?: string) => {
    if (action === 'reject' && !message && rejectingAppId === null) {
      setRejectingAppId(id);
      return;
    }

    if (action === 'accept') {
      if (activeMentees >= capacity) {
        alert('Bạn đã đạt giới hạn dung lượng Mentee. Hãy tăng dung lượng trước khi chấp nhận đơn mới!');
        return;
      }
      
      const menteeToAccept = apps.find(a => a.id === id);
      if (menteeToAccept) {
        // Check if already in active list to avoid duplicates
        if (activeMenteesData.some(m => m.id === id)) {
          alert('Mentee này đã có trong danh sách quản lý!');
          setApps(prev => prev.filter(app => app.id !== id));
          return;
        }

        const newActiveMentee = {
          id: menteeToAccept.id,
          matchId: `MATCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
          progress: 0,
          sessionConfig: { total: 10, completed: 0 },
          lastSession: 'Chưa có',
          nextSession: 'Chưa có lịch hẹn',
          tasks: [],
          history: [],
          resources: []
        };
        
        const updatedActiveData = [...activeMenteesData, newActiveMentee];
        localStorage.setItem('activeMenteesData', JSON.stringify(updatedActiveData));
        setActiveMenteesData(updatedActiveData);
        setActiveMentees(updatedActiveData.length);
        
        if (confirm(`Đã chấp nhận ${menteeToAccept.full_name} vào lộ trình hỗ trợ! Bạn có muốn chuyển sang trang Quản lý Mentee ngay bây giờ không?`)) {
          router.push(`/dashboard/mentees/my-mentees?selectedId=${menteeToAccept.id}`);
        }
      }
    } else {
      alert(`Đã từ chối đơn đăng ký ${message ? 'với lý do: ' + message : ''}`);
    }

    setApps(prev => prev.filter(app => app.id !== id));
    setRejectingAppId(null);
    setRejectMessage('');
  };

  const handleDownloadCV = (url: string, filename: string) => {
    // In a real app, this would trigger a download
    alert(`Đang tải xuống: ${filename}`);
  };

  const handleSendMessage = (name: string) => alert(`Chức năng nhắn tin tới ${name} đang phát triển.`);
  const handleConnect = (name: string) => alert(`Đã gửi yêu cầu kết nối tới ${name}!`);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Đơn đăng ký Mentee</h1>
          <p className="text-slate-500 font-medium mt-2">Duyệt các yêu cầu tham gia lộ trình mentoring từ sinh viên.</p>
        </div>
      </div>

      {/* QUICK CAPACITY MANAGEMENT SECTION */}
      <div className="bg-white border-2 border-slate-100 p-8 rounded-[40px] shadow-xl shadow-slate-200/40 relative overflow-visible">
        <div className="absolute top-0 right-0 w-32 h-32 bg-uel-blue/5 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-uel-orange/10 text-uel-orange rounded-3xl flex items-center justify-center shadow-inner">
              <AlertCircle size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Dung lượng: {activeMentees}/{capacity}</h3>
                <div className="relative">
                  <button onMouseEnter={() => setShowRulesTooltip(true)} onMouseLeave={() => setShowRulesTooltip(false)} onClick={() => setShowRulesTooltip(!showRulesTooltip)} className="p-1 text-slate-300 hover:text-uel-blue transition-colors cursor-help">
                    <HelpCircle size={18} />
                  </button>
                  <AnimatePresence>
                    {showRulesTooltip && (
                      <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="absolute left-0 top-full mt-2 w-72 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl z-50 border border-white/10 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-uel-orange font-black text-[10px] uppercase tracking-[2px] mb-3">
                          <ShieldCheck size={14} /> QUY TẮC MENTORING
                        </div>
                        <ul className="space-y-2">
                          <li className="text-[10px] font-bold text-slate-300 flex gap-2"><span className="w-1 h-1 bg-uel-orange rounded-full mt-1.5 shrink-0" />Tăng số lượng nhận bất cứ lúc nào.</li>
                          <li className="text-[10px] font-bold text-slate-300 flex gap-2 leading-relaxed"><span className="w-1 h-1 bg-uel-orange rounded-full mt-1.5 shrink-0" />Giảm số lượng chỉ khi số mới ≥ số Mentee hiện có.</li>
                          <li className="text-[10px] font-bold text-slate-300 flex gap-2 leading-relaxed"><span className="w-1 h-1 bg-uel-orange rounded-full mt-1.5 shrink-0" />Tự động đóng nhận đơn khi đạt giới hạn dung lượng.</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-bold mt-1">{capacity - activeMentees > 0 ? `Bạn còn trống ${capacity - activeMentees} vị trí.` : "Dung lượng đã đạt giới hạn."}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <div className="flex items-center gap-4">
              <button onClick={() => handleAdjustCapacity(-1)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:border-uel-orange hover:text-uel-orange transition-all shadow-sm"><Minus size={18} /></button>
              <div className="flex flex-col items-center min-w-[40px]"><span className="text-xl font-black text-uel-blue">{capacity}</span><span className="text-[8px] font-black text-slate-400 uppercase">Limit</span></div>
              <button onClick={() => handleAdjustCapacity(1)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:border-uel-blue hover:text-uel-blue transition-all shadow-sm"><Plus size={18} /></button>
            </div>
            <div className="w-[1px] h-10 bg-slate-200 hidden md:block" />
            <button onClick={toggleIntake} disabled={activeMentees >= capacity} className={cn("flex items-center gap-3 px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm", activeMentees >= capacity ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" : isIntakeOpen ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 border border-emerald-400" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100")}>
              {isIntakeOpen ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}{activeMentees >= capacity ? "ĐÃ NHẬN ĐỦ" : isIntakeOpen ? "ĐANG MỞ NHẬN ĐƠN" : "ĐANG ĐÓNG NHẬN ĐƠN"}
            </button>
          </div>
        </div>
        <AnimatePresence>{showCapacityRule && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-600 text-[10px] font-black uppercase tracking-widest"><AlertTriangle size={14} /> Bạn đang hỗ trợ {activeMentees} Mentees. Không thể giảm dung lượng dưới mức thực tế!</motion.div>}</AnimatePresence>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {apps.map((app, index) => (
            <motion.div key={app.id} layout initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ delay: index * 0.1 }} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-6 group hover:border-blue-200 transition-all relative overflow-hidden">
              <img src={app.avatar_url} className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-white ring-4 ring-slate-50 cursor-pointer hover:scale-105 transition-transform" alt={app.full_name} onClick={() => openProfile(app)} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-black text-lg text-slate-900 hover:text-uel-blue cursor-pointer transition-colors" onClick={() => openProfile(app)}>{app.full_name}</h3>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider rounded-md">{app.career_track}</span>
                </div>
                <p className="text-sm font-bold text-slate-500">{app.education_level}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Clock size={12} /> Đã gửi 2 ngày trước</span>
                  
                  {/* CV ACTIONS */}
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 group/cv hover:border-uel-blue/30 transition-all">
                    <FileText size={14} className="text-uel-blue" />
                    <span className="max-w-[120px] truncate font-bold text-slate-600">{app.cv_filename || "CV_Student.pdf"}</span>
                    <div className="flex items-center gap-1 ml-2 border-l border-slate-200 pl-2">
                      <button onClick={() => setPreviewCV({ url: app.cv_url || '#', name: app.cv_filename || '' })} className="p-1 hover:text-uel-blue transition-colors" title="Xem trước">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => handleDownloadCV(app.cv_url || '#', app.cv_filename || '')} className="p-1 hover:text-uel-orange transition-colors" title="Tải xuống">
                        <Download size={14} />
                      </button>
                    </div>
                  </div>

                  <button onClick={() => openProfile(app)} className="flex items-center gap-2 px-3 py-1.5 bg-uel-orange/10 text-uel-orange rounded-full hover:bg-uel-orange hover:text-white font-black uppercase text-[9px] tracking-[1px] transition-all duration-300 ml-auto md:ml-4 group/btn shadow-sm shadow-uel-orange/5">
                    <User size={12} className="group-hover/btn:scale-110 transition-transform" /> <span>Hồ sơ</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[200px]"><div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-600 italic leading-relaxed border border-transparent group-hover:border-slate-100">"{app.goals}"</div></div>
              <div className="flex md:flex-col gap-2">
                <button onClick={() => handleAction(app.id, 'accept')} className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 font-black text-xs px-6"><Check size={16} strokeWidth={3} /> Chấp nhận</button>
                <button onClick={() => handleAction(app.id, 'reject')} className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all flex items-center justify-center gap-2 font-black text-xs px-6"><X size={16} strokeWidth={3} /> Từ chối</button>
              </div>

              {/* Rejection Overlay */}
              <AnimatePresence>
                {rejectingAppId === app.id && (
                  <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center space-y-4 z-20">
                    <div className="flex items-center gap-2 text-rose-500 font-black text-sm uppercase tracking-widest"><MessageSquare size={18} /> Lý do từ chối (Không bắt buộc)</div>
                    <textarea placeholder="Nhập lời nhắn gửi tới sinh viên..." className="w-full max-w-md p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 transition-all h-24 resize-none" value={rejectMessage} onChange={(e) => setRejectMessage(e.target.value)} />
                    <div className="flex gap-3">
                      <button onClick={() => setRejectingAppId(null)} className="px-6 py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">HỦY BỎ</button>
                      <button onClick={() => handleAction(app.id, 'reject', rejectMessage)} className="px-6 py-3 bg-rose-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 shadow-xl shadow-rose-500/20 transition-all flex items-center gap-2">XÁC NHẬN TỪ CHỐI <Send size={14} /></button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {previewCV && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setPreviewCV(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-uel-blue text-white rounded-2xl flex items-center justify-center">
                    <FileSearch size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{previewCV.name}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Xem trước hồ sơ năng lực</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleDownloadCV(previewCV.url, previewCV.name)} className="px-6 py-3 bg-uel-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2">
                    <Download size={16} /> TẢI XUỐNG
                  </button>
                  <button onClick={() => setPreviewCV(null)} className="p-3 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 overflow-y-auto p-4 md:p-8 flex justify-center">
                {/* PDF Viewer Mock */}
                <div className="w-full max-w-4xl bg-white shadow-lg min-h-[1200px] p-12 md:p-20 relative overflow-hidden rounded-xl">
                  {/* CV Header Mock */}
                  <div className="flex justify-between items-start border-b-4 border-uel-blue pb-10">
                    <div className="space-y-4">
                      <h1 className="text-6xl font-black text-slate-900 leading-none">CV PREVIEW</h1>
                      <div className="text-uel-orange font-bold text-xl uppercase tracking-[4px]">DUMMY CONTENT</div>
                    </div>
                    <div className="text-right space-y-1 text-slate-400 font-bold text-xs uppercase tracking-widest">
                      <p>Email: student@uel.edu.vn</p>
                      <p>Phone: +84 123 456 789</p>
                    </div>
                  </div>
                  
                  {/* CV Content Mock */}
                  <div className="mt-16 space-y-16">
                    <section className="space-y-6">
                      <h2 className="text-2xl font-black text-uel-blue uppercase border-l-8 border-uel-orange pl-4">Education</h2>
                      <div className="space-y-2">
                        <p className="text-lg font-black text-slate-800">University of Economics and Law (UEL)</p>
                        <p className="text-slate-500 font-bold">Bachelor of E-commerce (2021 - 2025)</p>
                      </div>
                    </section>
                    <section className="space-y-6">
                      <h2 className="text-2xl font-black text-uel-blue uppercase border-l-8 border-uel-orange pl-4">Experience</h2>
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <p className="text-lg font-black text-slate-800">Marketing Intern @ Shopee Vietnam</p>
                          <p className="text-slate-600 leading-relaxed font-medium">Support operational tasks, analyze campaign performance, and manage social media channels...</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-black text-slate-800">BA Trainee @ Tech Solutions</p>
                          <p className="text-slate-600 leading-relaxed font-medium">Gather requirements, create UML diagrams, and assist in documentation for ERP systems...</p>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMentee && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-uel-blue/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh]">
              <div className="w-full md:w-[350px] bg-slate-50 border-r border-slate-100 p-8 flex flex-col items-center text-center overflow-y-auto">
                <div className="relative mb-6">
                  <img src={selectedMentee.avatar_url} className="w-40 h-40 rounded-3xl object-cover shadow-2xl border-4 border-white" alt={selectedMentee.full_name} />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-uel-orange text-white rounded-xl flex items-center justify-center shadow-lg"><Star size={20} fill="currentColor" /></div>
                </div>
                <h2 className="text-3xl font-black text-slate-900">{selectedMentee.full_name}</h2>
                <p className="text-sm font-black text-uel-blue uppercase tracking-widest mt-2">{selectedMentee.career_track}</p>
                <div className="flex items-center gap-4 mt-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> TP. HCM</span>
                  <span className="flex items-center gap-1.5"><GraduationCap size={14} /> {selectedMentee.education_level}</span>
                </div>
                <div className="w-full mt-10 space-y-4">
                  <button onClick={() => handleSendMessage(selectedMentee.full_name)} className="w-full py-4 bg-uel-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:bg-[#0f3a69] transition-all flex items-center justify-center gap-3"><MessageCircle size={18} /> GỬI TIN NHẮN</button>
                  <button onClick={() => handleConnect(selectedMentee.full_name)} className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-uel-orange hover:text-uel-orange transition-all flex items-center justify-center gap-3"><Send size={18} /> KẾT NỐI NGAY</button>
                  <Link href={`/dashboard/mentees/profile/${selectedMentee.id}`} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3 mt-4"><ExternalLink size={18} /> XEM CHI TIẾT</Link>
                </div>
              </div>
              <div className="flex-1 bg-white p-10 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex gap-8 border-b border-slate-100">
                    <Tab active={activeTab === 'Tổng quan'} label="Tổng quan" onClick={() => setActiveTab('Tổng quan')} />
                    <Tab active={activeTab === 'Mục tiêu'} label="Mục tiêu" onClick={() => setActiveTab('Mục tiêu')} />
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-full transition-colors text-slate-400"><X size={24} /></button>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    {activeTab === 'Tổng quan' && (
                      <div className="space-y-12">
                        <section><SectionTitle icon={Info} title="Giới thiệu bản thân" /><p className="text-slate-600 leading-relaxed font-medium mt-4">Chào Mentor! Em là sinh viên khoa Thương mại điện tử với niềm đam mê lớn về phân tích dữ liệu.</p></section>
                        <section><SectionTitle icon={Award} title="Kỹ năng & Chứng chỉ" /><div className="flex flex-wrap gap-3 mt-6">{['SQL Specialist', 'Tableau Desktop'].map(s => (<span key={s} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-uel-blue">{s}</span>))}</div></section>
                      </div>
                    )}
                    {activeTab === 'Mục tiêu' && (
                      <section><SectionTitle icon={Target} title="Mục tiêu Mentorship" /><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"><GoalCard title="Định hướng nghề nghiệp" desc="Hiểu rõ lộ trình phát triển." /><GoalCard title="Kỹ năng chuyên môn" desc="Tối ưu hóa khả năng sử dụng SQL." /></div></section>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable Components
function Tab({ label, active = false, onClick }: any) { return (<button onClick={onClick} className={cn("pb-4 text-xs font-black uppercase tracking-widest transition-all", active ? "border-b-4 border-uel-orange text-uel-blue" : "text-slate-400 hover:text-slate-600")}>{label}</button>); }
function SectionTitle({ icon: Icon, title }: any) { return (<div className="flex items-center gap-3"><div className="w-10 h-10 bg-uel-blue/5 rounded-xl flex items-center justify-center text-uel-blue"><Icon size={20} /></div><h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3></div>); }
function GoalCard({ title, desc }: any) { return (<div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-uel-blue/30 transition-all group"><p className="text-xs font-black text-uel-blue uppercase mb-1">{title}</p><p className="text-xs text-slate-500 font-bold leading-relaxed">{desc}</p></div>); }
function cn(...inputs: any[]) { return inputs.filter(Boolean).join(' '); }
