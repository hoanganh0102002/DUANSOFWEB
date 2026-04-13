"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, ArrowRight, Sparkles, LayoutGrid, Star,
  ShieldCheck, Truck, Cpu, Zap, Headphones, Package,
  CircleDot, ChevronRight, Monitor, Server
} from "lucide-react";
import Header from "@/components/Header";
import FooterNextjs from "@/components/FooterNextjs";

// ====== DỮ LIỆU SẢN PHẨM PHẦN CỨNG ======
const HARDWARE_PRODUCTS = [
  {
    name: "Cân Điện Tử Tính Tiền Thông Minh ONEPLUSONE C-L1",
    slug: "can-dien-tu",
    image: "/hinhanh/hw_pos_scale.png",
    desc: "Cân điện tử in tem – in hóa đơn, hỗ trợ 20.000 PLU, kết nối Ethernet/Wifi, phù hợp cho siêu thị mini và cửa hàng bán lẻ.",
    tags: ["In tem & hóa đơn", "20.000 PLU", "Wifi/Ethernet"],
    category: "Cân điện tử"
  },
  {
    name: "Máy POS Thu Ngân 2 Màn Hình Cảm Ứng",
    slug: "may-pos-2-man-hinh",
    image: "/hinhanh/hw_dual_pos.png",
    desc: "Hệ thống POS hiện đại với 2 màn hình, xử lý thanh toán nhanh, tích hợp phần mềm bán hàng chuyên nghiệp.",
    tags: ["Dual Screen", "Hiệu suất cao", "All-in-One"],
    category: "Máy POS"
  },
  {
    name: "Máy POS Cầm Tay Thông Minh",
    slug: "may-pos-cam-tay",
    image: "/hinhanh/hw_handheld.png",
    desc: "Máy POS cầm tay UROVO i9100, bán hàng linh hoạt, in hóa đơn mọi lúc mọi nơi, Android 13, pin 5200mAh.",
    tags: ["Cầm tay", "Android 13", "In nhiệt 58mm"],
    category: "Máy POS"
  },
  {
    name: "Máy In Hóa Đơn HPRT TP80NC-H",
    slug: "may-in-hoa-don",
    image: "/hinhanh/hw_printer.png",
    desc: "Máy in nhiệt tốc độ cao 200mm/s, cắt giấy tự động, kết nối USB + LAN, bền bỉ cho môi trường bán lẻ.",
    tags: ["In nhiệt", "200mm/s", "USB + LAN"],
    category: "Máy in"
  },
  {
    name: "Máy Quét Mã Vạch ICW 92108HS",
    slug: "may-quet-ma-vach",
    image: "/hinhanh/hw_scanner.png",
    desc: "Máy quét mã vạch 1D & 2D cầm tay, quét ảnh đa hướng, IP42, chịu rơi 1.5m, phù hợp mọi mô hình bán lẻ.",
    tags: ["1D/2D", "IP42", "Cầm tay"],
    category: "Máy quét"
  },
  {
    name: "Máy Quét Mã Vạch Đa Hướng Omni",
    slug: "may-quet-omni",
    image: "/hinhanh/hw_omni.png",
    desc: "Máy quét mã vạch đa hướng để bàn, quét tự động không cần bấm nút, lý tưởng cho quầy thu ngân chuyên nghiệp.",
    tags: ["Đa hướng", "Tự động quét", "Để bàn"],
    category: "Máy quét"
  },
  {
    name: "Két Tiền Mini MAKEN VK4102",
    slug: "ket-dung-tien",
    image: "/hinhanh/hw_drawer.png",
    desc: "Ngăn kéo đựng tiền 10 ngăn, vỏ thép sơn tĩnh điện, 3 chế độ khóa, kết nối RJ11, an toàn cho quầy thu ngân.",
    tags: ["10 ngăn", "Thép bền bỉ", "RJ11"],
    category: "Két tiền"
  },
  {
    name: "Giấy In Nhiệt K80x45mm",
    slug: "giay-in-nhiet",
    image: "/hinhanh/hw_paper.png",
    desc: "Giấy in nhiệt chất lượng cao, không chứa BPA, hình ảnh sắc nét, tương thích mọi máy in nhiệt.",
    tags: ["Không BPA", "Sắc nét", "K80x45mm"],
    category: "Vật tư"
  },
];

// Category filters
const CATEGORIES = ["Tất cả", "Máy POS", "Máy in", "Máy quét", "Cân điện tử", "Két tiền", "Vật tư"];

