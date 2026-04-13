"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/FooterNextjs";
import BackgroundDecor from "@/components/BackgroundDecor";
import { usePathname } from "next/navigation";
import { Activity, ShieldCheck, Clock, Layers, CheckCircle2, Database } from "lucide-react";
import { 
  HeroSection, 
  ProductTabs,
  FeaturesSection, 
  PlatformSection, 
  PricingSection, 
  FaqSection, 
  CtaSection, 
  SuggestionsSection,
  FeaturesSummary
} from "./components/ProductSections";

// === HARDWARE IMPORTS (tách riêng, không đụng software) ===
import HardwareProductView from "./components/hardware/HardwareProductView";
import { findHardwareProduct } from "./components/data/hardware/hardwareData";

// Hàm phát hiện sản phẩm phần cứng từ URL
function isHardwareProduct(category: string, slug: string): boolean {
  const c = category.toLowerCase();
  const s = slug.toLowerCase();
  
  // Phát hiện theo category trong URL
  if (c === "phancung" || c === "phan-cung") return true;
  
  // Phát hiện theo keyword trong slug
  const hardwareKeywords = [
    "can-dien-tu", "may-in", "may-quet", "pos", "tu-dung-tien",
    "giay-in", "phancung", "can-tinh-tien", "oneplusone",
    "cân", "máy-in", "máy-quét"
  ];
  return hardwareKeywords.some(k => s.includes(k));
}

