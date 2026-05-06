'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser } from '@/lib/mock-data';
import { 
  ChevronLeft, 
  MapPin, 
  GraduationCap, 
  Globe,
  Star, 
  Info, 
  Award, 
  Calendar,
  Share2,
  Edit,
  Camera,
  Briefcase,
  Activity,
  Clock,
  Phone,
  Mail,
  Building,
  Users,
  Trash2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RadarChart from '@/components/mentee-management/RadarChart';

export default function MyProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Tổng quan');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userData = getLoggedInUser();
    setUser(userData);
    setEditData(userData);
  }, []);

  if (!user) return null;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const { updateUserProfile } = require('@/lib/mock-data');
        const updatedUser = updateUserProfile({ avatar_url: base64String });
        setUser(updatedUser);
        alert('Đã cập nhật ảnh đại diện trực tiếp!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Đã sao chép liên kết hồ sơ vào bộ nhớ tạm!');
  };

  const startEditing = () => {
    setEditData({ ...user });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditData({ ...user });
  };

  const saveEditing = () => {
    const { updateUserProfile, logUserActivity } = require('@/lib/mock-data');
    const updatedUser = updateUserProfile(editData);
    setUser(updatedUser);
    setIsEditing(false);
    
    logUserActivity({
      type: 'award',
      title: 'Cập nhật thông tin tại chỗ',
      description: 'Bạn vừa chỉnh sửa thông tin hồ sơ trực tiếp từ giao diện Profile.'
    });
    
    alert('Đã lưu thay đổi hồ sơ!');
  };

  const handleEditChange = (field: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Premium Header Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-uel-blue transition-colors font-black text-xs uppercase tracking-widest"
          >
            <ChevronLeft size={20} /> QUAY LẠI
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-uel-blue"
              title="Chia sẻ hồ sơ"
            >
              <Share2 size={20} />
            </button>
            {isEditing ? (
              <div className="flex gap-2">
                <button 
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Hủy
                </button>
                <button 
                  onClick={saveEditing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Lưu thay đổi
                </button>
              </div>
            ) : (
              <button 
                onClick={startEditing}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
              >
                <Edit size={14} /> Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar - Profile Card */}
          <div className="w-full lg:w-[400px] space-y-6 lg:sticky lg:top-6 h-fit">
            <div className="bg-white rounded-[40px] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-uel-blue to-uel-orange opacity-10" />
              
              <div className="relative z-10">
                <div className="relative inline-block mb-8 group cursor-pointer" onClick={handleAvatarClick}>
                  <img 
                    src={user.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'} 
                    className="w-48 h-48 rounded-[48px] object-cover border-8 border-white shadow-2xl mx-auto bg-white group-hover:opacity-90 transition-all" 
                    alt={user.full_name} 
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-[48px] overflow-hidden">
                    <div className="bg-black/40 backdrop-blur-sm w-full h-full flex flex-col items-center justify-center text-white">
                      <Camera size={32} className="mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Thay ảnh</span>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                  />
                  {user.is_mentor_approved && (
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-uel-orange text-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                      <Star size={24} fill="currentColor" />
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <input 
                      value={editData.full_name}
                      onChange={(e) => handleEditChange('full_name', e.target.value)}
                      className="text-4xl font-black text-slate-900 leading-tight w-full bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 rounded-xl px-2 py-1 text-center"
                      placeholder="Họ và tên"
                    />
                    <input 
                      value={editData.career_track}
                      onChange={(e) => handleEditChange('career_track', e.target.value)}
                      className="text-sm font-black text-uel-blue uppercase tracking-[3px] mt-3 w-full bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 rounded-xl px-2 py-1 text-center"
                      placeholder="Chức danh / Nghề nghiệp"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-4xl font-black text-slate-900 leading-tight">{user.full_name}</h1>
                    <p className="text-sm font-black text-uel-blue uppercase tracking-[3px] mt-3">{user.career_track || 'Alumnus'}</p>
                  </>
                )}
                
                <div className="flex items-center justify-center gap-3 mt-4">
                  {isEditing ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                        <Building size={12} className="text-slate-400" />
                        <input 
                          value={editData.industry}
                          onChange={(e) => handleEditChange('industry', e.target.value)}
                          className="bg-transparent border-none outline-none text-[10px] font-black text-slate-500 uppercase tracking-widest w-24"
                          placeholder="Ngành"
                        />
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                        <Clock size={12} className="text-slate-400" />
                        <input 
                          type="number"
                          value={editData.years_experience}
                          onChange={(e) => handleEditChange('years_experience', parseInt(e.target.value))}
                          className="bg-transparent border-none outline-none text-[10px] font-black text-slate-500 uppercase tracking-widest w-12"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Building size={12} /> {user.industry || 'N/A'}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Clock size={12} /> {user.years_experience || 0} NĂM KN
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col items-start gap-4 mt-8 py-8 border-y border-slate-50 w-full px-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-uel-blue">
                      <Mail size={18} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                      {isEditing ? (
                        <input 
                          value={editData.email}
                          onChange={(e) => handleEditChange('email', e.target.value)}
                          className="font-bold text-sm text-slate-700 w-full bg-slate-50 border-none outline-none rounded-lg px-2"
                        />
                      ) : (
                        <p className="font-bold text-sm text-slate-700">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-uel-orange">
                      <Phone size={18} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Số điện thoại</p>
                      {isEditing ? (
                        <input 
                          value={editData.phone}
                          onChange={(e) => handleEditChange('phone', e.target.value)}
                          className="font-bold text-sm text-slate-700 w-full bg-slate-50 border-none outline-none rounded-lg px-2"
                          placeholder="09xx..."
                        />
                      ) : (
                        <p className="font-bold text-sm text-slate-700">{user.phone || 'Chưa cập nhật'}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-emerald-500">
                      <MapPin size={18} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Khu vực</p>
                      {isEditing ? (
                        <input 
                          value={editData.location || 'TP. Hồ Chí Minh, Việt Nam'}
                          onChange={(e) => handleEditChange('location', e.target.value)}
                          className="font-bold text-sm text-slate-700 w-full bg-slate-50 border-none outline-none rounded-lg px-2"
                        />
                      ) : (
                        <p className="font-bold text-sm text-slate-700">{user.location || 'TP. Hồ Chí Minh, Việt Nam'}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-purple-500">
                      <GraduationCap size={18} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Học vấn</p>
                      {isEditing ? (
                        <input 
                          value={editData.education || 'Cựu sinh viên UEL'}
                          onChange={(e) => handleEditChange('education', e.target.value)}
                          className="font-bold text-sm text-slate-700 w-full bg-slate-50 border-none outline-none rounded-lg px-2"
                        />
                      ) : (
                        <p className="font-bold text-sm text-slate-700">{user.education || 'Cựu sinh viên UEL'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing ? (
                  <div className="pt-8 w-full">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">LINK LINKEDIN</p>
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <Globe size={18} className="text-uel-blue" />
                      <input 
                        value={editData.linkedin_url}
                        onChange={(e) => handleEditChange('linkedin_url', e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-bold text-slate-600 flex-1"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                ) : user.linkedin_url ? (
                  <div className="pt-8 w-full">
                    <a 
                      href={user.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-[#0077b5] text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                      <Globe size={20} /> LINKEDIN PROFILE
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 flex justify-between">
              <StatItem label="Season" value="Spring 2026" />
              <div className="w-[1px] bg-slate-100" />
              <StatItem label="Vai trò" value={user.is_mentor_approved ? "Mentor" : "Alumnus"} />
              <div className="w-[1px] bg-slate-100" />
              <StatItem label="Đánh giá" value="5.0" isRating />
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 space-y-8">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-[32px] p-4 shadow-sm border border-slate-100 flex gap-4 overflow-x-auto">
              {['Tổng quan', 'Kinh nghiệm', 'Kỹ năng', 'Hoạt động'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
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
                    <section>
                      <SectionTitle icon={Info} title="GIỚI THIỆU BẢN THÂN" />
                      {isEditing ? (
                        <textarea 
                          value={editData.bio}
                          onChange={(e) => handleEditChange('bio', e.target.value)}
                          rows={10}
                          className="mt-8 w-full p-8 bg-slate-50 border-none outline-none focus:ring-4 ring-blue-50 rounded-[32px] text-slate-600 leading-relaxed font-medium text-lg resize-none"
                          placeholder="Viết lời giới thiệu ấn tượng về bạn..."
                        />
                      ) : (
                        <div className="mt-8 text-slate-600 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                          {user.bio || 'Chưa có thông tin giới thiệu.'}
                        </div>
                      )}
                    </section>
                  )}

                  {activeTab === 'Kỹ năng' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <section>
                        <SectionTitle icon={Award} title="KỸ NĂNG CHUYÊN MÔN" />
                        <div className="flex flex-wrap gap-4 mt-8">
                          {(isEditing ? editData.skills : (user.skills || ['Management', 'Strategy', 'Communication'])).map((s: string, idx: number) => (
                            <div 
                              key={idx} 
                              className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black text-uel-blue uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
                            >
                              {s}
                              {isEditing && (
                                <button 
                                  onClick={() => {
                                    const newList = editData.skills.filter((_: string, i: number) => i !== idx);
                                    handleEditChange('skills', newList);
                                  }}
                                  className="text-slate-400 hover:text-rose-500"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          ))}
                          {isEditing && (
                            <div className="w-full mt-4">
                              <input 
                                type="text"
                                placeholder="Thêm kỹ năng (Nhấn Enter)..."
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold outline-none focus:border-uel-blue shadow-sm"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const val = (e.target as HTMLInputElement).value.trim();
                                    if (val && !editData.skills.includes(val)) {
                                      handleEditChange('skills', [...(editData.skills || []), val]);
                                      (e.target as HTMLInputElement).value = '';
                                    }
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </section>

                      <section>
                        <SectionTitle icon={Activity} title="PHÂN TÍCH NĂNG LỰC" />
                        <div className="mt-8 flex flex-col items-center p-8 bg-slate-50 rounded-[40px] border border-slate-100 shadow-inner">
                          <RadarChart 
                            data={isEditing ? (editData.radar_skills || user.radar_skills) : (user.radar_skills || [
                              { skill: 'Data', score: 8, category: 'technical' },
                              { skill: 'Soft Skills', score: 9, category: 'soft' },
                              { skill: 'Business', score: 8, category: 'business' },
                              { skill: 'Tech', score: 7, category: 'technical' },
                              { skill: 'Leadership', score: 9, category: 'soft' },
                            ])} 
                            size={240} 
                          />
                          
                          {isEditing && (
                            <div className="w-full mt-8 space-y-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">Điều chỉnh chỉ số năng lực</p>
                              {(editData.radar_skills || [
                                { skill: 'Data', score: 8, category: 'technical' },
                                { skill: 'Soft Skills', score: 9, category: 'soft' },
                                { skill: 'Business', score: 8, category: 'business' },
                                { skill: 'Tech', score: 7, category: 'technical' },
                                { skill: 'Leadership', score: 9, category: 'soft' },
                              ]).map((item: any, idx: number) => (
                                <div key={idx} className="space-y-1">
                                  <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-wider">
                                    <span>{item.skill || item.label}</span>
                                    <span className="text-uel-blue">{item.score || item.value} / 10</span>
                                  </div>
                                  <input 
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="1"
                                    value={item.score || item.value}
                                    onChange={(e) => {
                                      const baseSkills = editData.radar_skills || [
                                        { skill: 'Data', score: 8, category: 'technical' },
                                        { skill: 'Soft Skills', score: 9, category: 'soft' },
                                        { skill: 'Business', score: 8, category: 'business' },
                                        { skill: 'Tech', score: 7, category: 'technical' },
                                        { skill: 'Leadership', score: 9, category: 'soft' },
                                      ];
                                      const newList = [...baseSkills];
                                      const val = parseInt(e.target.value);
                                      if (newList[idx].score !== undefined) newList[idx].score = val;
                                      if (newList[idx].value !== undefined) newList[idx].value = val;
                                      handleEditChange('radar_skills', newList);
                                    }}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-uel-blue"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>
                    </div>
                  )}

                  {activeTab === 'Kinh nghiệm' && (
                    <section>
                      <div className="flex items-center justify-between">
                        <SectionTitle icon={Briefcase} title="KINH NGHIỆM LÀM VIỆC" />
                        {isEditing && (
                          <button 
                            onClick={() => {
                              const newList = [{ company: '', position: '', period: '', description: '' }, ...(editData.experience_list || [])];
                              handleEditChange('experience_list', newList);
                            }}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-all"
                          >
                            + Thêm kinh nghiệm
                          </button>
                        )}
                      </div>
                      <div className="mt-10 space-y-12">
                        {(isEditing ? editData.experience_list : user.experience_list)?.map((exp: any, idx: number) => (
                          <div key={idx} className="relative pl-10 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:bg-slate-100 last:before:hidden">
                            <div className="absolute left-[-8px] top-1 w-5 h-5 bg-uel-blue rounded-full border-4 border-white shadow-md shadow-uel-blue/20" />
                            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 group hover:border-uel-blue/30 transition-all relative">
                              {isEditing && (
                                <button 
                                  onClick={() => {
                                    const newList = editData.experience_list.filter((_: any, i: number) => i !== idx);
                                    handleEditChange('experience_list', newList);
                                  }}
                                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                              
                              {isEditing ? (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                      value={exp.position}
                                      onChange={(e) => {
                                        const newList = [...editData.experience_list];
                                        newList[idx] = { ...exp, position: e.target.value };
                                        handleEditChange('experience_list', newList);
                                      }}
                                      className="text-xl font-black text-slate-900 bg-white px-4 py-2 rounded-xl outline-none"
                                      placeholder="Vị trí"
                                    />
                                    <input 
                                      value={exp.company}
                                      onChange={(e) => {
                                        const newList = [...editData.experience_list];
                                        newList[idx] = { ...exp, company: e.target.value };
                                        handleEditChange('experience_list', newList);
                                      }}
                                      className="text-slate-500 font-bold uppercase tracking-widest text-xs bg-white px-4 py-2 rounded-xl outline-none"
                                      placeholder="Công ty"
                                    />
                                  </div>
                                  <input 
                                    value={exp.period}
                                    onChange={(e) => {
                                      const newList = [...editData.experience_list];
                                      newList[idx] = { ...exp, period: e.target.value };
                                      handleEditChange('experience_list', newList);
                                    }}
                                    className="px-4 py-2 bg-white rounded-xl border border-slate-100 text-xs font-black text-slate-400 uppercase tracking-widest outline-none"
                                    placeholder="Thời gian (VD: 2021 - Hiện tại)"
                                  />
                                  <textarea 
                                    value={exp.description}
                                    onChange={(e) => {
                                      const newList = [...editData.experience_list];
                                      newList[idx] = { ...exp, description: e.target.value };
                                      handleEditChange('experience_list', newList);
                                    }}
                                    rows={2}
                                    className="w-full px-4 py-2 rounded-xl bg-white outline-none text-slate-600 font-medium"
                                    placeholder="Mô tả công việc..."
                                  />
                                </div>
                              ) : (
                                <>
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                      <h4 className="text-xl font-black text-slate-900 group-hover:text-uel-blue transition-colors">{exp.position}</h4>
                                      <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">{exp.company}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 text-xs font-black text-slate-400 uppercase tracking-widest">
                                      {exp.period}
                                    </div>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed font-medium">{exp.description}</p>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                        {((isEditing ? editData.experience_list : user.experience_list)?.length === 0) && (
                          <div className="text-center py-20 text-slate-400 italic">Chưa cập nhật thông tin kinh nghiệm.</div>
                        )}
                      </div>
                    </section>
                  )}

                  {activeTab === 'Hoạt động' && (
                    <section>
                      <SectionTitle icon={Activity} title="HOẠT ĐỘNG CỘNG ĐỒNG" />
                      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {user.activity_list?.map((act: any, idx: number) => (
                          <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="flex items-center gap-4 mb-6">
                              <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center",
                                act.type === 'post' ? "bg-blue-50 text-blue-500" : 
                                act.type === 'mentor' ? "bg-orange-50 text-orange-500" : "bg-purple-50 text-purple-500"
                              )}>
                                {act.type === 'post' ? <Info size={20} /> : act.type === 'mentor' ? <Users size={20} /> : <Award size={20} />}
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{act.date}</p>
                                <p className="text-xs font-black text-uel-blue uppercase tracking-widest mt-1">{act.type}</p>
                              </div>
                            </div>
                            <h4 className="text-lg font-black text-slate-900 mb-3 group-hover:text-uel-blue transition-colors line-clamp-2">{act.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{act.description}</p>
                          </div>
                        ))}
                        {(!user.activity_list || user.activity_list.length === 0) && (
                          <div className="col-span-2 text-center py-20 text-slate-400 italic">Chưa có hoạt động gần đây.</div>
                        )}
                      </div>
                    </section>
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
