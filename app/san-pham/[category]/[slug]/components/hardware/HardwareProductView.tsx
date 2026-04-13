"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, ChevronRight, Phone, ShieldCheck, Truck,
  RefreshCw, Headphones, CheckCircle2, Star, AlertCircle,
  Cpu, Package, Zap, Settings, FileText, BarChart3, Sparkles,
  CircleDot, ArrowRight, Box, Layers, X, User, Mail, Send
} from "lucide-react";
import type { HardwareProduct } from "../data/hardware/hardwareData";

interface HardwareProductViewProps {
  product: HardwareProduct;
}

export default function HardwareProductView({ product }: HardwareProductViewProps) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "specs">("description");
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Icon mapping cho các feature
  const featureIcons = [Cpu, Settings, Zap, Package, Truck];

  // Category label from code
  const getCategoryLabel = () => {
    if (product.code.includes("CDT")) return "CÂN ĐIỆN TỬ";
    if (product.code.includes("GIB")) return "GIẤY IN BILL";
    if (product.code.includes("MIB")) return "MÁY IN";
    if (product.code.includes("QMV")) return "MÁY QUÉT";
    if (product.code.includes("POS")) return "MÁY POS";
    if (product.code.includes("TDT")) return "KÉT TIỀN";
    return "PHẦN CỨNG";
  };

  return (
    <div className="w-full">

      {/* ═══════════ INLINE STYLES FOR ANIMATIONS ═══════════ */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.7; }
          100% { transform: scale(0.95); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fade-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fade-right { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* ═══════════ BREADCRUMB ═══════════ */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-3 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
        <nav className="flex items-center gap-2 text-[13px] text-gray-400 flex-wrap font-medium">
          <Link href="/" className="hover:text-[#3087fe] transition-colors duration-300">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/san-pham/phancung" className="hover:text-[#3087fe] transition-colors duration-300">Sản phẩm phần cứng</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-400">{getCategoryLabel()}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-[#0f426c]">{product.name}</span>
        </nav>
      </div>

      {/* ═══════════════════════════════════════════
          HERO PRODUCT SECTION  
      ═══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className={`bg-white rounded-[2rem] shadow-[0_8px_60px_rgba(0,0,0,0.07)] border border-gray-100/80 overflow-hidden ${isLoaded ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ─── LEFT: Image Gallery ─── */}
            <div className="relative bg-gradient-to-br from-[#f0f6ff] via-[#e8f2fc] to-[#dbe9f8] p-5 lg:p-8 overflow-hidden">
              {/* Animated decorative elements */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-blue-300/20 to-cyan-200/10 rounded-full blur-3xl pointer-events-none animate-float"></div>
              <div className="absolute bottom-10 left-0 w-40 h-40 bg-gradient-to-tr from-violet-200/15 to-blue-200/20 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              {/* Main Image Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center group">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'radial-gradient(circle, #3087fe 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}></div>

                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className={`w-full h-full object-contain p-4 transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Shine overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Image Counter Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xl rounded-full px-3.5 py-1.5 text-[11px] font-black text-[#0f426c] shadow-lg border border-white/70 flex items-center gap-1.5">
                  <CircleDot className="w-3 h-3 text-[#3087fe]" />
                  {currentImage + 1} / {product.images.length}
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 text-[#0f426c] border border-white/60 hover:shadow-blue-200/40"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 text-[#0f426c] border border-white/60 hover:shadow-blue-200/40"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Row */}
              <div className="flex gap-3 mt-5 justify-center">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setImageLoaded(false); setCurrentImage(i); }}
                    className={`w-[72px] h-[72px] rounded-2xl border-2 overflow-hidden transition-all duration-300 bg-white shadow-md ${
                      currentImage === i
                        ? "border-[#3087fe] shadow-blue-200/60 scale-110 ring-4 ring-blue-100/60"
                        : "border-gray-200/60 hover:border-blue-200 hover:scale-105 hover:shadow-lg"
                    }`}
                  >
                    <img src={img} alt={`Ảnh ${i + 1}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: Product Info ─── */}
            <div className="flex flex-col p-6 lg:p-10">
              
              {/* Tag */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border border-blue-100/80 rounded-full text-[11px] font-black text-[#3087fe] uppercase tracking-[0.15em] shadow-sm">
                  <div className="w-5 h-5 bg-gradient-to-br from-[#3087fe] to-[#62a8ff] rounded-md flex items-center justify-center">
                    <Cpu className="w-3 h-3 text-white" />
                  </div>
                  Phần cứng chính hãng
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[26px] md:text-[32px] font-black text-[#0f426c] leading-[1.15] mb-4 tracking-tight">
                {product.name}
              </h1>

              {/* Mã + Rating */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100/80">
                <span className="text-[13px] text-gray-400 font-medium">
                  Mã: <span className="font-bold text-[#0f426c] bg-blue-50 px-2 py-0.5 rounded-md">{product.code}</span>
                </span>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                  ))}
                  <span className="text-[12px] text-gray-400 ml-2 font-bold">(5.0)</span>
                </div>
              </div>


              {/* Feature Cards */}
              <div className="space-y-2.5 mb-6">
                {(() => {
                  const cards = [];
                  for (let i = 0; i < product.shortFeatures.length; i += 2) {
                    const IconComp = featureIcons[Math.floor(i / 2) % featureIcons.length];
                    const delay = Math.floor(i / 2) * 100;
                    cards.push(
                      <div
                        key={i}
                        className="group bg-gradient-to-r from-[#f8fbff] to-white hover:from-blue-50 hover:to-blue-50/60 border border-blue-100/40 rounded-2xl p-4 transition-all duration-400 hover:shadow-lg hover:shadow-blue-100/20 hover:border-blue-200/60 hover:-translate-y-0.5"
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        <div className="flex gap-3.5">
                          <div className="w-11 h-11 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-blue-100/60 group-hover:bg-gradient-to-br group-hover:from-[#3087fe] group-hover:to-[#1a6aa8] group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-300/30 transition-all duration-400">
                            <IconComp className="w-5 h-5 text-[#3087fe] group-hover:text-white transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[14px] text-[#0f426c] mb-0.5 leading-snug group-hover:text-[#1a5a8a] transition-colors">
                              {product.shortFeatures[i]}
                            </p>
                            {product.shortFeatures[i + 1] && (
                              <p className="text-[13px] text-[#507588] leading-relaxed">
                                {product.shortFeatures[i + 1]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return cards;
                })()}
              </div>


              {/* CTA Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-5 bg-gradient-to-r from-[#0f426c] via-[#1a5a8a] to-[#3087fe] hover:from-[#3087fe] hover:via-[#1a5a8a] hover:to-[#0f426c] text-white font-black text-[15px] rounded-2xl shadow-xl shadow-blue-900/15 hover:shadow-2xl hover:shadow-blue-600/25 transition-all duration-500 flex items-center justify-center gap-3 mb-6 active:scale-[0.97] uppercase tracking-[0.1em] relative overflow-hidden group animate-gradient"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Phone className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-500" />
                <span className="relative z-10">Liên hệ tư vấn ngay</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: ShieldCheck, label: product.badges[0], color: "text-emerald-500", bg: "from-emerald-50 to-green-50", border: "border-emerald-100/80", glow: "hover:shadow-emerald-100/40" },
                  { icon: Truck, label: product.badges[1], color: "text-blue-500", bg: "from-blue-50 to-sky-50", border: "border-blue-100/80", glow: "hover:shadow-blue-100/40" },
                  { icon: RefreshCw, label: product.badges[2], color: "text-violet-500", bg: "from-violet-50 to-purple-50", border: "border-violet-100/80", glow: "hover:shadow-violet-100/40" },
                  { icon: Headphones, label: product.badges[3], color: "text-orange-500", bg: "from-orange-50 to-amber-50", border: "border-orange-100/80", glow: "hover:shadow-orange-100/40" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 text-[13px] bg-gradient-to-r ${badge.bg} px-4 py-3 rounded-2xl border ${badge.border} hover:shadow-lg ${badge.glow} transition-all duration-400 hover:-translate-y-0.5 group/badge`}
                  >
                    <div className={`w-8 h-8 rounded-xl bg-white/80 flex items-center justify-center shadow-sm group-hover/badge:scale-110 transition-transform duration-300`}>
                      <badge.icon className={`w-4 h-4 ${badge.color} flex-shrink-0`} />
                    </div>
                    <span className="font-bold text-[#0f426c]">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TABS: Mô tả sản phẩm / Thông số kỹ thuật
      ═══════════════════════════════════════════ */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 pb-10 ${isLoaded ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
        
        {/* Tab Headers - Premium Pill Style */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-gray-100/80">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-black transition-all duration-500 ${
                activeTab === "description"
                  ? "bg-gradient-to-r from-[#0f426c] to-[#1a6aa8] text-white shadow-lg shadow-blue-900/20 scale-[1.02]"
                  : "text-gray-400 hover:text-[#0f426c] hover:bg-gray-50"
              }`}
            >
              <FileText className="w-4.5 h-4.5" />
              Mô tả sản phẩm
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-black transition-all duration-500 ${
                activeTab === "specs"
                  ? "bg-gradient-to-r from-[#0f426c] to-[#1a6aa8] text-white shadow-lg shadow-blue-900/20 scale-[1.02]"
                  : "text-gray-400 hover:text-[#0f426c] hover:bg-gray-50"
              }`}
            >
              <BarChart3 className="w-4.5 h-4.5" />
              Thông số kỹ thuật
            </button>
          </div>
        </div>

        {/* ─── Tab Content: MÔ TẢ SẢN PHẨM ─── */}
        {activeTab === "description" ? (
          <div style={{ animation: 'fadeInUp 0.6s ease-out' }}>
            {/* Hero description header */}
            <div className="relative bg-gradient-to-r from-[#0f426c] via-[#1a5a8a] to-[#3087fe] rounded-t-[2rem] px-8 lg:px-12 py-8 overflow-hidden">
              {/* Animated background effects */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}></div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-20 w-48 h-48 bg-cyan-400/10 rounded-full translate-y-1/2"></div>
              <div className="absolute top-4 right-10 w-2 h-2 bg-cyan-300/60 rounded-full animate-float"></div>
              <div className="absolute top-12 right-32 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10 flex items-center gap-5">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight">Mô tả sản phẩm</h3>
                  <p className="text-blue-200/80 text-sm font-medium mt-1">Chi tiết thông tin & tính năng nổi bật</p>
                </div>
              </div>
            </div>

            {/* Description Body */}
            <div className="bg-white rounded-b-[2rem] shadow-[0_8px_50px_rgba(0,0,0,0.05)] border border-t-0 border-gray-100/80">
              <div className="p-8 lg:p-12 space-y-8">
                {product.description.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className={`${sIdx > 0 && section.headingColor
                      ? "bg-gradient-to-r from-[#f8fbff] to-[#f0f6ff] rounded-2xl p-6 border border-blue-50/80 hover:shadow-md hover:shadow-blue-50/50 transition-all duration-400"
                      : ""
                    }`}
                    style={{ animation: `fadeInUp 0.5s ease-out ${sIdx * 0.1}s both` }}
                  >
                    {section.heading && (
                      <h4
                        className="text-[18px] font-extrabold mb-3 flex items-center gap-3"
                        style={{ color: section.headingColor || "#0f426c" }}
                      >
                        {section.headingColor && (
                          <div className="w-2 h-8 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: section.headingColor }}></div>
                        )}
                        {!section.headingColor && sIdx === 0 && (
                          <div className="w-2 h-8 rounded-full bg-gradient-to-b from-[#0f426c] to-[#3087fe] flex-shrink-0"></div>
                        )}
                        {section.heading}
                      </h4>
                    )}
                    <div className="space-y-2.5 pl-5">
                      {section.lines.map((line, lIdx) => (
                        <p
                          key={lIdx}
                          className={`text-[15px] leading-[1.85] ${
                            line.bold ? "font-semibold text-[#0f426c]" : "text-[#5a7d94]"
                          }`}
                        >
                          {line.text}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ─── Tab Content: THÔNG SỐ KỸ THUẬT ─── */
          <div style={{ animation: 'fadeInUp 0.6s ease-out' }}>
            {/* Hero specs header */}
            <div className="relative bg-gradient-to-r from-[#0f426c] via-[#1a5a8a] to-[#3087fe] rounded-t-[2rem] px-8 lg:px-12 py-8 overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}></div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-20 w-48 h-48 bg-cyan-400/10 rounded-full translate-y-1/2"></div>
              <div className="absolute top-6 right-14 w-2 h-2 bg-cyan-300/60 rounded-full animate-float"></div>
              
              <div className="relative z-10 flex items-center gap-5">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl tracking-tight">Thông số kỹ thuật</h3>
                  <p className="text-blue-200/80 text-sm font-medium mt-1">Cấu hình chi tiết sản phẩm</p>
                </div>
              </div>
            </div>

            {/* Specs Body */}
            <div className="bg-white rounded-b-[2rem] shadow-[0_8px_50px_rgba(0,0,0,0.05)] border border-t-0 border-gray-100/80">
              <div className="p-6 lg:p-10">
                {product.specs.map((spec, i) => {
                  if (spec.bold && !spec.value) {
                    // Title row
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3.5 mb-5 mt-4"
                        style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.04}s both` }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[17px] font-black text-[#0f426c]">{spec.label}</span>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className={`group flex items-center py-4 px-5 rounded-xl text-[14px] transition-all duration-400 border border-transparent ${
                        i % 2 === 0 ? "bg-gradient-to-r from-[#f8fbff] to-[#f2f7fd]" : "bg-white"
                      } hover:border-blue-100/80 hover:shadow-md hover:shadow-blue-50/50 hover:-translate-y-0.5`}
                      style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.04}s both` }}
                    >
                      <span className="font-bold text-[#0f426c] min-w-[260px] flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#3087fe] to-[#62a8ff] rounded-full flex-shrink-0 group-hover:scale-150 group-hover:shadow-md group-hover:shadow-blue-300/50 transition-all duration-400"></div>
                        {spec.label}
                      </span>
                      <span className="text-[#0f426c] font-medium">
                        {spec.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════ BACK LINK ═══════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 flex justify-center">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl text-sm font-bold text-[#0f426c] bg-white border border-gray-200 hover:border-[#3087fe] hover:text-[#3087fe] hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-500 group cursor-pointer hover:-translate-y-1"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300" />
          Quay lại trang trước
        </button>
      </div>

      {isModalOpen && (
        <ContactModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          packageName={product.name} 
        />
      )}
    </div>
  );
}

function ContactModal({ isOpen, onClose, packageName }: { isOpen: boolean, onClose: () => void, packageName: string }) {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          services: [packageName],
          message: formData.notes
        }),
      });

      if (response.ok) {
        setIsSent(true);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối máy chủ!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#0a233b]/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="absolute top-0 right-0 p-6 z-20">
          <button onClick={onClose} className="w-10 h-10 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors border border-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-black text-[#0f426c]">Cảm ơn bạn!</h3>
            <p className="text-[#507588] font-medium text-sm">
              Yêu cầu tư vấn cho <span className="text-[#3087fe] font-bold">{packageName}</span> đã được gửi. Chuyên viên sẽ gọi cho bạn ngay!
            </p>
            <button onClick={onClose} className="w-full bg-[#144773] text-white font-black py-4 rounded-2xl hover:bg-[#3087fe] transition-all duration-300 shadow-lg uppercase tracking-widest text-sm">Đóng cửa sổ</button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-[#144773] to-[#0a233b] p-10 text-white">
              <h3 className="text-2xl font-black mb-2 tracking-tight">Tư vấn thiết bị</h3>
              <p className="text-blue-100 text-sm">Sản phẩm: <span className="text-cyan-400 font-bold">{packageName}</span></p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-4">
                <input required type="text" placeholder="Họ và tên" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3087fe] transition-all" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="tel" placeholder="Số điện thoại" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3087fe] transition-all" />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3087fe] transition-all" />
                </div>
                <textarea placeholder="Ghi chú thêm..." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3087fe] transition-all min-h-[100px]" />
              </div>
              <button type="submit" disabled={isLoading} className="w-full bg-[#144773] text-white font-black py-4 rounded-2xl hover:bg-[#3087fe] shadow-lg flex items-center justify-center gap-3 transition-all">
                {isLoading ? "Đang gửi..." : <><Send className="w-5 h-5" /> Gửi yêu cầu ngay</>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
