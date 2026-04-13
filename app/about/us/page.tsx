"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";
import {
  Calendar, Languages, ArrowLeft, Building2, MonitorSmartphone,
  ShieldCheck, FileSpreadsheet, Server, ShoppingCart, Settings
} from "lucide-react";

// ==========================================
// BỘ TỪ ĐIỂN 3 NGÔN NGỮ
// ==========================================
const translations = {
  vi: {
    breadcrumb: "Trang chủ / Thông tin /",
    breadcrumbCurrent: "GIỚI THIỆU",
    pageTitle: "Giải pháp toàn diện cho doanh nghiệp",
    aboutBadge: "VỀ CHÚNG TÔI",
    introTitle: "Công ty TNHH SOF",
    introContent: "Là đơn vị hàng đầu trong lĩnh vực phần mềm quản lý doanh nghiệp, website thương mại điện tử và website giới thiệu doanh nghiệp. Với nền tảng công nghệ tiên tiến, SOF mang đến cho khách hàng giải pháp thống nhất từ quản lý nội bộ đến bán hàng trực tuyến. Chúng tôi cung cấp đầy đủ các phần mềm quản lý doanh nghiệp và dịch vụ xây dựng phần mềm theo yêu cầu, đáp ứng linh hoạt mọi mô hình và quy mô hoạt động.",
    techTitle: "Công nghệ hiện đại - Tích hợp toàn diện",
    techList: [
      "Ứng dụng công nghệ web cao cấp, tích hợp đồng bộ các hệ thống và thiết bị trên một nền tảng duy nhất.",
      "Hoạt động ổn định trên mọi hệ điều hành server: Linux & Windows.",
      "Sử dụng trên mọi thiết bị: iPad, iPhone, Mac, Android, Windows, Linux.",
      "Chỉ với một màn hình thao tác duy nhất cùng hệ thống phím tắt thông minh, làm việc nhanh hơn, chính xác hơn."
    ],
    securityTitle: "Bảo mật & Thân thiện",
    securityList: [
      "Phân quyền bảo mật chi tiết cho từng chức năng.",
      "Người dùng chỉ được thao tác đúng vai trò.",
      "Toàn quyền kiểm soát hệ thống và dữ liệu.",
      "Tùy chọn cột hiển thị, sắp xếp & lọc dữ liệu linh hoạt.",
      "Quản lý dữ liệu trực quan trên một màn hình."
    ],
    dataTitle: "Xuất - nhập dữ liệu linh hoạt",
    dataContent: "Hỗ trợ kết xuất dữ liệu ra Word, Excel và nạp dữ liệu từ Excel, giúp doanh nghiệp chủ động trong báo cáo và phân tích.",
    linuxTitle: "Tối ưu chi phí với Linux",
    linuxContent: "Tiết kiệm chi phí bản quyền không cần thiết mà vẫn đảm bảo hiệu năng. SOF có nhiều năm kinh nghiệm triển khai server Linux và tư vấn hạ tầng CNTT.",
    ecomTitle: "Website TMĐT tích hợp quản lý",
    ecomList: [
      "Tự động hiển thị số lượng tồn kho trên website.",
      "Quản lý đơn hàng & tự động gửi email xác nhận.",
      "Thanh toán trực tuyến: PayPal, thẻ tín dụng, ngân hàng...",
      "Hoàn toàn làm chủ hoạt động kinh doanh online."
    ],
    serviceTitle: "Dịch vụ SOF cung cấp",
    services: [
      "Bảo trì phần mềm & hệ thống mạng",
      "Triển khai hệ thống CNTT tổng thể",
      "Xây dựng phần mềm & website theo yêu cầu",
      "Cung cấp domain & hosting"
    ],
    thanks: "SOF chân thành cảm ơn các khách hàng thân thiết đã tin tưởng và sử dụng hệ thống quản lý của SOF trong hoạt động kinh doanh.",
    backHome: "Quay lại trang chủ",
    loadingDate: "Đang tải..."
  },
  en: {
    breadcrumb: "Home / Information /",
    breadcrumbCurrent: "ABOUT US",
    pageTitle: "Comprehensive Business Solutions",
    aboutBadge: "ABOUT US",
    introTitle: "SOF Co., Ltd",
    introContent: "A leader in enterprise software, e-commerce, and corporate websites. With an advanced technology platform, SOF provides unified solutions from internal management to online sales. We offer full enterprise software and custom development to flexibly meet all operational scales.",
    techTitle: "Modern Tech - Full Integration",
    techList: [
      "High-end web tech for synchronous integration of systems.",
      "Stable on all server OS: Linux & Windows.",
      "Works on all devices: iPad, iPhone, Mac, Android, Windows, Linux.",
      "Single-screen operation with smart shortcuts for fast, accurate work."
    ],
    securityTitle: "Security & User Friendly",
    securityList: [
      "Detailed security permissions per function.",
      "Role-based action enforcement.",
      "Total control over systems and data.",
      "Customizable columns, flexible sorting & filtering.",
      "Visual data management on one screen."
    ],
    dataTitle: "Flexible Data Import/Export",
    dataContent: "Supports exporting to Word/Excel and importing from Excel, empowering businesses in reporting and analysis.",
    linuxTitle: "Cost Optimization with Linux",
    linuxContent: "Save unnecessary licensing costs while maintaining high performance. Years of experience in Linux server deployment and IT infrastructure consulting.",
    ecomTitle: "E-commerce with Management",
    ecomList: [
      "Auto-display real-time inventory on website.",
      "Efficient order management & auto-email confirmation.",
      "Online payments: PayPal, credit cards, bank transfers...",
      "Fully master your online business."
    ],
    serviceTitle: "Services Provided by SOF",
    services: [
      "Software & network maintenance",
      "Total IT system deployment",
      "Custom software & web development",
      "Domain & hosting provision"
    ],
    thanks: "We sincerely thank our loyal customers for trusting and using SOF's management systems.",
    backHome: "Back to Home",
    loadingDate: "Loading..."
  },
  zh: {
    breadcrumb: "首页 / 信息 /",
    breadcrumbCurrent: "关于我们",
    pageTitle: "全面的企业解决方案",
    aboutBadge: "关于我们",
    introTitle: "SOF有限公司",
    introContent: "企业管理软件、电子商务及企业介绍网站领域的领军者。凭借先进的技术平台，SOF提供从内部管理到在线销售的统一解决方案。我们提供全套管理软件及定制开发服务，灵活适应各种运营模式。",
    techTitle: "现代技术 - 全面集成",
    techList: [
      "高端Web技术，在单一平台上同步集成各类系统与设备。",
      "在所有服务器系统上稳定运行：Linux与Windows。",
      "适配所有设备：iPad、iPhone、Mac、Android、Windows、Linux。",
      "单屏操作配合智能快捷键，工作更快速、更准确。"
    ],
    securityTitle: "安全与用户友好",
    securityList: [
      "针对每个功能的详细安全权限。",
      "用户仅限按分配角色操作。",
      "全面掌控系统与数据。",
      "自定义显示列，灵活的排序与筛选。",
      "单屏可视化数据管理。"
    ],
    dataTitle: "灵活的数据导入/导出",
    dataContent: "支持导出Word、Excel及从Excel导入，助力企业主动进行报告与分析。",
    linuxTitle: "通过Linux优化成本",
    linuxContent: "节省不必要的版权费用并确保高性能。在Linux服务器部署及IT基础设施咨询方面拥有多年经验。",
    ecomTitle: "集成管理的电子商务网站",
    ecomList: [
      "网站自动显示实时库存。",
      "高效订单管理及自动确认邮件。",
      "在线支付：PayPal、信用卡、银行转账等。",
      "完全掌控您的在线业务。"
    ],
    serviceTitle: "SOF 提供的服务",
    services: [
      "软件与网络维护",
      "整体IT系统部署",
      "定制软件与网站开发",
      "提供域名与主机托管"
    ],
    thanks: "SOF真诚感谢广大忠实客户信任并使用我们的管理系统。",
    backHome: "返回首页",
    loadingDate: "加载中..."
  }
};

