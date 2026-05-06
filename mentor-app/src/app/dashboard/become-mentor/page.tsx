'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, BookOpen, Send, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function BecomeMentorPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Đơn đăng ký đã được gửi!</h2>
          <p className="text-slate-500 font-medium">Cảm ơn bạn đã quan tâm đến chương trình Mentor của UEL. Ban điều hành sẽ xem xét hồ sơ và liên hệ với bạn qua email trong vòng 3-5 ngày làm việc.</p>
        </div>
        <Link href="/dashboard" className="inline-block py-4 px-10 bg-uel-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-uel-blue/20 hover:scale-105 transition-all">
          QUAY LẠI TRANG CHỦ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-uel-orange/10 text-uel-orange rounded-full"
        >
          <ShieldCheck size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Chương trình Mentor UEL 2026</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
          Trở thành người dẫn dắt <br />
          <span className="text-uel-blue">Thế hệ đàn em</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Đóng góp kinh nghiệm của bạn để giúp sinh viên UEL định hướng nghề nghiệp và phát triển bản thân tốt hơn.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Why become a mentor */}
        <div className="lg:col-span-1 space-y-8">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-uel-orange pl-4">Tại sao nên tham gia?</h3>
          <div className="space-y-6">
            <BenefitCard 
              icon={Award} 
              title="Khẳng định uy tín" 
              desc="Được công nhận là Mentor chính thức của mạng lưới Alumni UEL." 
            />
            <BenefitCard 
              icon={Users} 
              title="Mở rộng Network" 
              desc="Kết nối với các cựu sinh viên thành đạt khác trong cộng đồng." 
            />
            <BenefitCard 
              icon={BookOpen} 
              title="Phát triển kỹ năng" 
              desc="Rèn luyện kỹ năng lãnh đạo, quản lý và truyền đạt kiến thức." 
            />
          </div>
        </div>

        {/* Right: Registration Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lĩnh vực chuyên môn</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" required>
                    <option value="">-- Chọn lĩnh vực --</option>
                    <option value="it">Công nghệ thông tin</option>
                    <option value="marketing">Marketing & Sales</option>
                    <option value="finance">Tài chính - Ngân hàng</option>
                    <option value="logistics">Logistics & Supply Chain</option>
                    <option value="hr">Quản trị nhân sự</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số năm kinh nghiệm</label>
                  <input type="number" min="1" placeholder="Ví dụ: 5" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vị trí hiện tại & Công ty</label>
                <input type="text" placeholder="Senior Analyst tại KPMG..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" required />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tại sao bạn muốn trở thành Mentor?</label>
                <textarea rows={4} placeholder="Chia sẻ tâm huyết và mong muốn của bạn..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" required></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Link LinkedIn (Không bắt buộc)</label>
                <input type="url" placeholder="https://linkedin.com/in/..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-uel-blue transition-all" />
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <input type="checkbox" className="mt-1" required id="agree" />
                <label htmlFor="agree" className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase">Tôi cam kết tuân thủ các quy định và đạo đức nghề nghiệp của chương trình Mentor Alumni UEL.</label>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-uel-blue text-white rounded-[24px] font-black text-xs uppercase tracking-[2px] shadow-2xl shadow-uel-blue/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                GỬI ĐƠN ĐĂNG KÝ <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
      <div className="w-12 h-12 bg-uel-blue/5 rounded-xl flex items-center justify-center text-uel-blue group-hover:bg-uel-blue group-hover:text-white transition-all shrink-0">
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-900 leading-tight">{title}</h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
