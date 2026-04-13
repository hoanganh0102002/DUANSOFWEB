"use client";

import { 
  Target, 
  TrendingUp, 
  Globe, 
  Megaphone, 
  Search, 
  BarChart3, 
  Share2, 
  Rocket,
  CheckCircle2,
  Users,
  MessageSquare,
  Zap,
  PlayCircle,
  Video,
  Layout,
  Globe2,
  Camera
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";

export default function MarketingSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-hidden relative" style={{ background: '#f8fbff' }}>
      <BackgroundDecor />
      
      {/* Mesh Gradients Moving in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-400/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[100px] animate-bounce" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-purple-400/5 rounded-full blur-[150px]"></div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .anim-float { animation: float 6s ease-in-out infinite; }
        .glass-premium {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
        }
        .shimmer-bg {
          position: relative;
          overflow: hidden;
        }
        .shimmer-bg::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }
        .text-gradient-marketing {
          background: linear-gradient(135deg, #ff1e56 0%, #ffac41 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <Header />

      <div className={`relative z-10 pt-24 pb-12 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* --- HERO SECTION --- */}
        <section className="px-4 lg:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10" data-aos="fade-right">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-xl border border-red-100/50">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
                Marketing Intelligence Solution
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] text-[#1e619d]">
              Chinh Phục <br /> 
              <span className="text-gradient-marketing italic">Mọi Nền Tảng</span>
            </h1>

            <p className="max-w-xl text-gray-500 text-[19px] leading-relaxed font-medium">
              SOF không chỉ cung cấp phần mềm, chúng tôi mang tới "đòn bẩy" marketing đa kênh 
              tối ưu nhất cho Facebook, TikTok và YouTube để doanh nghiệp vươn tầm cao mới.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
               {[
                 { icon: Search, title: "SEO Top Bền Vững", color: "blue", bg: "bg-blue-50" },
                 { icon: Megaphone, title: "Quảng Cáo Viral", color: "red", bg: "bg-red-50" },
                 { icon: Camera, title: "Content Sáng Tạo", color: "purple", bg: "bg-purple-50" },
                 { icon: BarChart3, title: "Tăng Trưởng Doanh Thu", color: "teal", bg: "bg-teal-50" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl glass-premium hover:bg-white transition-all duration-500 group cursor-pointer shadow-lg shadow-gray-200/20">
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-6 h-6 text-[#1e619d]" />
                    </div>
                    <span className="font-bold text-[#1e619d] text-sm">{item.title}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Dynamic Social Visual */}
          <div className="relative" data-aos="zoom-in">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-[150px] animate-pulse"></div>
            
            <div className="relative z-10 p-12 lg:p-20">
               {/* Main Logo Container */}
               <div className="relative w-full aspect-square max-w-[500px] mx-auto anim-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-400 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(220,38,38,0.5)] flex items-center justify-center overflow-hidden group">
                     {/* Floating Particles in background */}
                     <div className="absolute inset-0 opacity-20">
                       <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse"></div>
                       <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-bounce"></div>
                     </div>
                     
                     <span className="text-[100px] lg:text-[140px] font-black text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] select-none tracking-tighter">SOF</span>
                     
                     {/* Interactive overlay */}
                     <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <Zap className="w-20 h-20 text-white animate-bounce" />
                     </div>
                  </div>


                  <div className="absolute top-1/2 -right-8 -translate-y-1/2 p-4 rounded-3xl bg-teal-500 text-white shadow-2xl anim-float" style={{ animationDelay: '1.5s' }}>
                     <TrendingUp className="w-8 h-8" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- PERFORMANCE SECTION --- */}
        <section className="py-24 px-4 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
             <div className="lg:col-span-1 space-y-6" data-aos="fade-up">
                <h2 className="text-4xl font-black text-[#1e619d] leading-tight">Chỉ Số <span className="text-red-500 italic underline decoration-wavy underline-offset-8">Ấn Tượng</span></h2>
                <p className="text-gray-500 text-lg">Chúng tôi không nói suông, chúng tôi chứng minh bằng con số thực tế qua từng chiến dịch.</p>
             </div>

             <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { label: "Reach", value: "25M+", sub: "Annual impressions", icon: Users },
                  { label: "Conversion", value: "4.8%", sub: "Average CTR", icon: Rocket },
                  { label: "Active Brands", value: "300+", sub: "Trusted partners", icon: CheckCircle2 },
                  { label: "Social Growth", value: "220%", sub: "Monthly increase", icon: TrendingUp }
                ].map((stat, i) => (
                  <div key={i} className="p-8 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/10 hover:border-red-100 transition-all group overflow-hidden relative" data-aos="fade-up" data-aos-delay={i*100}>
                     <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
                     <stat.icon className="w-10 h-10 text-red-500 mb-6 relative z-10" />
                     <div className="text-5xl font-black text-[#1e619d] mb-2 relative z-10">{stat.value}</div>
                     <div className="text-sm font-black text-gray-400 uppercase tracking-widest relative z-10">{stat.label}</div>
                     <p className="text-xs text-gray-300 mt-2 relative z-10">{stat.sub}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* --- PLATFORMS SECTION --- */}
        <section className="py-20 px-4 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-[#0a192f] rounded-[4rem] p-12 lg:p-20 relative overflow-hidden text-center text-white">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[100px]"></div>
             <div className="relative z-10 space-y-12">
                <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.3em]">Hệ Sinh Thái Đa Kênh</div>
                <h2 className="text-4xl lg:text-6xl font-black">Làm Chủ <span className="text-red-500">Mọi Cuộc Chơi</span></h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                   {['Facebook Marketing', 'TikTok Viral Ads', 'Youtube Content', 'Google SEO Top'].map((p, i) => (
                     <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-crosshair">
                        <span className="text-lg font-black">{p}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* --- BACK TO HOME --- */}
        <div className="py-12 flex justify-center" data-aos="fade-up">
           <Link href="/" className="group flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-red-200 text-red-500 font-black shadow-xl hover:bg-red-500 hover:text-white transition-all duration-500 uppercase tracking-widest text-xs">
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
