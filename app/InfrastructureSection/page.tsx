"use client";

import { 
  Server, 
  Cpu, 
  Bot, 
  Network, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  Database,
  CloudCog,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";

export default function InfrastructureSection() {
  const [activeTab, setActiveTab] = useState('server');

  return (
    <div className="min-h-screen font-sans overflow-clip relative" style={{ background: '#f8fbff' }}>
      {/* 1. BACKGROUND DECOR ĐỒNG BỘ */}
      <BackgroundDecor />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes customFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .anim-float { animation: customFloat 6s ease-in-out infinite; }
        .glass-premium { 
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 20px 50px rgba(30, 58, 138, 0.05);
        }
        .text-gradient-sof {
          background: linear-gradient(135deg, #1e619d 0%, #3087fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />

      <Header />

      <div className="relative z-10 pt-24 pb-12 text-[#0a192f]">
        {/* --- HERO SECTION --- */}
        <section className="px-4 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white shadow-md border border-blue-100" data-aos="fade-down">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#1e619d]">
              Hạ Tầng Và Dịch Vụ Thông Minh
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black leading-tight text-[#1e619d]" data-aos="zoom-in">
            Nền Tảng <span className="text-gradient-sof">Vững Chắc</span> <br /> 
            Khởi Nguồn Sáng Tạo
          </h1>

          <p className="max-w-3xl text-gray-500 text-base lg:text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            SOF cung cấp hệ sinh thái hạ tầng mạnh mẽ kết hợp cùng trí tuệ nhân tạo AI hiện đại, 
            tạo nên giải pháp vận hành tối ưu cho doanh nghiệp thời đại số.
          </p>
          
          <div className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="400">
             <div className="p-8 rounded-[2rem] glass-premium hover:bg-white transition-all group border-b-8 border-orange-500/20 hover:border-orange-500 shadow-xl shadow-blue-900/5">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
                  <Server className="text-white w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-[#1e619d] mb-2">Hạ Tầng Server</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Server phân tán mạnh mẽ, bảo mật đa lớp, quản lý dữ liệu an toàn tuyệt đối.</p>
             </div>
             
             <div className="p-8 rounded-[2.5rem] glass-premium hover:bg-white transition-all group border-b-8 border-blue-500/20 hover:border-blue-500 shadow-xl shadow-blue-900/5">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                  <Bot className="text-white w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-[#1e619d] mb-2">Chatbot AI</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Trợ lý ảo thông minh, tự động hóa quy trình hỗ trợ khách hàng không giới hạn.</p>
             </div>

             <div className="p-8 rounded-[2.5rem] glass-premium hover:bg-white transition-all group border-b-8 border-teal-500/20 hover:border-teal-500 shadow-xl shadow-blue-900/5">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl flex items-center justify-center mb-5 shadow-lg shadow-teal-500/20 group-hover:rotate-6 transition-transform">
                  <CloudCog className="text-white w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-[#1e619d] mb-2">IoT Automation</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Hệ thống Camera thông minh và tự động hóa quy trình sản xuất di động.</p>
             </div>
          </div>
        </section>

        {/* --- DETAILED CONTENT --- */}
        <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-20">
          
          {/* Section Server */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8" data-aos="fade-right">
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest">SOF Infrastructure</div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#1e619d] leading-tight">
                Lưu Trữ Mạnh Mẽ <br /> 
                <span className="text-[#3087fe]">Nâng Tầm Doanh Nghiệp</span>
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></div>
              <p className="text-gray-500 text-[17px] leading-relaxed text-justify italic">
                "SOF cung cấp các máy chủ lưu trữ mạnh mẽ, đảm bảo tốc độ, độ tin cậy và quản lý dữ liệu an toàn cho doanh nghiệp ở mọi quy mô. Được xây dựng với khả năng mở rộng, chúng đóng vai trò nền tảng cho hoạt động liền mạch và sự phát triển số."
              </p>
              <div className="grid grid-cols-2 gap-y-4">
                {['Bảo mật đa tầng', 'Tốc độ truy xuất', 'Hạ tầng dự phòng', 'Khả năng mở rộng'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 font-bold text-[#1e619d]/80">
                    <CheckCircle2 className="w-5 h-5 text-orange-500" /> {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative group" data-aos="fade-left">
              <div className="absolute inset-0 bg-blue-500/10 rounded-[3rem] blur-[100px] opacity-60"></div>
              <div className="relative rounded-[4rem] overflow-hidden bg-white p-3 shadow-2xl border border-white/80 group-hover:-translate-y-4 transition-all duration-700 ease-out">
                <img 
                  src="/hinhanh/infrastructure/server.png" 
                  alt="Hệ thống máy chủ SOF" 
                  className="w-full h-full object-cover rounded-[3rem] shadow-inner group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>

          {/* Section AI */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-8" data-aos="fade-left">
               <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest">Smart Services</div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#1e619d] leading-tight">
                Chatbot AI <br /> 
                <span className="text-[#3087fe]">Trợ Lý Thông Minh</span>
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              <p className="text-gray-500 text-[17px] leading-relaxed text-justify italic">
                "Tích hợp trực tiếp trong hệ sinh thái phần mềm, chatbot AI hoạt động như những trợ lý thông minh - tự động hóa tương tác khách hàng, tối ưu quy trình làm việc và cung cấp hỗ trợ theo thời gian thực."
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white hover:bg-white transition-all shadow-blue-900/5 shadow-sm">
                   <h4 className="font-black text-[#1e619d] mb-1">Tự động hóa toàn diện</h4>
                   <p className="text-sm text-gray-400">Giảm tải công việc cho nhân viên, phản hồi khách hàng ngay lập tức.</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/40 backdrop-blur-md border border-white hover:bg-white transition-all shadow-blue-900/5 shadow-sm">
                   <h4 className="font-black text-[#1e619d] mb-1">Học hỏi & Thích ứng</h4>
                   <p className="text-sm text-gray-400">Khả năng tự học từ dữ liệu khách hàng để ngày càng thông minh hơn.</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative group" data-aos="fade-right">
              <div className="absolute inset-0 bg-teal-500/10 rounded-[3rem] blur-[100px] opacity-60"></div>
              <div className="relative rounded-[4rem] overflow-hidden bg-white p-3 shadow-2xl border border-white/80 group-hover:-translate-y-4 transition-all duration-700 ease-out anim-float">
                <img 
                  src="/hinhanh/infrastructure/ai.png" 
                  alt="AI Technology Inteligence" 
                  className="w-full h-full object-cover rounded-[3rem] shadow-inner group-hover:scale-110 transition-transform duration-1000 font-black"
                />
              </div>
            </div>
          </div>

        </section>

        {/* --- CALL TO ACTION --- */}
        <section className="py-24 px-4 lg:px-8 max-w-7xl mx-auto" data-aos="zoom-in">
          <div className="bg-[#1e619d] rounded-[4rem] p-12 lg:p-20 text-white text-center relative overflow-hidden shadow-[0_40px_100px_rgba(30,97,157,0.3)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-6xl font-black leading-tight">
                Vận Hành <span className="text-blue-300 italic">Thống Nhất</span> <br /> & Tối Ưu Chi Phí
              </h2>
              <p className="text-blue-100 text-lg opacity-80 italic">
                "Máy chủ mạnh mẽ và chatbot AI thông minh của SOF tạo nên một môi trường thống nhất, 
                giúp doanh nghiệp vận hành nhanh hơn, thông minh hơn."
              </p>
              <div className="pt-4">
                <Link href="/contact" className="inline-block px-12 py-5 rounded-full bg-white text-[#1e619d] font-black shadow-2xl hover:scale-105 hover:bg-blue-50 transition-all duration-300 uppercase tracking-widest text-sm">
                  Tư vấn giải pháp ngay
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- BACK TO HOME --- */}
        <div className="py-12 flex justify-center" data-aos="fade-up">
           <Link href="/" className="group flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-blue-200 text-[#1e619d] font-black shadow-xl hover:bg-[#1e619d] hover:text-white transition-all duration-500 uppercase tracking-widest text-xs">
              <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại trang chủ
           </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