export default function HardwareProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [filteredProducts, setFilteredProducts] = useState(HARDWARE_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let results = HARDWARE_PRODUCTS;

    // Filter by category
    if (activeCategory !== "Tất cả") {
      results = results.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (searchTerm) {
      const q = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      results = results.filter(p =>
        p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q) ||
        p.desc.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q)
      );
    }

    setFilteredProducts(results);
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col pt-[96px]">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(48, 135, 254, 0.15); }
          50% { box-shadow: 0 0 0 15px rgba(48, 135, 254, 0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .card-enter { animation: fadeInScale 0.5s ease-out both; }
      `}</style>

      <div className="fixed top-0 left-0 w-full bg-white z-[60] border-b border-gray-100 shadow-sm">
        <Header />
      </div>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative py-24 bg-gradient-to-br from-[#0a3a5e] via-[#0f426c] to-[#1a5a8a] overflow-hidden">
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-cyan-500/10 to-transparent blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-400/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-10 right-20 w-72 h-72 bg-cyan-300/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        {/* Floating dots */}
        <div className="absolute top-20 left-[15%] w-2.5 h-2.5 bg-cyan-400/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-[20%] w-2 h-2 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-[40%] w-1.5 h-1.5 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white mb-8 backdrop-blur-xl shadow-lg ${isLoaded ? 'card-enter' : 'opacity-0'}`}>
            <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em]">Phần cứng chính hãng SOF</span>
          </div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1] ${isLoaded ? 'card-enter' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            Thiết bị phần cứng<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-white italic">chuyên dụng & chính hãng</span>
          </h1>

          <p className={`text-blue-200/80 text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-medium ${isLoaded ? 'card-enter' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Hệ thống thiết bị phần cứng được kiểm định kỹ lưỡng, đồng bộ hoàn hảo với phần mềm SOF, giúp vận hành bền bỉ 24/7.
          </p>

          {/* Search */}
          <div className={`max-w-2xl mx-auto relative group ${isLoaded ? 'card-enter' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-[#3087fe] rounded-[2.25rem] blur opacity-20 group-focus-within:opacity-60 transition duration-500"></div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3087fe] transition-colors w-6 h-6" />
              <input
                type="text"
                placeholder="Tìm kiếm thiết bị phần cứng..."
                className="w-full pl-16 pr-8 py-5 bg-white rounded-[2rem] shadow-2xl focus:outline-none text-lg font-bold text-[#0f426c] placeholder:text-gray-300 border border-white/50 focus:border-[#3087fe]/30 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Stats bar */}
          <div className={`mt-12 inline-flex items-center gap-6 lg:gap-10 ${isLoaded ? 'card-enter' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Package, value: "8+", label: "Sản phẩm" },
              { icon: ShieldCheck, value: "100%", label: "Chính hãng" },
              { icon: Headphones, value: "24/7", label: "Hỗ trợ" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                  <stat.icon className="w-5 h-5 text-cyan-300" />
                </div>
                <div className="text-left">
                  <p className="font-black text-white text-lg leading-tight">{stat.value}</p>
                  <p className="text-[11px] font-medium text-blue-200/60 tracking-wider uppercase">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORY FILTER + PRODUCT GRID ═══════════ */}
      <section className="py-16 max-w-7xl mx-auto px-6 flex-grow">
        {/* Results header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 text-[#3087fe] font-black uppercase tracking-[0.2em] text-[11px] mb-4 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-2 rounded-full w-fit mx-auto border border-blue-100/60">
            <LayoutGrid className="w-4 h-4" />
            Danh mục thiết bị
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0f426c] tracking-tight">
            {filteredProducts.length} sản phẩm phần cứng
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <Link
              key={idx}
              href={`/san-pham/phancung/${product.slug}`}
              className="group relative bg-white rounded-[2rem] border border-gray-100/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(48,135,254,0.12)] transition-all duration-500 hover:-translate-y-2 card-enter"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Category label */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-[#3087fe] uppercase tracking-wider border border-blue-100/50 shadow-sm">
                  {product.category}
                </span>
              </div>

              {/* Image */}
              <div className="h-56 bg-gradient-to-br from-[#f4f8ff] via-[#eef4fa] to-[#e8f0fa] overflow-hidden relative p-6 flex items-center justify-center">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                  backgroundImage: 'radial-gradient(circle, #3087fe 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#3087fe]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />

                {/* Arrow button */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-[#3087fe] border border-white/60 group-hover:bg-gradient-to-r group-hover:from-[#3087fe] group-hover:to-[#1a6aa8] group-hover:text-white group-hover:shadow-blue-300/30 transition-all duration-400 group-hover:scale-110">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400 drop-shadow-sm" />
                  ))}
                </div>

                <h3 className="text-[15px] font-extrabold text-[#0f426c] mb-2 group-hover:text-[#3087fe] transition-colors duration-300 leading-snug line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>

                <p className="text-[#507588] text-[13px] leading-relaxed line-clamp-2 mb-4">
                  {product.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                  {product.tags.map((tag, i) => {
                    const colors = [
                      "bg-emerald-50 text-emerald-600 border-emerald-100",
                      "bg-blue-50 text-[#3087fe] border-blue-100",
                      "bg-orange-50 text-orange-600 border-orange-100",
                    ];
                    return (
                      <span key={i} className={`px-2.5 py-1 ${colors[i % 3]} rounded-lg text-[10px] font-black uppercase tracking-wider border`}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Cpu className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-400 font-bold text-lg">Không tìm thấy thiết bị phù hợp</p>
            <p className="text-gray-300 text-sm mt-2">Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
            <button
              onClick={() => { setSearchTerm(""); setActiveCategory("Tất cả"); }}
              className="mt-5 px-6 py-2.5 bg-[#3087fe] text-white rounded-full text-sm font-bold hover:bg-[#1a6aa8] transition-colors"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}
      </section>

      <FooterNextjs />
    </div>
  );
}
