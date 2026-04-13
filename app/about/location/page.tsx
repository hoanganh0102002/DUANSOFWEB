"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";
import { 
  Calendar, Languages, ArrowLeft, MapPin, Phone, Mail, Navigation 
} from "lucide-react";

// ==========================================
// BỘ TỪ ĐIỂN 3 NGÔN NGỮ
// ==========================================
const translations = {
  vi: {
    breadcrumb: "Trang chủ / Thông tin /",
    breadcrumbCurrent: "VỊ TRÍ CÔNG TY",
    pageTitle: "Vị trí công ty",
    pageSubtitle: "Hệ thống trụ sở và văn phòng đại diện của SOF",
    hqTitle: "Trụ sở chính TP.HCM",
    address: "69/9 Đường D9, Phường Tây Thạnh, Tân Phú, TP. HCM",
    phone: "028.38.152.465 - 028.38.152.364",
    email: "info@sof.vn",
    getDirections: "Chỉ đường đi (Google Maps)",
    loadingDate: "Đang tải...",
    backHome: "Quay lại trang chủ",
  },
  en: {
    breadcrumb: "Home / Information /",
    breadcrumbCurrent: "LOCATION",
    pageTitle: "Company Location",
    pageSubtitle: "Headquarters and representative offices of SOF",
    hqTitle: "HCMC Headquarters",
    address: "69/9 D9 Street, Tay Thanh Ward, Tan Phu Dist, HCMC",
    phone: "028.38.152.465 - 028.38.152.364",
    email: "info@sof.vn",
    getDirections: "Get Directions (Google Maps)",
    loadingDate: "Loading...",
    backHome: "Back to Home",
  },
  zh: {
    breadcrumb: "首页 / 信息 /",
    breadcrumbCurrent: "公司位置",
    pageTitle: "公司位置",
    pageSubtitle: "SOF 的总部和代表处",
    hqTitle: "胡志明市总部",
    address: "胡志明市新富郡西盛坊D9路69/9号",
    phone: "028.38.152.465 - 028.38.152.364",
    email: "info@sof.vn",
    getDirections: "获取路线 (Google Maps)",
    loadingDate: "加载中...",
    backHome: "返回首页",
  }
};

type Language = "vi" | "en" | "zh";

export default function LocationPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    // 1. Lấy ngày tháng hiện tại
    const today = new Date();
    setCurrentDate(`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`);

    // 2. Nhớ ngôn ngữ đã chọn từ các trang trước
    const savedLang = localStorage.getItem("sof_lang") as Language;
    if (savedLang === "vi" || savedLang === "en" || savedLang === "zh") {
      setLang(savedLang);
    }
  }, []);

  const changeLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("sof_lang", l);
  };

  const t = translations[lang];

  // Link trỏ thẳng tới Google Maps chỉ đường
  const googleMapsDirectionsLink = "https://www.google.com/maps/dir/?api=1&destination=CÔNG+TY+TNHH+SOF,+69/9+Đường+D9,+Tây+Thạnh,+Tân+Phú,+Hồ+Chí+Minh";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f0f4f9] selection:bg-[#3087fe] selection:text-white">
      <BackgroundDecor />
      <Header />

      {/* Khoảng trống để bù cho Header fixed */}
      <div className="h-[96px]"></div>

      {/* TOP NAVIGATION BAR (Thanh công cụ sticky giữ nguyên từ trang Về Chúng Tôi) */}
      <div className="border-b border-[#a7d5ec]/30 bg-white/60 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap justify-between items-center gap-4">
          <nav className="text-xs sm:text-sm text-[#507588] font-medium tracking-wide flex items-center gap-1">
            <Link href="/" className="hover:text-[#3087fe] transition-colors">{lang === "vi" ? "Trang chủ" : lang === "en" ? "Home" : "首页"}</Link>
            <span>/</span>
            <span>{lang === "vi" ? "Thông tin" : lang === "en" ? "Information" : "信息"}</span>
            <span>/</span>
            <span className="text-[#3087fe] font-bold">{t.breadcrumbCurrent}</span>
          </nav>
          
          <div className="flex items-center gap-6 text-sm text-[#0f426c] font-semibold">
            <div className="flex items-center gap-2 bg-[#f0f4f9] px-3 py-1.5 rounded-full border border-blue-100">
              <Calendar className="w-4 h-4 text-[#3087fe]" />
              <span>{currentDate || t.loadingDate}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <Languages className="w-4 h-4 text-[#3087fe]" />
              <select 
                value={lang} 
                onChange={(e) => changeLang(e.target.value as Language)}
                className="bg-transparent outline-none cursor-pointer hover:text-[#3087fe] transition-colors appearance-none"
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 lg:px-6 py-12 relative z-10 w-full">
        
        {/* HERO TITLE */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f426c] tracking-tight mb-4">
            {t.pageTitle}
          </h1>
          <p className="text-lg text-[#507588] max-w-3xl">
            {t.pageSubtitle}
          </p>
        </div>

        {/* BENTO GRID LAYOUT - VỊ TRÍ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* CỘT TRÁI: THÔNG TIN ĐỊA CHỈ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group h-full flex flex-col">
              
              {/* Viền xanh bên trái giống thiết kế UI của bác */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#3087fe] rounded-l-[2rem]"></div>

              <h2 className="text-2xl font-bold text-[#0f426c] mb-8 relative z-10">
                {t.hqTitle}
              </h2>

              <div className="space-y-6 flex-grow relative z-10">
                {/* Địa chỉ */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 text-[#3087fe]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-[#4a6372] text-[16px] leading-relaxed pt-1.5">
                    {t.address}
                  </p>
                </div>

                {/* Điện thoại */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <p className="text-[#4a6372] text-[16px] leading-relaxed pt-1.5 font-medium">
                    {t.phone}
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0 text-orange-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <p className="text-[#4a6372] text-[16px] leading-relaxed pt-1.5">
                    <a href="mailto:info@sof.vn" className="hover:text-[#3087fe] transition-colors">
                      {t.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* NÚT CHỈ ĐƯỜNG */}
              <div className="mt-10 relative z-10">
                <a 
                  href={googleMapsDirectionsLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full group flex items-center justify-center gap-3 bg-[#0f426c] text-white px-8 py-4 rounded-xl shadow-md hover:bg-[#3087fe] hover:shadow-lg transition-all duration-300 font-bold text-[16px]"
                >
                  <Navigation className="w-5 h-5 group-hover:animate-bounce" />
                  {t.getDirections}
                </a>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: BẢN ĐỒ GOOGLE MAPS NHÚNG */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] p-2 border border-blue-50 shadow-lg h-[400px] lg:h-full min-h-[500px] relative overflow-hidden">
              {/* iframe nhúng Google Maps */}
              <iframe 
                src="https://maps.google.com/maps?q=CÔNG%20TY%20TNHH%20SOF%2069/9%20Đường%20D9%20Tây%20Thạnh%20Tân%20Phú&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                className="rounded-[1.5rem] border-0"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* NÚT QUAY LẠI TRANG CHỦ CHÍNH GIỮA */}
        <div className="mt-12 flex justify-center">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-3 bg-white px-8 py-3 rounded-full shadow-sm hover:shadow-md border border-blue-100 text-[#0f426c] font-bold transition-all hover:-translate-y-1"
          >
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-[#3087fe] group-hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            {t.backHome}
          </Link>
        </div>

      </main>

      <div className="relative z-20 mt-auto">
        <Footer />
      </div>
      
    </div>
  );
}