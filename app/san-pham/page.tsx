"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Monitor, ShieldCheck, Zap, Star, 
  ArrowRight, LayoutGrid, List, Package, Sparkles,
  CheckCircle2, Rocket, Activity, Filter, Server, PackageOpen
} from "lucide-react";
import Header from "@/components/Header";
import FooterNextjs from "@/components/FooterNextjs";

// Helper for formatting product name - Ensuring "Phần mềm quản lý" prefix
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
  if (n.includes("erp")) return "Phần mềm quản lý Doanh nghiệp ERP";
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
  
  // Capitalize first letter of the clean name
  let capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
  return `Phần mềm quản lý ${capitalized}`;
};

const getProductImage = (name: string) => {
  const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  
  if (n.includes("ban hang")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png";
  if (n.includes("bao hanh")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094922.png";
  if (n.includes("cafe")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094652.png";
  if (n.includes("bai xe") || n.includes("giu xe")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094734.png";
  if (n.includes("khach san")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094706.png";
  if (n.includes("kho pallet")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094850.png";
  if (n.includes("quan an")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094620.png";
  if (n.includes("quan ly kho") || n === "kho") return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094833.png";
  if (n.includes("van tai")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094910.png";
  if (n.includes("nha hang")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094719.png";
  if (n.includes("nhan su")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094932.png";
  if (n.includes("erp")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094952.png";
  if (n.includes("tra thuong") || n.includes("mat troi")) return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20095003.png";
  
  return "/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png";
};

// Simplified predefined list, name formatting will add the prefix
const PREDEFINED_PRODUCTS = [
  { tenSanPham: "Kho", slug: "kho", maLoai: "PHANMEM" },
  { tenSanPham: "Cafe", slug: "cafe", maLoai: "PHANMEM" },
  { tenSanPham: "Bán hàng", slug: "ban-hang", maLoai: "PHANMEM" },
  { tenSanPham: "Khách sạn", slug: "khach-san", maLoai: "PHANMEM" },
  { tenSanPham: "Nhà hàng", slug: "nha-hang", maLoai: "PHANMEM" },
  { tenSanPham: "Bãi xe", slug: "bai-xe", maLoai: "PHANMEM" },
  { tenSanPham: "Giữ xe Mobile", slug: "giu-xe-mobile", maLoai: "PHANMEM" },
  { tenSanPham: "Doanh nghiệp ERP", slug: "erp", maLoai: "PHANMEM" },
  { tenSanPham: "Nhân sự & Tiền lương", slug: "nhan-su", maLoai: "PHANMEM" },
  { tenSanPham: "Vận tải & Logistics", slug: "van-tai", maLoai: "PHANMEM" },
  { tenSanPham: "Quán ăn", slug: "quan-an", maLoai: "PHANMEM" },
  { tenSanPham: "Bảo hành", slug: "bao-hanh", maLoai: "PHANMEM" },
  { tenSanPham: "Kho Pallet", slug: "kho-pallet", maLoai: "PHANMEM" },
  { tenSanPham: "Trả thưởng Hệ Mặt Trời", slug: "tra-thuong", maLoai: "PHANMEM" }
];

export default function AllProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PREDEFINED_PRODUCTS);

  useEffect(() => {
    const results = PREDEFINED_PRODUCTS.filter(p => 
      p.tenSanPham.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
      formatProductName(p.tenSanPham).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );
    setFilteredProducts(results);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col pt-[96px]">
      <div className="fixed top-0 left-0 w-full bg-white z-[60] border-b border-gray-100 shadow-sm">
         <Header />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-24 bg-[#144773] overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-500/20 to-transparent blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white mb-8 backdrop-blur-xl shadow-lg">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em]">Hệ sinh thái phần mềm SOF</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-[1.1]">
            Trọn bộ giải pháp <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white italic">quản trị thông minh</span>
          </h1>
          
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-[#3087fe] rounded-[2.25rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
            <div className="relative">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3087fe] transition-colors w-7 h-7" />
              <input 
                type="text"
                placeholder="Tìm kiếm phần mềm của bạn..."
                className="w-full pl-18 pr-8 py-7 bg-white rounded-[2rem] shadow-2xl focus:outline-none text-xl font-bold text-[#0f426c] placeholder:text-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-7xl mx-auto px-6 flex-grow">
        <div className="text-center mb-16 px-4">
          <div className="flex items-center justify-center gap-3 text-[#3087fe] font-black uppercase tracking-[0.2em] text-[11px] mb-4 bg-blue-50 px-5 py-2 rounded-full w-fit mx-auto border border-blue-100">
            <LayoutGrid className="w-4 h-4" /> Danh mục giải pháp
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f426c] tracking-tight">Sẵn sàng triển khai ngay</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {filteredProducts.map((p, idx) => (
            <Link 
              key={idx} 
              href={`/san-pham/${p.maLoai.toLowerCase()}/${p.slug}`}
              className="group relative bg-white rounded-[3.5rem] border border-gray-100 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.035)] hover:shadow-[0_40px_90px_rgba(48,135,254,0.15)] transition-all duration-700 hover:-translate-y-4"
            >
              <div className="h-72 bg-[#fcfdfe] overflow-hidden relative p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3087fe]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <img 
                  src={getProductImage(p.tenSanPham)} 
                  alt={p.tenSanPham} 
                  className="w-full h-full object-contain rounded-[2.5rem] p-2 group-hover:scale-105 transition-transform duration-[1.5s]" 
                />
                
                <div className="absolute top-8 left-8">
                  <div className="px-5 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-white text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600 shadow-sm">
                    {p.maLoai}
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center text-[#3087fe] border border-white group-hover:bg-[#3087fe] group-hover:text-white transition-all duration-300">
                   <ArrowRight className="w-7 h-7" />
                </div>
              </div>
              
              <div className="p-10 pt-6">
                <div className="flex items-center gap-1 mb-6">
                   {[1,2,3,4].map((_, star) => (
                     <Star key={star} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                   ))}
                   <Star className="w-3.5 h-3.5 text-gray-200 fill-gray-200" />
                   <span className="text-[10px] font-black text-[#3087fe] ml-2 tracking-widest uppercase whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">GỢI Ý</span>
                </div>
                
                <h3 className="text-xl font-black text-[#0f426c] mb-4 group-hover:text-[#3087fe] transition-colors leading-tight min-h-[4rem] line-clamp-2">
                  {formatProductName(p.tenSanPham)}
                </h3>
                
                <p className="text-[#507588] font-medium leading-relaxed line-clamp-2 mb-10 text-[15px]">
                  Giải pháp quản lý chuyên sâu được thiết kế tối ưu, giúp vận hành thông minh và nâng cao hiệu suất doanh nghiệp.
                </p>
                
                <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-gray-100/60">
                   <div className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                     <CheckCircle2 className="w-3.5 h-3.5" /> Ổn định
                   </div>
                   <div className="px-3 py-1.5 bg-blue-50 text-[#3087fe] rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1.5">
                     <Zap className="w-3.5 h-3.5" /> High Perf
                   </div>
                   <div className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-100 flex items-center gap-1.5">
                     <ShieldCheck className="w-3.5 h-3.5" /> Bảo mật
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FooterNextjs />

      <style jsx global>{`
        .pl-18 { padding-left: 4.5rem; }
      `}</style>
    </div>
  );
}
