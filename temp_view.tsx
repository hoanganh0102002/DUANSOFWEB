import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Download, CheckCircle2, ShieldCheck, Clock, Layers, Zap, 
  Activity, Filter, Server, PackageOpen, ChevronDown, ChevronUp, 
  Star, Rocket, Check, ArrowRight, ShieldAlert, MonitorSmartphone, Database, X, User, Mail, Phone, Send, MessageSquare
} from "lucide-react";
import { productService, getProductUrl } from "@/services/productService";
import { detectProductType, getCardData, getModalData } from "./data";

const formatProductName = (name: string) => {
  if (!name) return "";
  let n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  
  // Custom mapping for consistent naming
  if (n.includes("kho pallet")) return "Phần mềm quản lý Kho Pallet";
  if (n.includes("kho")) return "Phần mềm quản lý Kho";
  if (n.includes("cafe")) return "Phần mềm quản lý Cafe";
  if (n.includes("ban hang")) return "Phần mềm quản lý Bán hàng";
  if (n.includes("khach san")) return "Phần mềm quản lý Khách sạn";
  if (n.includes("nha hang")) return "Phần mềm quản lý Nhà hàng";
  if (n.includes("giu xe mobile")) return "Phần mềm quản lý Giữ xe Mobile";
  if (n.includes("bai xe") || n.includes("giu xe")) return "Phần mềm quản lý Bãi xe";
  if (n.includes("erp")) return "Phần mềm quản lý ERP";
  if (n.includes("nhan su")) return "Phần mềm quản lý Nhân sự";
  if (n.includes("van tai")) return "Phần mềm quản lý Vận tải";
  if (n.includes("quan an")) return "Phần mềm quản lý Quán ăn";
  if (n.includes("bao hanh")) return "Phần mềm quản lý Bảo hành";
  if (n.includes("tra thuong") || n.includes("mat troi")) return "Phần mềm quản lý Trả thưởng Hệ Mặt Trời";

  // Fallback pattern
  let low = name.toLowerCase();
  let clean = low.replace(/\bphan mem quan ly\b/gi, "")
                 .replace(/\bphan mem\b/gi, "")
                 .replace(/\bquan ly\b/gi, "")
                 .replace(/\bgiai phap\b/gi, "")
                 .replace(/\bhe thong\b/gi, "")
                 .trim();
  
  let capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
  return `Phần mềm quản lý ${capitalized}`;
};

