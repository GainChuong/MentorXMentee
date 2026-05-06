'use client';

import React, { useState, useEffect } from 'react';
import { MENTEES, CAREER_TRACKS, EDUCATION_LEVELS, CURRENT_USER, MENTORS, getLoggedInUser } from '@/lib/mock-data';
import { Search, ChevronDown, UserPlus, Heart, MapPin, Target, GraduationCap, User, Send, X, Calendar, Award, Briefcase, Info, MessageCircle, Star, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function MenteeSearchPage() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('Tất cả nhóm nghề');
  const [selectedLevel, setSelectedLevel] = useState('Tất cả trình độ');
  const [selectedMentee, setSelectedMentee] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedMentees, setLikedMentees] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('Tổng quan');

  useEffect(() => {
    setUser(getLoggedInUser());
  }, []);

  // Logic for empty slots
  const currentMentor = MENTORS.find(m => m.id === (user?.id || 'user-a')) || MENTORS[0];
  const remainingSlots = (currentMentor.capacity || 0) - (currentMentor.active_mentees || 0);

  const filteredMentees = MENTEES.filter(mentee => {
    const matchesSearch = mentee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentee.goals.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrack = selectedTrack === 'Tất cả nhóm nghề' || mentee.career_track === selectedTrack;
    const matchesLevel = selectedLevel === 'Tất cả trình độ' || mentee.education_level === selectedLevel;
    return matchesSearch && matchesTrack && matchesLevel;
  });

  const openProfile = (mentee: any) => {
    setSelectedMentee(mentee);
    setIsModalOpen(true);
    setActiveTab('Tổng quan');
  };

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMentees(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleConnect = (menteeName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    alert(`Đã gửi yêu cầu kết nối tới ${menteeName}!`);
  };

  const handleSendMessage = (menteeName: string) => {
    alert(`Chức năng nhắn tin tới ${menteeName} đang được phát triển.`);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Mentoree Style Search & Filter Bar */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input 
              type="text" 
              placeholder="Search Mentee by name, goals or skills..." 
              className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:border-uel-blue focus:ring-4 focus:ring-uel-blue/5 transition-all text-sm font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <FilterDropdown 
              label={selectedLevel} 
              options={['Tất cả trình độ', ...EDUCATION_LEVELS]} 
              onSelect={setSelectedLevel} 
            />
            <button className="bg-uel-blue text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:brightness-110 transition-all">
              SEARCH
            </button>
          </div>
        </div>

        {/* Career Groups Carousel / Pills - Mentoree Style */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Pill 
            label="Tất cả nhóm nghề" 
            active={selectedTrack === 'Tất cả nhóm nghề'} 
            onClick={() => setSelectedTrack('Tất cả nhóm nghề')} 
          />
          {CAREER_TRACKS.map(track => (
            <Pill 
              key={track} 
              label={track} 
              active={selectedTrack === track} 
              onClick={() => setSelectedTrack(track)} 
            />
          ))}
        </div>
      </section>

      {/* Results Grid - Mentoree Style Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredMentees.map((mentee, idx) => (
            <motion.div 
              key={mentee.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-[450px] cursor-pointer"
              onClick={() => openProfile(mentee)}
            >
              {/* Image Overlay Header */}
              <div className="absolute inset-0">
                <img 
                  src={mentee.avatar_url} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={mentee.full_name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              {/* Action Buttons Overlay */}
              <div className="absolute top-6 left-6 z-10">
                <button 
                  onClick={(e) => toggleLike(mentee.id, e)}
                  className={cn(
                    "w-10 h-10 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center transition-all shadow-lg",
                    likedMentees.includes(mentee.id) ? "bg-rose-500 border-rose-500 text-white" : "bg-white/20 text-white hover:bg-white hover:text-uel-blue"
                  )} 
                  title="Yêu thích"
                >
                  <Heart size={18} className={likedMentees.includes(mentee.id) ? "fill-current" : ""} />
                </button>
              </div>
              
              {remainingSlots > 0 && (
                <div className="absolute top-6 right-6 z-10">
                  <button 
                    onClick={(e) => handleConnect(mentee.full_name, e)}
                    className="w-10 h-10 rounded-full bg-uel-orange backdrop-blur-md border border-uel-orange/30 text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg" 
                    title="Gửi yêu cầu kết nối"
                  >
                    <Send size={18} />
                  </button>
                </div>
              )}

              {/* Content Overlay Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black">{mentee.full_name}</h3>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
                  </div>
                  <p className="text-xs font-black text-uel-orange uppercase tracking-widest">{mentee.career_track}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge icon={GraduationCap} text={mentee.education_level} />
                  <Badge icon={MapPin} text="UEL Student" />
                </div>

                <div className="pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <button 
                    className="w-full py-4 bg-white text-uel-blue rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-uel-orange hover:text-white transition-all"
                  >
                    VIEW QUICK PROFILE
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredMentees.length === 0 && (
        <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Search size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">No Mentees found</h3>
          <p className="text-slate-500 font-medium mt-2">Try adjusting your filters to find more students.</p>
        </div>
      )}

      {/* Mentoree Style Profile Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMentee && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-uel-blue/40 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh]"
            >
              {/* Left Sidebar - Profile Summary */}
              <div className="w-full md:w-[350px] bg-slate-50 border-r border-slate-100 p-8 flex flex-col items-center text-center overflow-y-auto">
                <div className="relative mb-6">
                  <img 
                    src={selectedMentee.avatar_url} 
                    className="w-40 h-40 rounded-3xl object-cover shadow-2xl border-4 border-white" 
                    alt={selectedMentee.full_name} 
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-uel-orange text-white rounded-xl flex items-center justify-center shadow-lg">
                    <Star size={20} fill="currentColor" />
                  </div>
                </div>

                <h2 className="text-3xl font-black text-slate-900">{selectedMentee.full_name}</h2>
                <p className="text-sm font-black text-uel-blue uppercase tracking-widest mt-2">{selectedMentee.career_track}</p>
                
                <div className="flex items-center gap-4 mt-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> TP. HCM</span>
                  <span className="flex items-center gap-1.5"><GraduationCap size={14} /> {selectedMentee.education_level}</span>
                </div>

                <div className="w-full mt-10 space-y-4">
                  <button 
                    onClick={() => handleSendMessage(selectedMentee.full_name)}
                    className="w-full py-4 bg-uel-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:bg-[#0f3a69] transition-all flex items-center justify-center gap-3"
                  >
                    <MessageCircle size={18} /> GỬI TIN NHẮN
                  </button>
                  <button 
                    onClick={() => handleConnect(selectedMentee.full_name)}
                    className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-uel-orange hover:text-uel-orange transition-all flex items-center justify-center gap-3"
                  >
                    <Send size={18} /> KẾT NỐI NGAY
                  </button>
                  
                  <Link 
                    href={`/dashboard/mentees/profile/${selectedMentee.id}`}
                    className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3 mt-4"
                  >
                    <ExternalLink size={18} /> XEM CHI TIẾT
                  </Link>
                </div>

                <div className="mt-auto pt-10 text-[10px] font-black text-slate-400 uppercase tracking-widest space-y-2">
                  <p>Mã sinh viên: UEL24-0012</p>
                  <p>Tham gia: Tháng 04, 2026</p>
                </div>
              </div>

              {/* Right Content - Tabs & Details */}
              <div className="flex-1 bg-white p-10 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex gap-8 border-b border-slate-100">
                    <Tab active={activeTab === 'Tổng quan'} label="Tổng quan" onClick={() => setActiveTab('Tổng quan')} />
                    <Tab active={activeTab === 'Mục tiêu'} label="Mục tiêu" onClick={() => setActiveTab('Mục tiêu')} />
                    <Tab active={activeTab === 'Hoạt động'} label="Hoạt động" onClick={() => setActiveTab('Hoạt động')} />
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-3 hover:bg-slate-50 rounded-full transition-colors text-slate-400"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {activeTab === 'Tổng quan' && (
                        <div className="space-y-12">
                          <section>
                            <SectionTitle icon={Info} title="Giới thiệu bản thân" />
                            <p className="text-slate-600 leading-relaxed font-medium mt-4">
                              Chào Mentor! Em là sinh viên khoa Thương mại điện tử với niềm đam mê lớn về phân tích dữ liệu và tối ưu hóa quy trình. 
                              Hiện tại em đang tìm kiếm sự hướng dẫn để có thể thực tập tại các tập đoàn lớn trong năm tới.
                            </p>
                          </section>

                          <section>
                            <SectionTitle icon={Award} title="Kỹ năng & Chứng chỉ" />
                            <div className="flex flex-wrap gap-3 mt-6">
                              {['SQL Specialist', 'Tableau Desktop', 'English IELTs 7.5', 'Digital Marketing', 'Data Analysis'].map(s => (
                                <span key={s} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-uel-blue">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </section>
                        </div>
                      )}

                      {activeTab === 'Mục tiêu' && (
                        <section>
                          <SectionTitle icon={Target} title="Mục tiêu Mentorship" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <GoalCard title="Định hướng nghề nghiệp" desc="Hiểu rõ lộ trình phát triển của một BA chuyên nghiệp." />
                            <GoalCard title="Kỹ năng chuyên môn" desc="Tối ưu hóa khả năng sử dụng SQL và Python trong thực tế." />
                            <GoalCard title="Mở rộng mạng lưới" desc="Kết nối với các chuyên gia trong ngành TMĐT." />
                          </div>
                        </section>
                      )}

                      {activeTab === 'Hoạt động' && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 italic font-bold">
                          Thông tin này đang được cập nhật...
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
function Pill({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-full text-xs font-black whitespace-nowrap transition-all border",
        active 
          ? "bg-uel-blue border-uel-blue text-white shadow-lg shadow-uel-blue/20" 
          : "bg-white border-slate-200 text-slate-500 hover:border-uel-blue hover:text-uel-blue"
      )}
    >
      {label}
    </button>
  );
}

function FilterDropdown({ label, options, onSelect }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-w-[200px]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm font-bold text-slate-700 hover:border-uel-blue transition-all"
      >
        {label}
        <ChevronDown size={18} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {options.map((opt: string) => (
              <button 
                key={opt}
                onClick={() => { onSelect(opt); setIsOpen(false); }}
                className="w-full text-left px-6 py-4 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-uel-blue transition-all"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Badge({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-wider">
      <Icon size={12} strokeWidth={3} />
      {text}
    </div>
  );
}

function Tab({ label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "pb-4 text-xs font-black uppercase tracking-widest transition-all",
        active ? "border-b-4 border-uel-orange text-uel-blue" : "text-slate-400 hover:text-slate-600"
      )}
    >
      {label}
    </button>
  );
}

function SectionTitle({ icon: Icon, title }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-uel-blue/5 rounded-xl flex items-center justify-center text-uel-blue">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
    </div>
  );
}

function GoalCard({ title, desc }: any) {
  return (
    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-uel-blue/30 transition-all group">
      <p className="text-xs font-black text-uel-blue uppercase mb-1">{title}</p>
      <p className="text-xs text-slate-500 font-bold leading-relaxed">{desc}</p>
    </div>
  );
}
