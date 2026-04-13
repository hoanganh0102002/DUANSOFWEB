'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Sparkles, Rocket, ShieldCheck, Zap } from 'lucide-react';

const slides = [
  { src: '/hinhanh/what-is-erp.jpg', alt: 'Hệ thống quản trị ERP', title: "Quản Trị Doanh Nghiệp" },
  { src: '/hinhanh/what-is-hrm.png', alt: 'Hệ thống quản lý nhân sự HRM', title: "Quản Lý Nhân Sự" },
  { src: '/hinhanh/what-is-crm.jpg', alt: 'Giải pháp khách hàng CRM', title: "Chăm Sóc Khách Hàng" },
  { src: '/hinhanh/what-is-pos.png', alt: 'Hệ thống bán hàng POS', title: "Bán Hàng Thông Minh" },
  { src: '/hinhanh/what-is-sof.png', alt: 'Giải pháp giải quyết vấn đề SOF', title: "Hệ Sinh Thái SOF" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <main className="relative overflow-hidden pt-12">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-[30%] h-[30%] bg-red-400/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* LEFT COLUMN: TEXT */}
        <div className={`flex-1 space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xl border border-blue-50 text-[#1e619d] text-xs font-black uppercase tracking-widest animate-bounce">
             <Sparkles className="w-4 h-4 text-red-500" /> Giải Pháp Công Nghệ Toàn Diện
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#0f426c] leading-[1.15] mb-8">
             Nâng Tầm <br />
             <span className="relative inline-block py-1">
               <span className="relative z-10 text-[#ef4444]">Tiềm Năng</span>
               {/* Refined Marker Highlight */}
               <div className="absolute bottom-1 left-0 w-full h-3 bg-red-100/50 rounded-md -rotate-1 z-0 scale-x-105"></div>
             </span>
             <br />
             Doanh Nghiệp
          </h1>
          
          <p className="text-gray-500 text-lg lg:text-xl leading-relaxed max-w-xl font-medium">
             SOF chuyên cung cấp giải pháp <span className="text-blue-600 font-bold">Phần mềm (ERP, HRM, CRM)</span> & <span className="text-red-500 font-bold">Phần cứng</span> tích hợp AI, kiến tạo hạ tầng vững chắc cho bước tiến nhảy vọt của bạn.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
             <Link href="/contact" className="group relative px-10 py-5 bg-[#144773] rounded-3xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(20,71,115,0.3)] hover:scale-105 active:scale-95 transition-all overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Tư vấn miễn phí <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </Link>
             
             <button className="px-10 py-5 rounded-3xl bg-white border border-gray-100 text-[#144773] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gray-200/40 hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2">
                Xem giải pháp <ChevronRight className="w-5 h-5" />
             </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 flex items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> <span className="text-[10px] font-black uppercase tracking-widest">Bảo Mật Tối Tân</span>
             </div>
             <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" /> <span className="text-[10px] font-black uppercase tracking-widest">Hiệu Suất Vượt Trội</span>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SLIDER */}
        <div className={`flex-1 w-full relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          {/* Decorative Frame */}
          <div className="relative group">
             <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-red-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
             
             <div className="relative bg-white p-3 lg:p-4 rounded-[3rem] shadow-2xl border border-white/50 backdrop-blur-xl overflow-hidden aspect-[4/3]">
                {/* Images */}
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 p-4 transition-all duration-1000 ease-in-out ${index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
                  >
                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover transition-transform duration-[5s] hover:scale-110"
                        priority={index === 0}
                      />
                      {/* Overlay Title */}
                      <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 text-white translate-y-20 opacity-0 transition-all duration-700 delay-300" style={{ transform: index === current ? 'translateY(0)' : 'translateY(80px)', opacity: index === current ? 1 : 0 }}>
                         <p className="text-[10px] uppercase font-black tracking-widest text-white/70">Giải Pháp</p>
                         <h3 className="text-xl font-black">{slide.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation */}
                <div className="absolute bottom-10 right-10 flex gap-2 z-20">
                   <button onClick={prev} className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-[#144773] hover:bg-blue-600 hover:text-white transition-all active:scale-90">
                      <ChevronLeft className="w-6 h-6" />
                   </button>
                   <button onClick={next} className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-[#144773] hover:bg-blue-600 hover:text-white transition-all active:scale-90">
                      <ChevronRight className="w-6 h-6" />
                   </button>
                </div>
             </div>
          </div>

          {/* Floating Stats Badge */}
          <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white p-6 rounded-[2rem] shadow-2xl border border-blue-50 anim-float z-30 hidden sm:block">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                   <Rocket className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-3xl font-black text-[#1e619d]">2011</p>
                   <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Từ năm thành lập</p>
                </div>
             </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .anim-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}