const getProductImage = (name: string) => {
  const normalizedMatch = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  
  if (normalizedMatch.includes("ban hang")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png";
  if (normalizedMatch.includes("bao hanh")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094922.png";
  if (normalizedMatch.includes("cafe")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094652.png";
  if (normalizedMatch.includes("bai xe") || normalizedMatch.includes("giu xe")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094734.png";
  if (normalizedMatch.includes("khach san")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094706.png";
  if (normalizedMatch.includes("kho pallet")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094850.png";
  if (normalizedMatch.includes("quan an")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094620.png";
  if (normalizedMatch.includes("quan ly kho") || normalizedMatch === "kho") return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094833.png";
  if (normalizedMatch.includes("van tai")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094910.png";
  if (normalizedMatch.includes("nha hang")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094719.png";
  if (normalizedMatch.includes("nhan su")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094932.png";
  if (normalizedMatch.includes("erp")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094952.png";
  if (normalizedMatch.includes("mat troi")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20095003.png";
  
  return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png";
};

export function HeroSection({ productName }: { productName: string }) {
  const productImg = getProductImage(productName);

  return (
    <section className="relative w-full bg-[#144773] pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#3087fe]/10 rounded-l-[100px] blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-sm">
            <ShieldAlert className="w-4 h-4 text-orange-400" /> Sản phẩm tiêu chuẩn SOF
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-black leading-[1.2] tracking-tight text-white drop-shadow-md">
            {productName.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </h1>
          
          <p className="text-blue-100/90 text-lg max-w-xl leading-relaxed">
            Giải pháp toàn diện giúp tự động hóa quy trình nghiệp vụ, kiểm soát dữ liệu chính xác và theo dõi doanh thu trực quan, tối ưu hóa lợi nhuận.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/contact" className="bg-white text-[#144773] px-8 py-3.5 rounded-xl font-bold shadow-[0_10px_40px_rgba(255,255,255,0.15)] hover:bg-gray-50 hover:-translate-y-1 transition-all text-sm uppercase tracking-wide flex items-center gap-2">
              <Download className="w-5 h-5" /> Dùng thử miễn phí
            </Link>
            <button className="bg-transparent text-white border border-white/30 px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 hover:-translate-y-1 transition-all text-sm uppercase tracking-wide flex items-center gap-2">
              <Play className="w-5 h-5" /> Xem Demo
            </button>
          </div>
          
          <div className="flex items-center gap-6 pt-10 border-t border-white/10 mt-6">
            <div>
              <p className="text-3xl font-black text-white">500+</p>
              <p className="text-[10px] text-blue-200 mt-1 uppercase tracking-widest font-bold">Khách hàng</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div>
              <p className="text-3xl font-black text-white">15+</p>
              <p className="text-[10px] text-blue-200 mt-1 uppercase tracking-widest font-bold">Lĩnh vực</p>
            </div>
            <div className="w-px h-10 bg-white/10"></div>
            <div>
              <p className="text-3xl font-black text-white">99.9%</p>
              <p className="text-[10px] text-blue-200 mt-1 uppercase tracking-widest font-bold">Uptime</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="relative z-10 bg-white/10 p-3 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden group">
            <img src={productImg} alt={`Demo ${productName}`} className="w-full h-auto object-cover rounded-2xl shadow-lg border border-white/30 group-hover:scale-105 transition-transform duration-700" onError={e => (e.currentTarget.src = "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png")} />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] z-20 hover:scale-110 transition-transform duration-500 hidden sm:flex items-center gap-4">
             <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-[#3087fe] rounded-full flex items-center justify-center text-white shadow-inner">
                <CheckCircle2 className="w-6 h-6" />
             </div>
             <div>
                <p className="text-white font-black text-[15px] drop-shadow-sm">Đã xác thực</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                  <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                  <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                  <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                  <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                </div>
             </div>
          </div>
          
          <div className="absolute -top-6 -right-6 bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-[1.25rem] border border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-20 hover:scale-110 md:-rotate-6 transition-transform duration-500 hidden sm:flex items-center gap-2">
             <Zap className="w-6 h-6 text-white fill-white animate-pulse" />
             <div className="text-white">
                <p className="font-black text-[18px] leading-none">Siêu mượt</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductTabs({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) {
  return (
    <div className="w-full bg-[#144773] sticky top-[96px] z-40 shadow-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center">
          <button 
            onClick={() => onTabChange('tongquan')}
            className={`px-6 sm:px-10 py-3.5 font-black text-[13px] uppercase tracking-widest transition-all border-b-[3px] ${activeTab === 'tongquan' ? 'border-cyan-400 text-white bg-white/5' : 'border-transparent text-blue-100/70 hover:text-white hover:bg-white/5'}`}
          >
            Tổng quan
          </button>
          <button 
            onClick={() => onTabChange('tinhnang')}
            className={`px-6 sm:px-10 py-3.5 font-black text-[13px] uppercase tracking-widest transition-all border-b-[3px] ${activeTab === 'tinhnang' ? 'border-cyan-400 text-white bg-white/5' : 'border-transparent text-blue-100/70 hover:text-white hover:bg-white/5'}`}
          >
            Tính năng
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection({ features }: { features: any[] }) {
  const advancedFeatures = [
    { title: "Tùy biến linh hoạt", desc: "Cấu hình quy trình logic nghiệp vụ theo yêu cầu đặc thù của từng doanh nghiệp.", icon: <Layers className="w-8 h-8" />, color: "from-blue-500 to-cyan-400" },
    { title: "API tích hợp", desc: "Kết nối không giới hạn với các hệ thống kế toán, CRM, ERP hoặc các nền tảng khác.", icon: <Zap className="w-8 h-8" />, color: "from-orange-500 to-amber-400" },
    { title: "Báo cáo thông minh", desc: "Hệ thống Dashboard, biểu đồ trực quan, hỗ trợ xuất đa định dạng Excel/PDF.", icon: <Activity className="w-8 h-8" />, color: "from-emerald-500 to-teal-400" },
    { title: "Đa chi nhánh", desc: "Quản lý tập trung nhiều điểm kinh doanh, phân quyền chi tiết theo vị trí.", icon: <ShieldCheck className="w-8 h-8" />, color: "from-purple-500 to-indigo-400" }
  ];

  const fullFeatureList = [
    "Giao diện thân thiện, dễ sử dụng", "Đa ngôn ngữ (Việt, Anh...)", "Responsive trên mọi thiết bị", "Bảo mật chuẩn quốc tế",
    "Phân quyền người dùng chi tiết", "Audit log theo dõi hoạt động", "Sao lưu dữ liệu tự động", "Đồng bộ Real-time",
    "API RESTful đầy đủ", "Tích hợp SSO/LDAP", "Cập nhật miễn phí", "Hỗ trợ kỹ thuật 24/7"
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 relative overflow-visible">
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 border border-blue-100 text-[11px] font-black text-[#3087fe] uppercase tracking-[3px] mb-6 shadow-sm backdrop-blur-md">
           HỆ THỐNG GIẢI PHÁP
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0f426c] tracking-tight leading-[1.1]">
          Đột phá công nghệ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3087fe] to-cyan-500 italic">tối ưu vận hành</span>
        </h2>
      </div>

      {/* 1. Core Functions Grid */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] w-12 bg-[#3087fe]"></div>
          <h3 className="text-lg font-black text-[#0f426c] uppercase tracking-wider">TÍNH NĂNG CHỦ CHỐT</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(0, 6).map((feature: any, idx: number) => (
            <div key={idx} className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(48,135,254,0.12)] hover:-translate-y-2 transition-all duration-500 group relative">
              <div className="w-14 h-14 bg-[#f0f7ff] text-[#3087fe] rounded-[20px] flex items-center justify-center mb-6 group-hover:bg-[#3087fe] group-hover:text-white transition-all duration-300 shadow-inner border border-blue-50">
                {feature.icon}
              </div>
              <h4 className="text-xl font-black text-[#0f426c] mb-3 group-hover:text-[#3087fe] transition-colors">{feature.title}</h4>
              <p className="text-[#507588] leading-relaxed text-[14px] font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Advanced Expansion Layout */}
      <div className="mb-20 bg-[#144773] rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3087fe]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Cơ chế Nâng cao & Tích hợp</h3>
          <p className="text-blue-100/70 text-[16px] font-medium">Chúng tôi cung cấp các công cụ mạnh mẽ để bạn có thể kết nối và tùy biến hệ thống theo đúng quy trình nghiệp vụ.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {advancedFeatures.map((adv, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all flex items-start gap-5 group">
              <div className={`w-12 h-12 bg-gradient-to-br ${adv.color} rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                {adv.icon}
              </div>
              <div>
                <h5 className="text-white font-black text-lg mb-1">{adv.title}</h5>
                <p className="text-blue-50/60 text-xs leading-relaxed font-medium">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. The Full Feature Checklist */}
      <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-blue-50 shadow-[0_30px_70px_rgba(0,0,0,0.035)] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100/40 rounded-full blur-3xl"></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-100 pb-10">
          <div className="max-w-xl">
            <h3 className="text-2xl font-black text-[#0f426c] mb-3">Bảng tổng hợp chi tiết</h3>
            <p className="text-[#507588] text-[15px] font-medium leading-relaxed">Chúng tôi tích hợp mọi chi tiết nhỏ nhất để đảm bảo bạn có một trải nghiệm quản lý tuyệt vời.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
          {fullFeatureList.map((f, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-[#0f426c] font-bold text-[14px] group-hover:translate-x-1 transition-transform">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlatformSection({ productName }: { productName: string }) {
  const productImg = getProductImage(productName);
  return (
    <section className="py-28 bg-gradient-to-b from-[#f8fbff] to-white relative overflow-hidden border-t border-blue-50">
      {/* Background Ambience */}
      <div className="absolute left-0 top-0 w-[800px] h-[800px] bg-cyan-100/30 rounded-full blur-[150px] mix-blend-multiply pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10 order-2 lg:order-1">
          <div>
            <span className="text-cyan-600 font-extrabold text-[11px] uppercase tracking-widest bg-cyan-50 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6 border border-cyan-100 shadow-sm animate-pulse relative overflow-hidden group">
               <Layers className="w-4 h-4" /> TỰ HÀO PHÁT TRIỂN BỞI SOF
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f426c] leading-[1.2] mb-6 tracking-tight">
              Nền tảng quản lý <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-[#3087fe]">thông minh</span> & tối ưu hoàn hảo
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-blue-50 shadow-sm hover:shadow-[0_15px_40px_rgba(48,135,254,0.1)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-white text-[#3087fe] border border-blue-100 rounded-2xl flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 group-hover:bg-[#3087fe] group-hover:text-white transition-all duration-300">
                <Filter className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#0f426c] text-[16px] mb-2 group-hover:text-[#3087fe] transition-colors">Khảo sát và phân tích sâu sắc</h4>
              <p className="text-gray-500 text-[14px] leading-relaxed font-medium">Thiết kế tính năng và giao diện linh hoạt, bám sát mô hình vận hành.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-blue-50 shadow-sm hover:shadow-[0_15px_40px_rgba(48,135,254,0.1)] hover:-translate-y-2 transition-all duration-300 group mt-4 sm:mt-10">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-50 to-white text-orange-500 border border-orange-100 rounded-2xl flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <PackageOpen className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#0f426c] text-[16px] mb-2 group-hover:text-orange-500 transition-colors">Tùy chỉnh theo đặc thù</h4>
              <p className="text-gray-500 text-[14px] leading-relaxed font-medium">Tối ưu hóa quy trình nghiệp vụ cho doanh nghiệp của bạn, không rập khuôn.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-blue-50 shadow-sm hover:shadow-[0_15px_40px_rgba(48,135,254,0.1)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-white text-emerald-500 border border-emerald-100 rounded-2xl flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#0f426c] text-[16px] mb-2 group-hover:text-emerald-600 transition-colors">Đào tạo & hỗ trợ sử dụng</h4>
              <p className="text-gray-500 text-[14px] leading-relaxed font-medium">Chuyển giao công nghệ tường tận, hướng dẫn giúp nhân sự master.</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-blue-50 shadow-sm hover:shadow-[0_15px_40px_rgba(48,135,254,0.1)] hover:-translate-y-2 transition-all duration-300 group mt-4 sm:mt-10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-white text-purple-600 border border-purple-100 rounded-2xl flex items-center justify-center shadow-inner mb-4 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Rocket className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#0f426c] text-[16px] mb-2 group-hover:text-purple-600 transition-colors">Bảo trì & nâng cấp liên tục</h4>
              <p className="text-gray-500 text-[14px] leading-relaxed font-medium">Cam kết đồng hành dài hạn. Cập nhật công nghệ mới với hỗ trợ 24/7.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6">
            <Link href="/contact" className="bg-gradient-to-r from-[#144773] to-[#0f3a61] text-white px-10 py-4 rounded-[1.25rem] font-black shadow-[0_10px_30px_rgba(20,71,115,0.3)] hover:shadow-[0_15px_40px_rgba(20,71,115,0.4)] hover:-translate-y-1 transition-all text-[13px] uppercase tracking-widest relative overflow-hidden group inline-flex items-center gap-2">
              Nhận tư vấn ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 bg-white px-6 py-3.5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center animate-pulse border border-green-100">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Hotline 24/7</p>
                <p className="text-[#0f426c] font-black text-lg tracking-wide">0933 549 469</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group order-1 lg:order-2 perspective-1000">
          <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-200/40 to-blue-300/40 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"></div>
          <img src={productImg} alt="Platform" className="relative w-full rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white/80 transform group-hover:rotate-1 group-hover:scale-[1.02] transition-transform duration-700" onError={e => (e.currentTarget.src = "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png")} />
          
          <div className="absolute top-10 -right-8 bg-white/90 backdrop-blur-md p-5 rounded-[1.5rem] shadow-2xl border border-white flex items-center gap-4 animate-[bounce_3s_infinite] hidden md:flex delay-300 z-20">
             <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-white text-[#3087fe] border border-blue-100 rounded-full flex items-center justify-center shadow-inner"><Activity className="w-6 h-6" /></div>
             <div>
                <h5 className="font-black text-[#0f426c] text-[15px]">Tốc độ xử lý</h5>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-[11px] uppercase tracking-widest font-black">Nhanh chóng</p>
             </div>
          </div>

          <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-5 rounded-[1.5rem] shadow-2xl border border-white flex items-center gap-4 animate-[bounce_4s_infinite] hidden sm:flex z-20">
             <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-white text-emerald-500 border border-emerald-100 rounded-full flex items-center justify-center shadow-inner"><CheckCircle2 className="w-6 h-6" /></div>
             <div>
                <h5 className="font-black text-[#0f426c] text-[15px]">Hệ thống ổn định</h5>
                <p className="text-gray-400 text-[11px] uppercase tracking-widest font-black">99.9% Uptime</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingSection({ productName }: { productName: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const productType = detectProductType(productName);
  const isParking = productType === "parking";
  const basicData = getCardData(productName, "basic");
  const fullData = getCardData(productName, "full");
  const proData = getCardData(productName, "pro");

  const openContactModal = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setIsModalOpen(true);
  };

  const openFeaturesModal = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setIsFeaturesModalOpen(true);
  };

  return (
    <section className="py-28 bg-[#f8fbff] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[150px] mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/30 rounded-full blur-[150px] mix-blend-multiply pointer-events-none"></div>

      <div className="max-w-[800px] mx-auto px-6 text-center mb-20 relative z-10">
        <div className="text-cyan-600 font-extrabold text-[11px] tracking-widest uppercase mb-6 bg-white/80 backdrop-blur-sm inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-100 shadow-sm">
          <Database className="w-4 h-4 animate-pulse" /> PHIÊN BẢN LINH HOẠT
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0f426c] to-[#3087fe] tracking-tight pb-2">Giải pháp tối ưu cho mọi quy mô</h2>
        <p className="text-lg text-[#507588] mt-6 max-w-2xl mx-auto font-medium">Khám phá các phiên bản được thiết kế riêng biệt để đáp ứng hoàn hảo mọi nhu cầu vận hành và quy trình quản trị chuyên sâu của doanh nghiệp.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center lg:px-4">
          
          {/* BASIC PLAN */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 border border-blue-50 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(48,135,254,0.1)] transition-all flex flex-col h-full lg:mt-6 relative overflow-hidden group hover:-translate-y-2 duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full blur-[20px]"></div>
            <div className="mb-6 border-b border-gray-100 pb-6 relative z-10">
              <h3 className="text-2xl font-bold text-[#0f426c]">{formatProductName(productName)} Basic</h3>
              <p className="text-gray-500 text-sm mt-2 font-medium">Phù hợp cửa hàng nhỏ, mới kinh doanh</p>
            </div>
            <div className="flex-grow space-y-4 mb-8">
              {basicData.highlights.length > 0 && (
                <div className="px-5 py-6 bg-blue-50/50 rounded-2xl border border-blue-100/30">
                  <p className="text-[10px] font-black text-[#3087fe] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-orange-400" /> ĐIỂM NỔI BẬT
                  </p>
                  <div className="space-y-3">
                    {basicData.highlights.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-[12.5px] font-bold text-[#0f426c]">
                        <Check className="w-3 h-3 text-blue-500 shrink-0 mt-1" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={basicData.highlights.length === 0 ? "mt-0" : "mt-6 px-2"}>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">TÍNH NĂNG HỆ THỐNG</p>
                <div className="space-y-3">
                   {basicData.systemFeatures.map((s, i) => (
                     <div key={i} className="flex items-start gap-2 text-[12.5px] font-bold text-[#507588]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-1" />
                        <span>{s}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => openFeaturesModal(formatProductName(productName) + " Basic")}
              className="text-[#3087fe] font-black text-[12px] uppercase tracking-widest hover:underline mb-6 flex items-center gap-1.5 justify-center w-full"
            >
              Xem chi tiết tính năng <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => openContactModal(formatProductName(productName) + " Basic")}
              className="w-full py-4 px-6 bg-[#3087fe] text-white font-black rounded-xl hover:bg-[#144773] transition-all shadow-lg hover:shadow-blue-200 uppercase tracking-widest text-[13px] relative z-10"
            >
              Tư vấn ngay
            </button>
          </div>

          {/* FULL PLAN (HIGHLIGHTED) */}
          <div className="bg-gradient-to-b from-[#144773] to-[#0a233b] rounded-[3rem] p-10 md:p-12 shadow-[0_30px_60px_rgba(20,71,115,0.4)] relative flex flex-col h-[105%] z-20 overflow-hidden group transform hover:-translate-y-4 transition-all duration-500">
             <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-cyan-400 via-[#3087fe] to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-[50px] group-hover:bg-cyan-400/30 transition-colors duration-700"></div>
             
             <div className="absolute top-8 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black px-6 py-2 rounded-l-full uppercase tracking-widest shadow-lg flex items-center gap-1.5 animate-pulse">
                <Star className="w-3.5 h-3.5" /> Khuyên dùng
             </div>
             
             <div className="mb-6 border-b border-white/10 pb-6 relative z-10">
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">{formatProductName(productName)} Full</h3>
              <p className="text-blue-100/80 text-sm mt-3 font-medium">Quy mô lớn với tính năng nâng cao</p>
            </div>
            
            <div className="flex-grow space-y-4 mb-8">
              <div className="px-5 py-6 bg-white/10 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-orange-400" /> ĐIỂM NỔI BẬT
                </p>
                <div className="space-y-3">
                  {fullData.highlights.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12.5px] font-bold text-blue-50">
                      <Check className="w-3 h-3 text-cyan-400 shrink-0 mt-1" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 px-2">
                <p className="text-[10px] font-black text-blue-200/50 uppercase tracking-widest mb-4">TÍNH NĂNG HỆ THỐNG</p>
                <div className="space-y-3">
                   {fullData.systemFeatures.map((s, i) => (
                     <div key={i} className="flex items-start gap-2 text-[12.5px] font-bold text-blue-100/80">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-1" />
                        <span>{s}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => openFeaturesModal(formatProductName(productName) + " Full")}
              className="text-cyan-400 font-black text-[12px] uppercase tracking-widest hover:underline mb-6 flex items-center gap-1.5 justify-center w-full"
            >
              Xem chi tiết tính năng <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => openContactModal(formatProductName(productName) + " Full")}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-400 to-[#3087fe] text-white font-black rounded-xl hover:from-[#3087fe] hover:to-blue-700 transition-all shadow-[0_10px_30px_rgba(48,135,254,0.3)] uppercase tracking-widest text-[14px] relative z-10"
            >
              Tư vấn ngay
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 border border-blue-50 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(48,135,254,0.1)] transition-all flex flex-col h-full lg:mt-6 relative overflow-hidden group hover:-translate-y-2 duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full blur-[20px]"></div>
            <div className="mb-6 border-b border-gray-100 pb-6 relative z-10">
              <h3 className="text-2xl font-bold text-[#0f426c]">{formatProductName(productName)} Pro</h3>
              <p className="text-gray-500 text-sm mt-2 font-medium">Giải pháp thiết kế may đo riêng biệt</p>
            </div>
            <div className="flex-grow space-y-4 mb-8">
              <div className="px-5 py-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black text-[#0f426c] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-orange-400" /> ĐIỂM NỔI BẬT
                </p>
                <div className="space-y-3">
                  {proData.highlights.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12.5px] font-bold text-[#0f426c]">
                      <Check className="w-3 h-3 text-[#3087fe] shrink-0 mt-1" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 px-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">TÍNH NĂNG HỆ THỐNG</p>
                <div className="space-y-3">
                   {proData.systemFeatures.map((s, i) => (
                     <div key={i} className="flex items-start gap-2 text-[12.5px] font-bold text-[#507588]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-1" />
                        <span>{s}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => openFeaturesModal(formatProductName(productName) + " Pro")}
              className="text-[#0f426c] font-black text-[12px] uppercase tracking-widest hover:underline mb-6 flex items-center gap-1.5 justify-center w-full"
            >
              Xem chi tiết tính năng <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => openContactModal(formatProductName(productName) + " Pro")}
              className="w-full py-4 px-6 bg-[#3087fe] text-white font-black rounded-xl hover:bg-[#144773] transition-all shadow-lg hover:shadow-blue-200 uppercase tracking-widest text-[13px] relative z-10"
            >
              Tư vấn ngay
            </button>
          </div>

        </div>
      </div>

      {isModalOpen && (
        <ContactModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          packageName={selectedPackage} 
        />
      )}

      {isFeaturesModalOpen && (
        <FeaturesDetailModal 
          isOpen={isFeaturesModalOpen} 
          onClose={() => setIsFeaturesModalOpen(false)} 
          packageName={selectedPackage} 
        />
      )}
    </section>
  );
}

function ContactModal({ isOpen, onClose, packageName }: { isOpen: boolean, onClose: () => void, packageName: string }) {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#0a233b]/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="absolute top-0 right-0 p-6 z-20">
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors border border-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-black text-[#0f426c]">Cảm ơn bạn!</h3>
            <p className="text-[#507588] font-medium leading-relaxed">
              Yêu cầu tư vấn cho gói <span className="text-[#3087fe] font-bold">{packageName}</span> đã được gửi thành công. <br />
              Chuyên viên của SOF sẽ liên hệ lại với bạn ngay lập tức!
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-[#144773] text-white font-black py-4 rounded-2xl hover:bg-[#3087fe] transition-all duration-300 shadow-lg uppercase tracking-widest text-sm"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-[#144773] to-[#0a233b] p-10 text-white relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h3 className="text-2xl md:text-3xl font-black mb-2 relative z-10 tracking-tight">Liên hệ tư vấn</h3>
              <p className="text-blue-100 text-sm relative z-10 font-medium">Yêu cầu tư vấn giải pháp: <span className="text-cyan-400 font-bold">{packageName}</span></p>
              
              <div className="absolute -bottom-6 right-10 w-20 h-20 bg-cyan-500/20 blur-2xl rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Họ và tên của bạn</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3087fe] transition-colors" />
                    <input 
                      required
                      type="text" 
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3087fe] focus:ring-4 focus:ring-[#3087fe]/10 transition-all font-medium text-[#0f426c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Số điện thoại</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3087fe] transition-colors" />
                      <input 
                        required
                        type="tel" 
                        placeholder="09xx xxx xxx"
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3087fe] focus:ring-4 focus:ring-[#3087fe]/10 transition-all font-medium text-[#0f426c]"
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#3087fe] transition-colors" />
                      <input 
                        required
                        type="email" 
                        placeholder="email@vidu.com"
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3087fe] focus:ring-4 focus:ring-[#3087fe]/10 transition-all font-medium text-[#0f426c]"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block">Ghi chú (Không bắt buộc)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#30                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Gửi yêu cầu tư vấn
                  </>
                )}
              </button>
              
              <p className="text-center text-gray-400 text-xs font-medium">Chúng tôi sẽ liên hệ sớm nhất trong vòng 15 phút.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function FeaturesDetailModal({ isOpen, onClose, packageName }: { isOpen: boolean, onClose: () => void, packageName: string }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalData = getModalData(packageName);
  const highlights = modalData.highlights;
  const systemFeatures = modalData.systemFeatures;��n mãi, giảm giá, combo, voucher. Áp dụng linh hoạt theo sản phẩm, đơn hàng hoặc khách hàng. Hỗ trợ chiến dịch marketing và kích cầu." },
      { id: 3, title: "Tính năng bán hàng", desc: "Tạo và xử lý đơn hàng nhanh chóng (online/offline). Tích hợp giỏ hàng, áp dụng khuyến mãi tự động. Hỗ trợ đa kênh: tại quầy, website, mobile." },
      { id: 4, title: "Tính năng quản lý khách hàng và điểm", desc: "Lưu trữ thông tin khách hàng. Quản lý lịch sử mua hàng. Tích điểm, phân hạng khách hàng (VIP, thân thiết...). Hỗ trợ chăm sóc và giữ chân khách hàng." },
      { id: 5, title: "Tính năng tích hợp phương thức vận chuyển", desc: "Kết nối đơn vị vận chuyển (GHN, GHTK, Viettel Post...). Tự động tính phí ship. Theo dõi trạng thái giao hàng." },
      { id: 6, title: "Tính năng cấu hình thanh toán", desc: "Tích hợp đa phương thức thanh toán: ZaloPay, MoMo, , SePay. Hỗ trợ thanh toán online và đối soát giao dịch." },
      { id: 7, title: "Tính năng cấu hình xuất hoá đơn điện tử", desc: "Tích hợp nhà cung cấp hoá đơn điện tử. Tự động phát hành hoá đơn sau thanh toán. Quản lý và tra cứu hoá đơn." },
      { id: 8, title: "Tính năng thống kê và báo cáo bán hàng", desc: "Báo cáo doanh thu, lợi nhuận. Phân tích sản phẩm bán chạy. Thống kê theo thời gian, kênh bán, khách hàng. Hỗ trợ ra quyết định kinh doanh." }
    ];
  };

  const highlights = getHighlights();
  const systemFeatures = getSystemFeatures();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a233b]/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-xl overflow-y-auto animate-in zoom-in-95 duration-300 border border-gray-100/30">
        <div className="sticky top-0 right-0 p-6 z-30 flex justify-end">
          <button onClick={onClose} className="w-10 h-10 bg-white/80 backdrop-blur-md hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full flex items-center justify-center transition-all border border-gray-50 shadow-sm">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 md:px-12 pb-12">
          {/* Header */}
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-[#0f426c] mb-2 font-['Outfit']">Tính năng chi tiết: {packageName}</h3>
            <p className="text-[#507588] font-medium">Đầy đủ các công cụ để vận hành doanh nghiệp của bạn hiệu quả nhất.</p>
          </div>

          {/* Section 1: Highlights */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-[#3087fe] font-black text-sm uppercase tracking-widest mb-6">
              <Zap className="w-5 h-5 text-orange-400" /> ĐIỂM NỔI BẬT
            </div>
            <div className={`bg-transparent rounded-[2rem] p-8 border border-gray-50 grid grid-cols-1 ${highlights.length > 8 ? 'md:grid-cols-2' : ''} gap-x-12 gap-y-4`}>
               {highlights.map((item, idx) => (
                 <div key={idx} className="flex items-start gap-3">
                   <div className="w-5 h-5 rounded-full bg-blue-50/20 text-[#3087fe] flex items-center justify-center shrink-0 mt-0.5">
                     <Check className="w-3 h-3" />
                   </div>
                   <span className="text-[#0f426c] font-bold text-[14px]">{item}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Section 2: System Features Grid */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest mb-6">
              <CheckCircle2 className="w-5 h-5" /> TÍNH NĂNG HỆ THỐNG
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {systemFeatures.map((feature) => (
                 <div key={feature.id} className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 font-black flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all text-xs border border-emerald-100">
                        {feature.id}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0f426c] text-[15px] mb-2">{feature.title}</h4>
                        <p className="text-[#507588] text-[13px] leading-relaxed font-medium">{feature.desc}</p>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Footer Close Button */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-[#144773] text-white font-black rounded-xl hover:bg-[#0f426c] transition-all shadow-lg uppercase tracking-widest text-[13px]"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqSection({ faqs }: { faqs: any[] }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <section className="py-28 bg-white max-w-4xl mx-auto px-6 relative">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0f426c] to-[#3087fe] tracking-tight pb-2">Câu hỏi thường gặp</h2>
        <p className="text-lg text-[#507588] mt-6 font-medium">Mọi giải đáp chi tiết bạn cần biết về dịch vụ và quy trình hỗ trợ của SOF.</p>
      </div>
      <div className="space-y-6 relative z-10">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`bg-white border rounded-[1.5rem] overflow-hidden transition-all duration-500 ${faqOpen === idx ? 'border-[#3087fe] shadow-[0_15px_40px_rgba(48,135,254,0.1)] scale-[1.02]' : 'border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-[#3087fe]/40 hover:shadow-md hover:-translate-y-1'}`}
          >
            <button 
              onClick={() => setFaqOpen(faqOpen === idx ? null : idx)} 
              className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none group"
            >
              <span className={`font-bold text-[17px] pr-8 transition-colors ${faqOpen === idx ? 'text-[#3087fe]' : 'text-[#0f426c] group-hover:text-[#3087fe]'}`}>{faq.q}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${faqOpen === idx ? 'bg-[#3087fe] text-white shadow-md' : 'bg-blue-50 text-[#3087fe] group-hover:bg-[#3087fe]/10'}`}>
                 {faqOpen === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            <div className={`px-8 pb-8 text-[#507588] text-[16px] leading-relaxed font-medium transition-all duration-500 ${faqOpen === idx ? 'block opacity-100' : 'hidden opacity-0'} border-t border-gray-50 pt-5 mt-2`}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a233b] z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#144773] via-[#0f3a61] to-[#3087fe] opacity-80 z-0 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400/30 blur-[130px] rounded-full z-0 animate-[pulse_6s_ease-in-out_infinite]"></div>
      
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-sm animate-bounce z-0 border border-white/20"></div>
      <div className="absolute bottom-20 right-32 w-24 h-24 bg-cyan-400/20 rounded-full blur-md animate-pulse delay-700 z-0"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-white mb-8 tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
           Sẵn sàng để đưa doanh nghiệp của bạn lên tầm cao mới?
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">Hàng ngàn doanh nghiệp đã tin dùng giải pháp của SOF. Đăng ký thông tin để chúng tôi liên hệ tư vấn và dùng thử miễn phí.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="bg-white text-[#144773] text-[15px] font-black px-10 py-5 rounded-2xl shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)] hover:-translate-y-2 hover:scale-105 transition-all duration-500 uppercase tracking-widest flex items-center justify-center gap-3 group">
            Liên hệ tư vấn ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="bg-transparent border-2 border-white/40 text-white text-[15px] font-black px-10 py-5 rounded-2xl hover:bg-white/10 hover:border-white hover:-translate-y-2 transition-all duration-500 uppercase tracking-widest backdrop-blur-sm flex items-center justify-center gap-3">
            <MonitorSmartphone className="w-5 h-5" /> 0933 549 469
          </button>
        </div>
      </div>
    </section>
  );
}

export function SuggestionsSection() {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const getLocalProductImage = (name: string) => {
    const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    if (n.includes("ban hang")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png";
    if (n.includes("bao hanh")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094922.png";
    if (n.includes("cafe")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094652.png";
    if (n.includes("bai xe")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094734.png";
    if (n.includes("khach san")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094706.png";
    if (n.includes("kho pallet")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094850.png";
    if (n.includes("quan an")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094620.png";
    if (n.includes("quan ly kho") || n === "kho") return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094833.png";
    if (n.includes("van tai")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094910.png";
    if (n.includes("nha hang")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094719.png";
    if (n.includes("nhan su")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094932.png";
    if (n.includes("erp")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094952.png";
    if (n.includes("mat troi")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20095003.png";
    return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png";
  };

  useEffect(() => {
    const premiumSoftwarePool = [
      { tenSanPham: "Cafe", maLoai: "PHANMEM", slug: "cafe" },
      { tenSanPham: "Kho", maLoai: "PHANMEM", slug: "kho" },
      { tenSanPham: "Bán hàng", maLoai: "PHANMEM", slug: "ban-hang" },
      { tenSanPham: "Khách sạn", maLoai: "PHANMEM", slug: "khach-san" },
      { tenSanPham: "Nhà hàng", maLoai: "PHANMEM", slug: "nha-hang" },
      { tenSanPham: "Bãi xe", maLoai: "PHANMEM", slug: "bai-xe" },
      { tenSanPham: "ERP", maLoai: "PHANMEM", slug: "erp" },
      { tenSanPham: "Nhân sự", maLoai: "PHANMEM", slug: "nhan-su" },
      { tenSanPham: "Vận tải", maLoai: "PHANMEM", slug: "van-tai" },
      { tenSanPham: "Quán ăn", maLoai: "PHANMEM", slug: "quan-an" },
      { tenSanPham: "Bảo hành", maLoai: "PHANMEM", slug: "bao-hanh" },
      { tenSanPham: "Kho Pallet", maLoai: "PHANMEM", slug: "kho-pallet" },
      { tenSanPham: "Trả thưởng Hệ Mặt Trời", maLoai: "PHANMEM", slug: "tra-thuong" },
      { tenSanPham: "Giữ xe Mobile", maLoai: "PHANMEM", slug: "giu-xe-mobile" }
    ];

    const shuffled = [...premiumSoftwarePool].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 4));
  }, []);

  if (suggestions.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-[#f8fbff] to-white py-12 relative overflow-hidden border-t border-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-orange-500 font-extrabold text-[10px] tracking-widest uppercase mb-3 flex items-center gap-2 bg-orange-50 px-4 py-1.5 rounded-full w-fit">
               <Star className="w-4 h-4 animate-pulse" /> GỢI Ý DÀNH CHO BẠN
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f426c] tracking-tight leading-tight">Cùng xây dựng <br /> hệ sinh thái doanh nghiệp</h2>
          </div>
          <Link href="/san-pham" className="hidden sm:flex text-[#3087fe] bg-blue-50/50 px-6 py-3 rounded-full font-bold text-sm items-center gap-2 hover:bg-[#3087fe] hover:text-white transition-all border border-blue-100 shadow-sm group">
            Xem tất cả <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestions.map((item, idx) => {
            const productUrl = `/san-pham/${item.maLoai === "DICHVU" ? "dich-vu" : "phan-mem"}/${item.slug}`;
            const productImg = getLocalProductImage(item.tenSanPham);
            
            return (
              <Link key={idx} href={productUrl} className="bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group overflow-hidden">
                <div className="h-40 overflow-hidden relative p-1.5">
                  <img src={productImg} alt={item.tenSanPham} className="w-full h-full object-cover rounded-[1.5rem] group-hover:scale-105 transition-transform duration-700" 
                    onError={(e) => { e.currentTarget.src = "/hinhanh/what-is-pos.png" }} 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] font-black text-cyan-600 uppercase tracking-widest shadow-md">
                    {item.maLoai}
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <h3 className="font-bold text-[#0f426c] text-[16px] group-hover:text-[#3087fe] transition-colors leading-tight mb-2 pr-2 line-clamp-2 min-h-[2.5rem]">
                    {formatProductName(item.tenSanPham)}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-6">
                     {[1,2,3,4].map((_, star) => (
                       <Star key={star} className="w-3 h-3 text-orange-400 fill-orange-400" />
                     ))}
                     <Star className="w-3 h-3 text-gray-200 fill-gray-200" />
                     <span className="text-[9px] font-black text-[#3087fe] ml-2 tracking-widest uppercase whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">GỢI Ý</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#3087fe] font-black text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSummary({ features }: { features: any[] }) {
  return (
    <section className="py-12 max-w-7xl mx-auto px-6 relative border-t border-gray-50/50">
      <div className="text-center mb-10">
        <span className="text-orange-500 font-extrabold text-[10px] uppercase tracking-[3px] bg-orange-50 px-4 py-1.5 rounded-full mb-4 inline-block shadow-sm border border-orange-100/50">Trải nghiệm vượt trội</span>
        <h2 className="text-3xl md:text-4xl font-black text-[#0f426c] tracking-tight mb-4 leading-tight">Mọi công cụ quản trị trong một nền tảng</h2>
        <p className="text-[#507588] font-medium max-w-2xl mx-auto text-[15px] leading-relaxed">Được xây dựng để tối ưu hóa 100% quy trình kinh doanh, giúp bạn tiết kiệm thời gian và nâng cao hiệu suất làm việc tức thì.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.slice(0, 4).map((f, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-gray-100 hover:border-[#3087fe]/30 hover:shadow-[0_15px_40px_rgba(48,135,254,0.1)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-white text-[#3087fe] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#3087fe] group-hover:text-white transition-all shadow-inner border border-blue-50/50">
              {f.icon}
            </div>
            <h4 className="font-black text-[#0f426c] text-[18px] mb-3 group-hover:text-[#3087fe] transition-colors">{f.title}</h4>
            <p className="text-[#507588] text-[14px] leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
