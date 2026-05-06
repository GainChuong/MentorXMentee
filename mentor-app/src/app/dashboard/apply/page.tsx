'use client';

import React, { useState, useEffect } from 'react';
import { SEASONS, getLoggedInUser } from '@/lib/mock-data';
import { CheckCircle2, AlertCircle, UserPlus, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ApplyMentorPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setUser(getLoggedInUser());
    setLoading(false);
  }, []);

  const nextSeason = SEASONS.find(s => !s.is_active);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (loading) return null;

  // Guest View
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-20 flex flex-col items-center text-center space-y-8">
        <div className="w-24 h-24 bg-uel-blue/5 rounded-[30px] flex items-center justify-center text-uel-blue shadow-inner">
          <UserPlus size={48} />
        </div>
        <div className="space-y-4 max-w-lg">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight">
            TRỞ THÀNH NGƯỜI DẪN DẮT <br/>
            <span className="text-uel-blue">THẾ HỆ ĐÀN EM</span>
          </h1>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            Đóng góp kinh nghiệm của bạn để giúp sinh viên UEL định hướng nghề nghiệp và phát triển bản thân tốt hơn. 
            Bạn cần đăng nhập để tiếp tục thủ tục đăng ký.
          </p>
        </div>
        <Link 
          href="/login"
          className="bg-uel-blue text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-uel-blue/30 hover:scale-105 transition-all"
        >
          ĐĂNG NHẬP NGAY
        </Link>
      </div>
    );
  }

  // Already a Mentor View
  if (user.roles?.includes('mentor')) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
            <ShieldCheck size={40} />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 uppercase">BẠN ĐÃ LÀ MENTOR</h1>
          <p className="text-sm font-medium text-slate-500">
            Chào mừng <strong>{user.full_name}</strong>! Bạn đã là thành viên chính thức của mạng lưới Mentor UEL. 
            Hãy truy cập Dashboard để xem danh sách Mentee của mình.
          </p>
        </div>
        <Link 
          href="/dashboard"
          className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-uel-blue transition-all"
        >
          VỀ TRANG CHỦ
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto mt-12 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 size={64} className="text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold">Application Submitted!</h1>
        <p className="text-slate-600">
          Thank you for applying to be a mentor. Your application for <strong>{nextSeason?.name}</strong> is now pending review.
        </p>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-left">
          <h3 className="font-bold text-blue-900 flex items-center gap-2">
            <AlertCircle size={18} /> What happens next?
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-blue-800 list-disc pl-4">
            <li>Our team will review your profile and career background.</li>
            <li>You will receive a notification once approved.</li>
            <li><strong>Note:</strong> You will officially become an active mentor when the next season starts.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">ĐĂNG KÝ MENTOR</h1>
        <p className="text-sm font-medium text-slate-500 mt-2">
          Chia sẻ kinh nghiệm và dẫn dắt thế hệ sinh viên tiếp theo của UEL.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[1.5px]">Lĩnh vực chuyên môn</label>
            <select className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-uel-blue/10 focus:border-uel-blue outline-none text-sm font-bold bg-slate-50/50">
              <option>Quản trị chuỗi cung ứng</option>
              <option>Phân tích dữ liệu (Data Analyst)</option>
              <option>Phát triển phần mềm (Software Developer)</option>
              <option>Phân tích nghiệp vụ (Business Analyst)</option>
              <option>Marketing & Truyền thông</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[1.5px]">Số lượng Mentee tối đa</label>
            <input type="number" min="1" max="5" defaultValue="3" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-uel-blue/10 focus:border-uel-blue outline-none text-sm font-bold bg-slate-50/50" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-[1.5px]">Tại sao bạn muốn trở thành Mentor?</label>
          <textarea rows={4} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-uel-blue/10 focus:border-uel-blue outline-none text-sm font-medium bg-slate-50/50 resize-none" placeholder="Chia sẻ tâm huyết và mong muốn của bạn..."></textarea>
        </div>

        <div className="bg-uel-blue/5 p-5 rounded-2xl flex gap-4 items-start border border-uel-blue/10">
          <AlertCircle size={20} className="text-uel-blue mt-0.5" />
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            Bằng cách gửi đơn, bạn đang đăng ký cho đợt Mentorship <strong>{nextSeason?.name}</strong> (bắt đầu từ {nextSeason?.start_date ? new Date(nextSeason.start_date).toLocaleDateString('vi-VN') : 'Sắp tới'}). Dữ liệu sẽ được ban quản trị xét duyệt.
          </p>
        </div>

        <button type="submit" className="w-full bg-uel-blue text-white font-black py-4 rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-uel-blue/20 text-xs uppercase tracking-widest">
          GỬI ĐƠN ĐĂNG KÝ
        </button>
      </form>
    </div>
  );
}