export default function ProductDetailPage() {
  const pathname = usePathname();
  const [productName, setProductName] = useState("Phần mềm Quản lý Kho Full 2025");
  const [activeTab, setActiveTab] = useState("tongquan");

  // Phần cứng state
  const [isHardware, setIsHardware] = useState(false);
  const [hardwareProduct, setHardwareProduct] = useState<any>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("/");
      // URL: /san-pham/[category]/[slug]
      const category = parts.length >= 3 ? parts[parts.length - 2] : "";
      const slug = parts[parts.length - 1];

      if (slug) {
        // === KIỂM TRA PHẦN CỨNG ===
        if (isHardwareProduct(category, slug)) {
          const hwProduct = findHardwareProduct(slug);
          if (hwProduct) {
            setIsHardware(true);
            setHardwareProduct(hwProduct);
            return; // Không chạy logic phần mềm
          }
        }

        // === LOGIC PHẦN MỀM (GIỮ NGUYÊN 100%) ===
        setIsHardware(false);
        let fullTitle = "";
        const s = slug.toLowerCase();

        // Mapping slug to Full Title
        if (s.includes("cafe")) fullTitle = "Phần mềm Quản lý Cafe";
        else if (s.includes("kho-pallet")) fullTitle = "Phần mềm quản lý Kho Pallet";
        else if (s.includes("kho")) fullTitle = "Phần mềm Quản lý Kho";
        else if (s.includes("ban-hang")) fullTitle = "Phần mềm Quản lý Bán hàng";
        else if (s.includes("khach-san")) fullTitle = "Phần mềm Quản lý Khách sạn";
        else if (s.includes("nha-hang")) fullTitle = "Phần mềm Quản lý Nhà hàng";
        else if (s.includes("giu-xe-mobile")) fullTitle = "Phần mềm Quản lý Giữ xe Mobile";
        else if (s.includes("bai-xe") || s.includes("giu-xe")) fullTitle = "Hệ thống Quản lý Bãi xe";
        else if (s.includes("erp")) fullTitle = "Giải pháp ERP Doanh nghiệp";
        else if (s.includes("nhan-su")) fullTitle = "Phần mềm Quản lý Nhân sự";
        else if (s.includes("van-tai")) fullTitle = "Phần mềm Quản lý Vận tải";
        else if (s.includes("quan-an")) fullTitle = "Phần mềm Quản lý Quán ăn";
        else if (s.includes("bao-hanh")) fullTitle = "Phần mềm Quản lý Bảo hành";
        else if (s.includes("mat-troi")) fullTitle = "Hệ thống Điện mặt trời";
        else if (s.includes("tra-thuong")) fullTitle = "Hệ thống Quản lý Trả thưởng";
        else {
          fullTitle = decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        }

        setProductName(fullTitle);
      }
    }
  }, [pathname]);

  const faqs = [
    { q: "Có thời gian dùng thử không?", a: "SOF cung cấp 14 ngày dùng thử miễn phí đầy đủ tính năng. Bạn không cần nhập thông tin thẻ tín dụng để bắt đầu." },
    { q: "Có hỗ trợ đào tạo sử dụng không?", a: "Chúng tôi có đội ngũ chuyên viên hỗ trợ 1-kèm-1 trong suốt thời gian triển khai, cùng với tài liệu và video hướng dẫn chi tiết." },
    { q: "Dữ liệu có được bảo mật không?", a: "Dữ liệu của bạn được mã hóa an toàn với chuẩn quốc tế và sao lưu (backup) liên tục trên nền tảng điện toán đám mây." },
    { q: "Phần mềm có tích hợp với thiết bị khác không?", a: "Có, hệ thống hỗ trợ kết nối trực tiếp đến máy in, máy quét, két tiền, cân điện tử và các phần cứng chuyên dụng khác." }
  ];

  const features = [
    { title: "Hiệu suất vượt trội", desc: "Không cần cài đặt ứng dụng, được cập nhật liên tục thông qua nền tảng web.", icon: <Activity className="w-7 h-7" /> },
    { title: "Bảo mật cao", desc: "Hệ thống được bảo mật theo tiêu chuẩn quốc tế và phân quyền chặt chẽ.", icon: <ShieldCheck className="w-7 h-7" /> },
    { title: "Hỗ trợ 24/7", desc: "Đội ngũ kỹ thuật hỗ trợ trực tuyến không kể ngày đêm.", icon: <Clock className="w-7 h-7" /> },
    { title: "Dữ liệu real-time", desc: "Đồng bộ doanh thu, kho v.v qua mọi thiết bị tức thời.", icon: <Database className="w-7 h-7" /> },
    { title: "Tùy biến linh hoạt", desc: "Cấu hình quy trình logic nghiệp vụ theo yêu cầu doanh nghiệp.", icon: <Layers className="w-7 h-7" /> },
    { title: "Dễ sử dụng", desc: "Thiết kế hiện đại, tinh gọn với số click ít nhất có thể.", icon: <CheckCircle2 className="w-7 h-7" /> }
  ];

  // ========================================
  // RENDER: PHẦN CỨNG (giao diện riêng)
  // ========================================
  if (isHardware && hardwareProduct) {
    return (
      <div className="relative min-h-screen flex flex-col bg-[#f8fbff] selection:bg-[#3087fe] selection:text-white font-sans overflow-x-hidden">
        <BackgroundDecor />
        <Header />
        <div className="h-[96px]"></div>

        <main className="flex-grow w-full relative">
          <HardwareProductView product={hardwareProduct} />
        </main>

        <div className="relative z-20 mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  // ========================================
  // RENDER: PHẦN MỀM (giữ nguyên 100% code cũ)
  // ========================================
  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fbff] selection:bg-[#3087fe] selection:text-white font-sans overflow-x-hidden">
      <BackgroundDecor />
      <Header />
      <div className="h-[96px]"></div>

      <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <HeroSection productName={productName} />
      
      <main className="flex-grow w-full relative">
        {activeTab === "tongquan" ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PlatformSection productName={productName} />
            <FeaturesSummary features={features} />
            <PricingSection productName={productName} />
            <FaqSection faqs={faqs} />
          </div>
        ) : activeTab === "tinhnang" ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <FeaturesSection features={features} />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PricingSection productName={productName} />
          </div>
        )}
        <CtaSection />
        <SuggestionsSection />
      </main>

      <div className="relative z-20 mt-auto">
        <Footer />
      </div>


    </div>
  );
}

