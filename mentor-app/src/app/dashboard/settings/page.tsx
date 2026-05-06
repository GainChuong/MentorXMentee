'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, Bell, Shield, Sliders, Save, Trash2, AlertTriangle, Globe, Camera, Building, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLoggedInUser, updateUserProfile, SEASONS, logUserActivity } from '@/lib/mock-data';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    career_track: '',
    industry: '',
    years_experience: 0,
    linkedin_url: '',
    bio: '',
    experience_list: [] as any[]
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSeasonActive, setIsSeasonActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userData = getLoggedInUser();
    if (userData) {
      setUser(userData);
      setFormData({
        full_name: userData.full_name || '',
        email: userData.email || '',
        career_track: userData.career_track || '',
        industry: userData.industry || '',
        years_experience: userData.years_experience || 0,
        linkedin_url: userData.linkedin_url || '',
        bio: userData.bio || '',
        experience_list: userData.experience_list || []
      });
    }

    // Check if any season is active
    const activeSeason = SEASONS.find(s => s.is_active);
    setIsSeasonActive(!!activeSeason);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updatedUser = updateUserProfile(formData);
      setUser(updatedUser);
      setIsSaving(false);
      
      // Log activity
      logUserActivity({
        type: 'award', // Using 'award' as a generic "achievement/milestone" type for profile updates
        title: 'Cập nhật hồ sơ cá nhân',
        description: 'Bạn vừa cập nhật các thông tin chuyên môn và lộ trình kinh nghiệm mới.'
      });

      alert('Đã cập nhật thông tin hồ sơ và lộ trình kinh nghiệm thành công!');
      router.push('/dashboard/profile');
    }, 800);
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience_list: [
        { company: '', position: '', period: '', description: '' },
        ...prev.experience_list
      ]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience_list: prev.experience_list.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience_list: prev.experience_list.map((exp: any, i: number) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedUser = updateUserProfile({ avatar_url: base64String });
        setUser(updatedUser);
        alert('Đã cập nhật ảnh đại diện!');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Cài đặt</h1>
        <p className="text-slate-500 font-medium mt-2">Quản lý tài khoản, thông báo và quyền riêng tư của bạn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1">
          <SettingsTab label="Hồ sơ cá nhân" icon={User} active />
          <SettingsTab label="Thông báo" icon={Bell} />
          <SettingsTab label="Bảo mật" icon={Shield} />
          <SettingsTab label="Dung lượng" icon={Sliders} />
        </div>

        <div className="md:col-span-3 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
            <div className="flex items-center gap-6">
              <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <img 
                  src={user.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=A"} 
                  className="w-24 h-24 rounded-3xl border-4 border-slate-50 shadow-sm group-hover:opacity-80 transition-all object-cover bg-white"
                  alt="Profile"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <div className="bg-black/50 p-2 rounded-full text-white">
                    <Camera size={20} />
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">{user.full_name}</h3>
                <p className="text-sm font-bold text-slate-500">
                  {user.is_mentor_approved ? 'Mentor Chính Thức' : 'Thành viên Alumnus'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup 
                label="Họ và tên" 
                name="full_name"
                value={formData.full_name} 
                onChange={handleInputChange}
              />
              <InputGroup 
                label="Email" 
                name="email"
                value={formData.email} 
                onChange={handleInputChange}
              />
              <InputGroup 
                label="Ngành chuyên môn / Chức vụ" 
                name="career_track"
                value={formData.career_track} 
                onChange={handleInputChange}
              />
               <InputGroup 
                label="Lĩnh vực / Ngành" 
                name="industry"
                value={formData.industry} 
                onChange={handleInputChange}
                icon={Building}
              />
              <InputGroup 
                label="Số năm kinh nghiệm" 
                name="years_experience"
                type="number"
                value={formData.years_experience} 
                onChange={handleInputChange}
                icon={Clock}
              />
              <InputGroup 
                label="Link LinkedIn" 
                name="linkedin_url"
                value={formData.linkedin_url} 
                onChange={handleInputChange}
                icon={Globe}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tiểu sử (Bio)</label>
              <textarea 
                rows={4} 
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm font-medium leading-relaxed"
                placeholder="Giới thiệu ngắn gọn về bản thân..."
              />
            </div>

            <div className="space-y-6 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Kinh nghiệm làm việc (Timeline)</h3>
                  <p className="text-sm text-slate-500 font-medium">Thêm các mốc sự nghiệp của bạn để mentees dễ dàng theo dõi.</p>
                </div>
                <button 
                  onClick={addExperience}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-all"
                >
                  + Thêm mốc mới
                </button>
              </div>

              <div className="space-y-4">
                {formData.experience_list.map((exp: any, idx: number) => (
                  <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 relative group">
                    <button 
                      onClick={() => removeExperience(idx)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Công ty</label>
                        <input 
                          value={exp.company}
                          onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm font-bold"
                          placeholder="Ví dụ: Google, UEL..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chức vụ</label>
                        <input 
                          value={exp.position}
                          onChange={(e) => updateExperience(idx, 'position', e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm font-bold"
                          placeholder="Ví dụ: Senior Engineer..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thời gian</label>
                        <input 
                          value={exp.period}
                          onChange={(e) => updateExperience(idx, 'period', e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm font-bold"
                          placeholder="Ví dụ: 2021 - Hiện tại"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mô tả công việc</label>
                      <textarea 
                        value={exp.description}
                        onChange={(e) => updateExperience(idx, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 rounded-xl border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm font-medium"
                        placeholder="Mô tả ngắn gọn những gì bạn đã làm..."
                      />
                    </div>
                  </div>
                ))}
                {formData.experience_list.length === 0 && (
                  <div className="text-center py-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 italic text-sm">
                    Chưa có kinh nghiệm nào được thêm. Hãy nhấn nút để bắt đầu!
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => router.push('/dashboard/profile')}
                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all"
              >
                Hủy thay đổi
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {isSaving ? 'Đang lưu...' : 'Lưu cấu hình'}
              </button>
            </div>
          </section>

          <section className="bg-rose-50 p-8 rounded-3xl border border-rose-100 space-y-4">
            <h3 className="text-lg font-black text-rose-900 flex items-center gap-2">
              <AlertTriangle size={20} /> Vùng nguy hiểm
            </h3>
            
            {user.is_mentor_approved ? (
              <>
                <p className="text-sm text-rose-800 font-medium">
                  {isSeasonActive 
                    ? "Season hiện tại đang diễn ra. Bạn chỉ có thể dừng tư cách Mentor hoặc xóa tài khoản sau khi Season kết thúc."
                    : "Dừng tư cách Mentor hoặc xóa tài khoản là hành động không thể hoàn tác."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    disabled={isSeasonActive}
                    className="px-6 py-3 bg-rose-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={18} /> Dừng tư cách Mentor
                  </button>
                  <button 
                    disabled={isSeasonActive}
                    className="px-6 py-3 bg-white text-rose-600 border border-rose-200 rounded-2xl font-black text-sm hover:bg-rose-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Xóa tài khoản
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-rose-800 font-medium">
                  Xóa tài khoản là hành động không thể hoàn tác. Toàn bộ dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                </p>
                <button className="px-6 py-3 bg-rose-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-rose-100 hover:bg-rose-700 transition-all flex items-center gap-2">
                  <Trash2 size={18} /> Xóa tài khoản
                </button>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ label, icon: Icon, active }: any) {
  return (
    <button className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm",
      active 
        ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}>
      <Icon size={18} strokeWidth={active ? 2.5 : 2} />
      {label}
    </button>
  );
}

function InputGroup({ label, value, name, onChange, type = 'text', icon: Icon }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        {Icon && <Icon size={14} className="text-slate-300" />}
        {label}
      </label>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:border-blue-200 rounded-2xl outline-none transition-all text-sm font-bold text-slate-700"
      />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
