'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header'; 
import Footer from '@/components/FooterNextjs'; 
import BackgroundDecor from '@/components/BackgroundDecor';
import { 
  Network, Share2, Server, Globe2, ShieldCheck, 
  TrendingUp, BarChart3, Target, MessageSquare, 
  Cpu, ScanFace, Printer, MonitorSmartphone, Zap, CheckCircle2,
  ShoppingBag, Coffee, Car, Building, Utensils
} from 'lucide-react';

export default function SoftwarePage() {
  return (
    <div className="min-h-screen font-sans overflow-hidden relative" style={{ background: '#f8fbff' }}>
      {/* 1. BACKGROUND SVG ĐỒNG BỘ TRANG CHỦ */}
      <BackgroundDecor />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HEADER */}
        <Header />

      {/* --- INJECT CUSTOM KEYFRAME ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes customFloatReverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes customPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .anim-float { animation: customFloat 6s ease-in-out infinite; }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left { animation: scroll-left 50s linear infinite; }
        .animate-scroll-right { animation: scroll-right 50s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}} />

      <main className="flex-grow">
        
        {/* HERO TITLE SECTION */}
        <section className="pt-24 pb-16 text-center px-4 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto relative z-10" data-aos="fade-down" data-aos-duration="1000">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white shadow-md border border-blue-100 text-[#1e619d] font-bold text-xs tracking-widest uppercase mb-6 hover:shadow-lg transition-transform hover:-translate-y-1 cursor-default">
              Hệ Sinh Thái Toàn Diện
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-[#1e619d] leading-tight mb-6">
              Giải pháp Công nghệ <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600/80 to-teal-400 animate-pulse">Kết nối tương lai</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-0" data-aos="fade-up" data-aos-delay="200">
              Từ phần mềm quy mô lớn, thiết bị thông minh đến trí tuệ nhân tạo và tiếp thị kỹ thuật số. 
              SOF mang đến bộ công cụ hoàn hảo giúp doanh nghiệp của bạn vượt qua mọi giới hạn.
            </p>
          </div>
        </section>

        {/* --- SOFTWARE STATS SECTION (Đồng bộ Trang Chủ) --- */}
        <section className="w-full flex justify-center px-4 lg:px-8 relative z-20 -mt-8 mb-12">
          <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(30,58,138,0.08)] py-10 px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-blue-50 border border-white/50" data-aos="fade-up">
            <div className="text-center p-4">
              <div className="text-[38px] font-black text-[#1e619d] mb-1 leading-none">14+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Phân hệ nghiệp vụ</div>
            </div>
            <div className="text-center p-4">
              <div className="text-[38px] font-black text-[#1e619d] mb-1 leading-none">100%</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Dữ liệu bảo mật</div>
            </div>
            <div className="text-center p-4">
              <div className="text-[38px] font-black text-[#1e619d] mb-1 leading-none">99.9%</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Thời gian hoạt động</div>
            </div>
            <div className="text-center p-4">
              <div className="text-[38px] font-black text-[#1e619d] mb-1 leading-none">0.5s</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Tốc độ xử lý AI</div>
            </div>
          </div>
        </section>


        {/* === SECTION 1: QUẢN LÝ ĐA CHI NHÁNH === */}
        <section className="py-12 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6" data-aos="fade-right" data-aos-duration="1000">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-100/50 hover:scale-110 transition-transform">
                <Network className="w-8 h-8" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-[#1e619d] leading-tight">
                Phần Mềm Quản Lý <br/><span className="text-[#3087fe]">Đa Chi Nhánh</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Đối với các phần mềm quản lý chuyên biệt như bán hàng, khách sạn, nhà hàng, quán cà phê, 
                bãi giữ xe, quán ăn và kho hàng, SOF cung cấp mô hình cấp phép đa chi nhánh linh hoạt, 
                được thiết kế dành cho các doanh nghiệp đang mở rộng. 
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-50 shadow-[0_20px_50px_rgba(30,58,138,0.05)] mt-8" data-aos="fade-up" data-aos-delay="200">
                <p className="font-bold text-[#0f426c] mb-6 text-lg">Lợi ích cho chuỗi cửa hàng & nhượng quyền:</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-gray-700 bg-gray-50 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><Server className="w-5 h-5 text-blue-500" /></div>
                    <span className="font-medium">Quản lý dữ liệu tập trung trên toàn hệ thống.</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-700 bg-gray-50 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><Zap className="w-5 h-5 text-blue-500" /></div>
                    <span className="font-medium">Đồng bộ theo thời gian thực giữa các địa điểm.</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-700 bg-gray-50 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><TrendingUp className="w-5 h-5 text-blue-500" /></div>
                    <span className="font-medium">Nâng cấp thuật toán dễ dàng theo nhu cầu.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Hình minh họa SỐNG ĐỘNG */}
            <div className="relative group perspective" data-aos="fade-left" data-aos-duration="1200">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-blue-100 transform rotate-6 rounded-[3rem] -z-10 anim-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop" 
                alt="Quản lý hệ thống mạng đa chi nhánh" 
                className="rounded-[3rem] w-full h-[600px] object-cover shadow-[0_30px_60px_rgba(30,58,138,0.25)] border-[8px] border-white/80 backdrop-blur-sm anim-float"
              />
              {/* Floating badges */}
              <div className="absolute -left-8 top-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 anim-float-reverse">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <span className="font-bold text-[#0f426c]">Server 1 Active</span>
              </div>
              <div className="absolute -right-8 bottom-32 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 anim-float">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                <span className="font-bold text-[#0f426c]">Branch Synced</span>
              </div>
            </div>
          </div>
        </section>


        {/* === SECTION 2: MARKETING BỔ TRỢ === */}
        <section className="py-16 px-6 lg:px-12 bg-[#0f426c] text-white relative overflow-hidden">
          {/* Background pattern sống động */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-500/20 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 anim-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-teal-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 anim-pulse" style={{animationDelay: '2s'}}></div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Hình minh họa (Bên Trái) */}
            <div className="order-2 lg:order-1 relative group" data-aos="zoom-in-right" data-aos-duration="1200">
              <div className="absolute inset-0 bg-blue-500/30 transform -rotate-6 rounded-[3rem] -z-10 anim-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop" 
                alt="Social Media Marketing Framework" 
                className="rounded-[3rem] w-full h-[600px] object-cover shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-[8px] border-white/10 anim-float-reverse backdrop-blur-sm"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-8" data-aos="fade-left" data-aos-duration="1000">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md text-blue-300 rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/20 hover:scale-110 transition-transform hover:rotate-12">
                <Share2 className="w-8 h-8" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Dịch Vụ Marketing <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Bổ Trợ</span>
              </h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                Để giúp doanh nghiệp của bạn thành công vượt ra ngoài phạm vi triển khai phần mềm, 
                SOF cung cấp các gói dịch vụ marketing trọn gói được thiết kế riêng cho các nền tảng mạng xã hội 
                như Facebook, TikTok và YouTube. 
              </p>
              
              <div className="grid gap-4" data-aos="fade-up" data-aos-delay="300">
                {[
                  { title: "Chiến dịch nhắm mục tiêu", desc: "Xây dựng bởi đội ngũ chuyên gia giàu kinh nghiệm.", icon: <Target className="w-6 h-6" />, delay: "300" },
                  { title: "Chuyển đổi doanh thu", desc: "Thúc đẩy bán hàng và duy trì khách hàng lâu dài.", icon: <ShieldCheck className="w-6 h-6" />, delay: "400" },
                  { title: "Gia tăng hiện diện", desc: "Thương hiệu nổi bật trên thị trường khốc liệt.", icon: <Globe2 className="w-6 h-6" />, delay: "500" }
                ].map((val, i) => (
                  <div key={i} data-aos="flip-up" data-aos-delay={val.delay} className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 transition-all hover:translate-x-2 cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {val.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg tracking-wide">{val.title}</h4>
                      <p className="text-sm text-blue-200">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* === SECTION GIỮA TRANG: CÁC PHÂN HỆ CHUYÊN BIỆT (TỔ ONG) === */}
        <section className="py-12 px-6 lg:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center mb-16" data-aos="fade-up">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-widest uppercase mb-4">Các Ngành Nghề Cốt Lõi</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e619d] leading-tight mb-4">
              Phân Hệ Phần Mềm <br />
              <span className="text-[#3087fe]">Chuyên Biệt</span>
            </h2>
          </div>

          {/* --- INFINITE MARQUEE CAROUSEL --- */}
          <div className="relative pb-16 z-10 w-full max-w-[100vw] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            
            <div data-aos="zoom-in" data-aos-duration="1200" className="flex flex-col gap-6 w-full">
              {(() => {
                const softwareList = [
                  { title: "Quán Ăn", desc: "Order tại bàn, in bill bếp, doanh thu thời gian thực.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094620.png" },
                  { title: "Quán Cafe", desc: "Pha chế chuẩn hóa, quản lý kho nguyên liệu tự động.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094652.png" },
                  { title: "Khách Sạn", desc: "Quản lý phòng, Check-in/out, tích hợp khóa thẻ từ.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094706.png" },
                  { title: "Nhà Hàng", desc: "Sơ đồ bàn ảo, định lượng món, báo cáo bếp thực tế.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094719.png" },
                  { title: "Giữ Xe", desc: "Nhận diện biển số AI, barie tự động, bảo mật 2 lớp.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094734.png" },
                  { title: "Sửa Chữa", desc: "Quản lý phụ tùng, lệnh sửa chữa, công nhật kỹ thuật.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094922.png" },
                  { title: "Bán Hàng", desc: "Quản lý sỉ/lẻ, tồn kho thông minh, quét mã vạch nhanh.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094757.png" },
                  { title: "Kho Hệ Thống", desc: "Luân chuyển đa kho, cảnh báo tồn, kiểm kê siêu tốc.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094850.png" },
                  { title: "Vận Tải", desc: "Lịch trình xe, chi phí dầu nhớt, quản lý đội tài xế.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094910.png" },
                  { title: "Trả Thưởng", desc: "Tự động tính hoa hồng, chiết khấu mạng lưới đại lý.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 095003.png" },
                  { title: "Nhân Sự", desc: "Chấm công khuôn mặt, bảng lương tự động, quản lý KPI.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094932.png" },
                  { title: "ERP", desc: "Quản trị tổng thể, liên kết dữ liệu mọi phòng ban.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094952.png" },
                  { title: "Thiết Bị Kho", desc: "Tích hợp PDA cầm tay, quét barcode kiểm kho di động.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094833.png" },
                  { title: "Chuỗi Cửa Hàng", desc: "Quản lý nhượng quyền, dữ liệu Cloud tập trung 24/7.", img: "/hinhanh/hinhphanmem/Screenshot 2026-04-08 094620.png" }
                ];
                
                const row1 = softwareList.slice(0, 7);
                const row2 = softwareList.slice(7, 14);

                const renderTrack = (items: any[], direction: 'left' | 'right') => (
                  <div className="relative flex w-full overflow-hidden shrink-0 group">
                    {/* Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
                    
                    <div className={`flex w-max marquee-track ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
                      {[...items, ...items].map((item, idx) => (
                        <div key={idx} className="w-[300px] md:w-[360px] shrink-0 px-3 py-4">
                          <div className="bg-white rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.04)] border border-blue-50 cursor-pointer hover:shadow-[0_30px_60px_rgba(48,135,254,0.15)] hover:-translate-y-3 transition-all duration-300 group/card flex flex-col h-[320px] md:h-[350px]">
                            
                            {/* Image Container */}
                            <div className="relative bg-gradient-to-br from-blue-50/50 to-[#f8fbff] rounded-t-[2rem] flex items-center justify-center p-4 h-[180px] md:h-[220px] w-full overflow-hidden">
                              <div className="absolute inset-0 bg-blue-500/0 group-hover/card:bg-blue-500/5 transition-colors duration-300"></div>
                              <img 
                                src={item.img} 
                                alt={item.title} 
                                className="h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] group-hover/card:scale-110 group-hover/card:-translate-y-2 transition-transform duration-500 z-10" 
                              />
                            </div>
                            
                            {/* Content Container */}
                            <div className="p-6 md:p-8 flex flex-col items-center mt-auto bg-white rounded-b-[2rem]">
                              <h3 className="text-[#0f426c] font-black text-lg md:text-xl text-center leading-tight mb-2 group-hover/card:text-[#3087fe] transition-colors">{item.title}</h3>
                              <p className="text-sm text-gray-500 text-center line-clamp-2 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

                return (
                  <div className="w-full relative mt-8 flex flex-col gap-2">
                    {renderTrack(row1, 'left')}
                    {renderTrack(row2, 'right')}
                  </div>
                );
              })()}
            </div>
          </div>
          {/* END INFINITE MARQUEE */}
        </section>


        {/* === SECTION 3: TƯƠNG THÍCH PHẦN CỨNG === */}
        <section className="py-12 px-6 lg:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8" data-aos="fade-right" data-aos-duration="1000">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100/50 to-red-50/50 backdrop-blur-md text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl hover:rotate-12 transition-transform">
                <MonitorSmartphone className="w-8 h-8" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e619d] leading-tight">
                Đồng Bộ Tuyệt Đối <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-400">Tương Thích Phần Cứng</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Tất cả phần cứng của SOF (máy POS, máy in hóa đơn, cân điện tử, máy quét mã vạch) đều được thiết kế với độ tương thích cực cao với hệ sinh thái phần mềm.
              </p>
              
              <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-[0_20px_50px_rgba(249,115,22,0.05)] flex items-start gap-6 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)] transition-shadow" data-aos="fade-up" data-aos-delay="200">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex shrink-0 items-center justify-center anim-pulse">
                  <Printer className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0f426c] mb-2">Plug & Play Thông Minh</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Đảm bảo thiết lập tức thì, đồng bộ dữ liệu theo thời gian thực mà không gián đoạn, 
                    giảm thiểu hoàn toàn các vấn đề xung đột phần cứng.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hình minh họa sống động */}
            <div className="relative group" data-aos="zoom-in-left" data-aos-duration="1200">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-100 transform rotate-6 rounded-[3rem] -z-10 anim-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop" 
                alt="POS Hardware Compatibility" 
                className="rounded-[3rem] w-full h-[550px] object-cover shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[8px] border-white anim-float"
              />
              <div className="absolute -left-6 bottom-10 bg-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 anim-float-reverse">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Trạng thái</p>
                  <p className="font-bold text-[#0f426c]">Đồng bộ thành công</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* === SECTION 4: AI ROADMAP === */}
        <section className="py-16 px-6 lg:px-12 bg-[#0a2342] text-white overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none anim-pulse"></div>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* Hình bên trái */}
            <div className="order-2 lg:order-1 relative group" data-aos="fade-right" data-aos-duration="1200">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1332&auto=format&fit=crop" 
                alt="AI Chatbot Roadmap" 
                className="rounded-[3rem] w-full h-[600px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 anim-float"
              />
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay rounded-[3rem]"></div>
            </div>

            <div className="order-1 lg:order-2 space-y-8" data-aos="fade-left" data-aos-duration="1000">
              <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-blue-400/30">
                <Cpu className="w-8 h-8 animate-pulse" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Tương Lai Trí Tuệ <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Lộ Trình Tích Hợp AI</span>
              </h2>
              <p className="text-blue-100 leading-relaxed text-lg">
                SOF đang đẩy mạnh tích hợp trí tuệ nhân tạo Generative AI vào toàn bộ hệ thống trong năm 2026 nhằm mang đến những giải pháp giao tiếp thông minh hơn, tức thì và cá nhân hóa.
              </p>
              
              <div className="space-y-6 pt-4" data-aos="fade-up" data-aos-delay="200">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:translate-x-3 cursor-pointer group backdrop-blur-md">
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" /> 
                    Chatbot Giao Tiếp Nâng Cao
                  </h4>
                  <p className="text-blue-200/80 leading-relaxed">
                    Hỗ trợ khách hàng bên ngoài siêu tốc 24/7, cung cấp phản hồi thông minh dựa trên ngữ cảnh thực tế của dữ liệu.
                  </p>
                </div>
                
                <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 transition-all hover:translate-x-3 cursor-pointer group backdrop-blur-md">
                  <h4 className="text-xl font-bold text-blue-200 mb-3 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" /> 
                    Trò Chuyện Nội Bộ Bảo Mật
                  </h4>
                  <p className="text-blue-200/80 leading-relaxed">
                    Giữ toàn bộ hội thoại nội bộ trên private cloud, ngăn ngừa tuyệt đối rò rỉ thông tin nhạy cảm của doanh nghiệp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* === SECTION 5: IOT SOLUTIONS === */}
        <section className="py-16 px-6 lg:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8" data-aos="fade-right" data-aos-duration="1000">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-teal-500/30 hover:scale-110 transition-transform">
                <ScanFace className="w-8 h-8" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1e619d] leading-tight">
                Vận Hành Tự Động Hóa <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Hệ Sinh Thái IoT</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Sức mạnh vượt trội trong lĩnh vực AIoT (AI + Internet of Things) phục vụ chấm công, kiểm soát bảo mật và bãi gửi xe thông minh.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex gap-6 items-start p-5 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-teal-100" data-aos="fade-up" data-aos-delay="200">
                  <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 shadow-inner">
                    <Target className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f426c] text-xl mb-2">Chấm công nhận diện khuôn mặt</h4>
                    <p className="text-gray-500 text-base leading-relaxed">Đồng bộ trực tiếp với mô-đun HRM thông qua API, điểm danh thần tốc dưới 0.5 giây cho 1 nhân sự.</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start p-5 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-teal-100" data-aos="fade-up" data-aos-delay="300">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
                    <MonitorSmartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f426c] text-xl mb-2">Quản lý Bãi xe AI Thông Minh</h4>
                    <p className="text-gray-500 text-base leading-relaxed">Camera AI đọc hình ảnh khuôn mặt & biển số xe tự động mở Barie cổng chớp nhoáng, an toàn 100%.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hình minh họa */}
            <div className="relative group" data-aos="zoom-in-up" data-aos-duration="1200">
              <div className="absolute inset-0 bg-gradient-to-bl from-teal-200 to-emerald-100 transform rotate-6 rounded-[3rem] -z-10 anim-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1460&auto=format&fit=crop" 
                alt="AI Facial Recognition and IOT Camera" 
                className="rounded-[3rem] w-full h-[600px] object-cover shadow-[0_30px_60px_rgba(0,128,128,0.2)] border-[8px] border-white anim-float-reverse"
              />
              <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl flex items-center justify-center shrink-0 anim-pulse border border-teal-100">
                <ScanFace className="w-8 h-8 text-teal-600" />
              </div>
            </div>
          </div>
        </section>

      </main>

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