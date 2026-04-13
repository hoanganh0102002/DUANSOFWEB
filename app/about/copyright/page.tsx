"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";
import {
    Calendar, Languages, ArrowLeft, ShieldAlert, FileText, Award, CheckCircle2
} from "lucide-react";

// ==========================================
// BỘ TỪ ĐIỂN 3 NGÔN NGỮ
// ==========================================
const translations = {
    vi: {
        breadcrumb: "Trang chủ / Thông tin /",
        breadcrumbCurrent: "BẢN QUYỀN",
        pageTitle: "Chính sách & Bản quyền",
        pageSubtitle: "Quy định về quyền sở hữu trí tuệ và thông tin pháp lý của SOF.",
        ipTitle: "1. Quyền sở hữu trí tuệ",
        ipContent: "Toàn bộ nội dung, mã nguồn, hình ảnh và logo hiển thị trên website sof.com.vn thuộc quyền sở hữu của Công ty TNHH SOF.",
        regTitle: "2. Thông tin đăng ký",
        regNum: "Số ĐKKD: 0310690184 — Ngày cấp: 15/03/2011",
        regAuth: "Cơ quan cấp: Sở kế hoạch và Đầu tư TPHCM",
        certTitle: "Giấy Chứng Nhận Đăng Ký Quyền Tác Giả",
        loadingDate: "Đang tải...",
        backHome: "Quay lại trang chủ",
    },
    en: {
        breadcrumb: "Home / Information /",
        breadcrumbCurrent: "COPYRIGHT",
        pageTitle: "Policy & Copyright",
        pageSubtitle: "Intellectual property regulations and legal information of SOF.",
        ipTitle: "1. Intellectual Property Rights",
        ipContent: "All content, source code, images, and logos displayed on the sof.com.vn website are the property of SOF Co., Ltd.",
        regTitle: "2. Registration Information",
        regNum: "Business Registration Number: 0310690184 — Date of issue: 15/03/2011",
        regAuth: "Issuing Authority: Department of Planning and Investment of HCMC",
        certTitle: "Certificate of Copyright Registration",
        loadingDate: "Loading...",
        backHome: "Back to Home",
    },
    zh: {
        breadcrumb: "首页 / 信息 /",
        breadcrumbCurrent: "版权",
        pageTitle: "政策与版权",
        pageSubtitle: "SOF的知识产权规定和法律信息。",
        ipTitle: "1. 知识产权",
        ipContent: "sof.com.vn 网站上显示的所有内容、源代码、图像和徽标均属于 SOF 有限公司的财产。",
        regTitle: "2. 注册信息",
        regNum: "商业登记号：0310690184 — 签发日期：2011年3月15日",
        regAuth: "签发机构：胡志明市计划投资厅",
        certTitle: "著作权登记证书",
        loadingDate: "加载中...",
        backHome: "返回首页",
    }
};

type Language = "vi" | "en" | "zh";

