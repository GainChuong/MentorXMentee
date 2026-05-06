'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MENTEES, CURRENT_USER, MENTORS } from '@/lib/mock-data';
import { 
  ChevronLeft, 
  MapPin, 
  GraduationCap, 
  MessageCircle, 
  Send, 
  Star, 
  Info, 
  Target, 
  Award, 
  X,
  Calendar,
  Share2,
  Heart,
  MoreHorizontal,
  Briefcase,
  Clock,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import RadarChart from '@/components/mentee-management/RadarChart';

export default function MenteeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const menteeId = params.id as string;
  const mentee = MENTEES.find(m => m.id === menteeId) || MENTEES[0];
  
  const [activeTab, setActiveTab] = useState('Tổng quan');
  const [isLiked, setIsLiked] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleSendRequest = () => {
    setIsRequestSent(true);
    alert(`Đã gửi yêu cầu kết nối tới ${mentee.full_name}!`);
  };

  const handleSendMessage = () => {
    alert(`Chức năng nhắn tin tới ${mentee.full_name} đang được phát triển.`);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Đã sao chép liên kết hồ sơ vào bộ nhớ tạm!');
    setShowShareMenu(false);
  };

  const handleReport = () => {
    alert('Đã gửi báo cáo về hồ sơ này tới ban quản trị.');
    setShowMoreMenu(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Premium Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-uel-blue transition-colors font-black text-xs uppercase tracking-widest"
          >
            <ChevronLeft size={20} /> QUAY LẠI
          </button>
          <div className="flex items-center gap-4 relative">
            {/* Share Button */}
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Share2 size={20} className={showShareMenu ? "text-uel-blue" : "text-slate-400"} />
              </button>
              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[60] overflow-hidden p-2">
                  <button 
                    onClick={handleShare}
                    className="w-full text-left px-4 py-3 text-xs font-black text-slate-600 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-2 uppercase tracking-tighter"
                  >
                    <Share2 size={14} /> Sao chép liên kết
                  </button>
                </div>
              )}
            </div>

            {/* Like Button */}
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Heart size={20} className={isLiked ? "text-rose-500 fill-rose-500" : "text-slate-400"} />
            </button>

            {/* More Button */}
            <div className="relative">
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <MoreHorizontal size={20} className={showMoreMenu ? "text-uel-blue" : "text-slate-400"} />
              </button>
              {showMoreMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[60] overflow-hidden p-2">
                  <button 
                    onClick={handleReport}
                    className="w-full text-left px-4 py-3 text-xs font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-2 uppercase tracking-tighter"
                  >
                    <X size={14} /> Báo cáo hồ sơ
                  </button>
                  <button 
                    onClick={() => setShowMoreMenu(false)}
                    className="w-full text-left px-4 py-3 text-xs font-black text-slate-600 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-2 uppercase tracking-tighter"
                  >
                    Chặn Mentee
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar - Profile Card */}
          <div className="w-full lg:w-[400px] space-y-6">
            <div className="bg-white rounded-[40px] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-uel-blue to-uel-orange opacity-10" />
              
              <div className="relative z-10">
                <div className="relative inline-block mb-8">
                  <img 
                    src={mentee.avatar_url} 
                    className="w-48 h-48 rounded-[48px] object-cover border-8 border-white shadow-2xl mx-auto" 
                    alt={mentee.full_name} 
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-uel-orange text-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                    <Star size={24} fill="currentColor" />
                  </div>
                </div>

                <h1 className="text-4xl font-black text-slate-900 leading-tight">{mentee.full_name}</h1>
                <p className="text-sm font-black text-uel-blue uppercase tracking-[3px] mt-3">{mentee.career_track}</p>
                
                <div className="flex flex-col items-center gap-4 mt-8 py-8 border-y border-slate-50">
                  <InfoItem icon={MapPin} label="TP. Hồ Chí Minh, Việt Nam" />
                  <InfoItem icon={GraduationCap} label={mentee.education_level} />
                  <InfoItem icon={Calendar} label="Tham gia từ 04/2026" />
                </div>

                <div className="space-y-4 pt-8">
                  <button 
                    onClick={handleSendMessage}
                    className="w-full py-5 bg-uel-blue text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-uel-blue/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                    <MessageCircle size={20} /> GỬI TIN NHẮN
                  </button>
                  <button 
                    onClick={handleSendRequest}
                    disabled={isRequestSent}
                    className={cn(
                      "w-full py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2",
                      isRequestSent 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600 opacity-80" 
                        : "bg-white border-slate-200 text-slate-700 hover:border-uel-orange hover:text-uel-orange"
                    )}
                  >
                    <Send size={20} /> {isRequestSent ? "ĐÃ GỬI YÊU CẦU" : "KẾT NỐI NGAY"}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 flex justify-between">
              <StatItem label="Dự án" value="12" />
              <div className="w-[1px] bg-slate-100" />
              <StatItem label="Kết nối" value="45" />
              <div className="w-[1px] bg-slate-100" />
              <StatItem label="Đánh giá" value="4.9" isRating />
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 space-y-8">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-[32px] p-4 shadow-sm border border-slate-100 flex gap-4 overflow-x-auto">
              {['Tổng quan', 'Mục tiêu', 'Kinh nghiệm', 'Hoạt động'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                    activeTab === tab 
                      ? "bg-uel-blue text-white shadow-xl shadow-uel-blue/20" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Main Content Sections */}
            <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  {activeTab === 'Tổng quan' && (
                    <>
                      <section>
                        <SectionTitle icon={Info} title="GIỚI THIỆU BẢN THÂN" />
                        <div className="mt-8 text-slate-600 leading-relaxed font-medium text-lg">
                          Chào Mentor! Em là sinh viên khoa Thương mại điện tử với niềm đam mê lớn về phân tích dữ liệu và tối ưu hóa quy trình. 
                          Hiện tại em đang tìm kiếm sự hướng dẫn để có thể thực tập tại các tập đoàn lớn trong năm tới. 
                          Em đã có kinh nghiệm tham gia các cuộc thi khởi nghiệp và đạt giải khuyến khích cấp trường.
                        </div>
                      </section>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section>
                          <SectionTitle icon={Award} title="KỸ NĂNG & CHỨNG CHỈ" />
                          <div className="flex flex-wrap gap-4 mt-8">
                            {['SQL Specialist', 'Tableau Desktop', 'English IELTs 7.5', 'Digital Marketing', 'Data Analysis', 'Python for Business'].map(s => (
                              <div key={s} className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black text-uel-blue uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                                {s}
                              </div>
                            ))}
                          </div>
                        </section>

                        <section>
                          <SectionTitle icon={Activity} title="PHÂN TÍCH NĂNG LỰC" />
                          <div className="mt-8 flex flex-col items-center p-6 bg-slate-50 rounded-[32px] border border-slate-100 shadow-inner">
                            <RadarChart data={mentee.skills_assessment || [
                              { skill: 'Data', score: 8, category: 'technical' },
                              { skill: 'Soft Skills', score: 7, category: 'soft' },
                              { skill: 'Business', score: 6, category: 'business' },
                              { skill: 'Tech', score: 9, category: 'technical' },
                              { skill: 'Leadership', score: 5, category: 'soft' },
                            ]} size={200} />
                          </div>
                        </section>
                      </div>

                      <section>
                        <SectionTitle icon={Briefcase} title="DỰ ÁN TIÊU BIỂU" />
                        <div className="mt-8 space-y-6">
                          <ProjectItem 
                            title="UEL E-Commerce Strategy 2024" 
                            role="Leader / Data Analyst"
                            desc="Phân tích hành vi mua sắm của sinh viên UEL và đề xuất chiến lược phát triển sàn nội bộ."
                          />
                          <ProjectItem 
                            title="Startup Wheel Participant" 
                            role="Marketing Lead"
                            desc="Tham gia cuộc thi khởi nghiệp lớn nhất dành cho sinh viên với dự án 'Green Mart'."
                          />
                        </div>
                      </section>
                    </>
                  )}

                  {activeTab === 'Mục tiêu' && (
                    <section>
                      <SectionTitle icon={Target} title="MỤC TIÊU MENTORSHIP" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <GoalCard 
                          title="Định hướng nghề nghiệp" 
                          desc="Muốn hiểu rõ lộ trình phát triển của một Business Analyst chuyên nghiệp trong mảng Thương mại điện tử." 
                        />
                        <GoalCard 
                          title="Nâng cao kỹ năng" 
                          desc="Học hỏi cách tối ưu hóa các mô hình phân tích dữ liệu từ kinh nghiệm thực chiến của Mentor." 
                        />
                        <GoalCard 
                          title="Networking" 
                          desc="Mở rộng mối quan hệ với các chuyên gia trong ngành và các đối tác tuyển dụng tiềm năng." 
                        />
                        <GoalCard 
                          title="Thực tập & Việc làm" 
                          desc="Chuẩn bị hồ sơ và kỹ năng phỏng vấn để ứng tuyển vào các vị trí thực tập tại các công ty đa quốc gia." 
                        />
                      </div>
                    </section>
                  )}

                  {/* Add other tabs content as needed */}
                  {(activeTab === 'Kinh nghiệm' || activeTab === 'Hoạt động') && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 italic font-bold">
                      <Clock className="w-16 h-16 mb-4 opacity-20" />
                      Thông tin này đang được cập nhật...
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function InfoItem({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase tracking-wider">
      <Icon size={16} className="text-uel-blue" />
      {label}
    </div>
  );
}

function StatItem({ label, value, isRating = false }: any) {
  return (
    <div className="text-center px-4">
      <div className="flex items-center justify-center gap-1">
        <span className="text-xl font-black text-slate-900">{value}</span>
        {isRating && <Star size={14} className="text-uel-orange fill-uel-orange mb-1" />}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: any) {
  return (
    <div className="flex items-center gap-4 pb-6 border-b-2 border-slate-50">
      <div className="w-12 h-12 bg-uel-blue/5 rounded-2xl flex items-center justify-center text-uel-blue shadow-inner">
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
    </div>
  );
}

function GoalCard({ title, desc }: any) {
  return (
    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] hover:border-uel-blue/30 hover:bg-white hover:shadow-xl transition-all group">
      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-uel-orange shadow-sm mb-6 group-hover:bg-uel-orange group-hover:text-white transition-colors">
        <Target size={20} />
      </div>
      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">{title}</h4>
      <p className="text-xs text-slate-500 font-bold leading-relaxed">{desc}</p>
    </div>
  );
}

function ProjectItem({ title, role, desc }: any) {
  return (
    <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-black text-uel-blue">{title}</h4>
          <p className="text-[10px] font-black text-uel-orange uppercase tracking-widest mt-1">{role}</p>
        </div>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg uppercase">Hoàn thành</div>
      </div>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}



function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