type Language = "vi" | "en" | "zh";

export default function AboutUsPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const today = new Date();
    setCurrentDate(`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`);

    const savedLang = localStorage.getItem("sof_lang") as Language;
    if (savedLang === "vi" || savedLang === "en" || savedLang === "zh") {
      setLang(savedLang);
    }
  }, []);

  const changeLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("sof_lang", l);
    // Bắn event để Header hoặc Footer (nếu có ở ngoài) cập nhật theo luôn
    window.dispatchEvent(new Event("storage"));
  };

  const t = translations[lang];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f0f4f9] selection:bg-[#3087fe] selection:text-white">
      <BackgroundDecor />
      <Header />

      {/* Khoảng trống để bù cho Header fixed */}
      <div className="h-[96px]"></div>

      {/* ========================================================= */}
      {/* TOP BAR: BREADCRUMB + NGÀY THÁNG + NGÔN NGỮ */}
      {/* ========================================================= */}
      <div className="border-b border-[#a7d5ec]/30 bg-white/40 backdrop-blur-md relative z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
          {/* Bên Trái: Breadcrumb */}
          <nav className="text-sm text-[#507588] font-medium tracking-wide flex items-center gap-1">
            <Link href="/" className="hover:text-[#3087fe] transition-colors">{lang === "vi" ? "Trang chủ" : lang === "en" ? "Home" : "首页"}</Link>
            <span>/</span>
            <span>{lang === "vi" ? "Thông tin" : lang === "en" ? "Information" : "信息"}</span>
            <span>/</span>
            <span className="text-[#3087fe] font-bold uppercase">{t.breadcrumbCurrent}</span>
          </nav>

          {/* Bên Phải: Lịch & Chọn ngôn ngữ */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm text-[#0f426c] font-semibold">
            <div className="flex items-center gap-2 bg-[#f0f4f9] px-4 py-1.5 rounded-full border border-blue-50 text-[#0f426c]">
              <Calendar className="w-4 h-4 text-[#3087fe]" />
              <span>{currentDate || t.loadingDate}</span>
            </div>

            <div className="flex items-center gap-1.5 group cursor-pointer text-[#0f426c]">
              <Languages className="w-4 h-4 text-[#3087fe]" />
              <select
                value={lang}
                onChange={(e) => changeLang(e.target.value as Language)}
                className="bg-transparent outline-none cursor-pointer hover:text-[#3087fe] transition-colors font-medium appearance-none"
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
          <p className="text-lg text-[#507588] max-w-3xl italic">
            {t.thanks}
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-auto">

          {/* Khối 1: Intro */}
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#0f426c] to-[#1e619d] rounded-[2rem] p-8 lg:p-12 text-white shadow-xl relative overflow-hidden group">
            <Building2 className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold tracking-widest mb-6 backdrop-blur-sm">
                {t.aboutBadge}
              </span>
              <h2 className="text-3xl font-black mb-6">{t.introTitle}</h2>
              <p className="text-blue-100 text-[16px] lg:text-[18px] leading-relaxed text-justify">
                {t.introContent}
              </p>
            </div>
          </div>

          {/* Khối 2: Công nghệ */}
          <div className="md:col-span-1 lg:col-span-2 bg-white rounded-[2rem] p-8 border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 text-[#3087fe] rounded-2xl flex items-center justify-center mb-6">
              <MonitorSmartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0f426c] mb-4">{t.techTitle}</h3>
            <ul className="space-y-2 text-[#4a6372] text-sm leading-relaxed">
              {t.techList.map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-[#3087fe] font-bold mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Khối 3: Bảo mật */}
          <div className="md:col-span-1 lg:col-span-2 bg-white rounded-[2rem] p-8 border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0f426c] mb-4">{t.securityTitle}</h3>
            <ul className="space-y-2 text-[#4a6372] text-sm leading-relaxed">
              {t.securityList.map((item, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-emerald-500 font-bold mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Khối 4: TMĐT */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#f8fbff] to-white rounded-[2rem] p-8 border border-[#a7d5ec]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0f426c] mb-6">{t.ecomTitle}</h3>
            <div className="space-y-4">
              {t.ecomList.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-50">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-[#4a6372] text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Khối 5: Dữ liệu */}
          <div className="bg-white rounded-[2rem] p-8 border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0f426c] mb-2">{t.dataTitle}</h3>
              <p className="text-[#4a6372] text-sm leading-relaxed">{t.dataContent}</p>
            </div>
          </div>

          {/* Khối 6: Linux */}
          <div className="bg-white rounded-[2rem] p-8 border border-blue-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0f426c] mb-2">{t.linuxTitle}</h3>
              <p className="text-[#4a6372] text-sm leading-relaxed">{t.linuxContent}</p>
            </div>
          </div>

          {/* Khối 7: Dịch vụ SOF */}
          <div className="md:col-span-3 lg:col-span-4 bg-[#0f426c] rounded-[2rem] p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <Settings className="w-8 h-8 text-[#3087fe] animate-[spin_10s_linear_infinite]" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.serviceTitle}</h3>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {t.services.map((item, i) => (
                <span key={i} className="px-4 py-2 bg-white/10 text-blue-50 rounded-full text-sm backdrop-blur-md border border-white/5">
                  {item}
                </span>
              ))}
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