export default function CopyrightPage() {
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
    };

    const t = translations[lang];

    return (
        <div className="relative min-h-screen flex flex-col bg-[#f4f7fb] selection:bg-[#3087fe] selection:text-white font-sans overflow-hidden">
            <BackgroundDecor />
            <Header />

            {/* Khoảng trống để bù cho Header fixed */}
            <div className="h-[96px]"></div>

            {/* TOP NAVIGATION BAR */}
            <div className="border-b border-white/40 bg-white/70 backdrop-blur-xl sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap justify-between items-center gap-4">
                    <nav className="text-xs sm:text-sm text-[#507588] font-medium tracking-wide flex items-center gap-1">
                        <Link href="/" className="hover:text-[#3087fe] transition-colors">{lang === "vi" ? "Trang chủ" : lang === "en" ? "Home" : "首页"}</Link>
                        <span>/</span>
                        <span>{lang === "vi" ? "Thông tin" : lang === "en" ? "Information" : "信息"}</span>
                        <span>/</span>
                        <span className="text-[#3087fe] font-bold">{t.breadcrumbCurrent}</span>
                    </nav>

                    <div className="flex items-center gap-4 sm:gap-6 text-sm text-[#0f426c] font-semibold">
                        <div className="flex items-center gap-2 bg-white/60 px-4 py-1.5 rounded-full border border-blue-100/50 shadow-sm">
                            <Calendar className="w-4 h-4 text-[#3087fe]" />
                            <span className="text-[#4a6372]">{currentDate || t.loadingDate}</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-pointer bg-white/60 px-4 py-1.5 rounded-full border border-blue-100/50 shadow-sm transition-all hover:bg-white hover:border-[#3087fe]/30">
                            <Languages className="w-4 h-4 text-[#3087fe]" />
                            <select
                                value={lang}
                                onChange={(e) => changeLang(e.target.value as Language)}
                                className="bg-transparent outline-none cursor-pointer text-[#4a6372] hover:text-[#3087fe] transition-colors appearance-none font-bold"
                            >
                                <option value="vi">Tiếng Việt</option>
                                <option value="en">English</option>
                                <option value="zh">中文</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto px-4 lg:px-8 py-16 relative z-10 w-full">

                <div className="absolute top-20 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
                <div className="absolute bottom-20 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                {/* HERO TITLE */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm border border-white">
                        <Award className="w-8 h-8 text-[#3087fe]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0f426c] to-[#3087fe] tracking-tight mb-4 drop-shadow-sm pb-2">
                        {t.pageTitle}
                    </h1>
                    <p className="text-lg text-[#507588] max-w-2xl mx-auto font-medium">
                        {t.pageSubtitle}
                    </p>
                </div>

                {/* BENTO GRID LAYOUT - ĐÃ CHỈNH TỶ LỆ 6 CỘT / 6 CỘT ĐỂ HÌNH TO HƠN */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

                    {/* CỘT TRÁI: NỘI DUNG VĂN BẢN (Chiếm 6 cột - 50%) */}
                    <div className="lg:col-span-6 flex flex-col gap-8">

                        <div className="bg-white/80 backdrop-blur-lg rounded-[32px] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(48,135,254,0.08)] transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 text-[#3087fe] rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0">
                                        <ShieldAlert className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-xl lg:text-2xl font-extrabold text-[#0f426c]">{t.ipTitle}</h2>
                                </div>
                                <div className="pl-[76px]">
                                    <p className="text-[#507588] text-[16px] leading-relaxed font-medium">
                                        {t.ipContent}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-lg rounded-[32px] p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(251,146,60,0.08)] transition-all duration-500 group relative overflow-hidden h-full">
                            <div className="absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br from-orange-50 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0">
                                        <FileText className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-xl lg:text-2xl font-extrabold text-[#0f426c]">{t.regTitle}</h2>
                                </div>
                                <div className="pl-[76px] space-y-4">
                                    <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-[#507588] text-[15px] sm:text-[16px] font-medium">{t.regNum}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                        <span className="text-[#507588] text-[15px] sm:text-[16px] font-medium">{t.regAuth}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* CỘT PHẢI: HÌNH ẢNH GIẤY CHỨNG NHẬN */}
                    <div className="lg:col-span-6 h-full relative">
                        <div className="relative bg-[#0f426c] rounded-[40px] p-6 shadow-[0_20px_50px_rgba(15,66,108,0.2)] flex flex-col items-center justify-between h-full overflow-hidden group">

                            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#3087fe] rounded-full mix-blend-screen filter blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen filter blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>

                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 text-center tracking-wide drop-shadow-md z-10">
                                {t.certTitle}
                            </h3>

                            {/* Khung chứa ảnh - Thêm thẻ <a> để click mở link ảnh trực tiếp */}
                            <div className="w-full flex-grow flex items-center justify-center z-10 transform transition-all duration-500 group-hover:-translate-y-2">
                                <a 
                                    href="/hinhanh/Screenshot 2026-04-07 155944.png" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="cursor-zoom-in"
                                >
                                    <img
                                        src="/hinhanh/Screenshot 2026-04-07 155944.png"
                                        alt="Giấy chứng nhận bản quyền SOF"
                                        className="w-full h-full max-h-[600px] object-contain rounded-[16px] drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* NÚT QUAY LẠI TRANG CHỦ CHÍNH GIỮA */}
                <div className="mt-16 flex justify-center">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgb(48,135,254,0.15)] border border-transparent hover:border-blue-100 text-[#0f426c] font-bold text-[16px] transition-all hover:-translate-y-1"
                    >
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-[#3087fe] group-hover:text-white transition-colors duration-300">
                            <ArrowLeft className="w-5 h-5" />
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