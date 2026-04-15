"use client";

import { useState, useEffect } from "react";
import {
  Cpu,
  Monitor,
  Globe,
  Grid3X3,
  ArrowRight,
  Shield,
  Sparkles,
  ShoppingBag,
  Loader2
} from "lucide-react";
import Link from "next/link";

export const EcosystemSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("TẤT CẢ");
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    const loadProducts = async () => {
        try {
            const res = await fetch("/api/site/products");
            const data = await res.json();
            if (data.success) {
                // Dòng dữ liệu chuẩn từ DB
                setProducts(data.data || []);
            }
        } catch (e) {
            console.error("Failed to load products:", e);
        } finally {
            setIsLoading(false);
        }
    };
    loadProducts();
  }, []);

  const topCategories = [
    { maLoai: "SOFTWARE", tenLoai: "Phần mềm", icon: Monitor },
    { maLoai: "HARDWARE", tenLoai: "Phần cứng", icon: Cpu },
    // Dịch vụ tĩnh hoặc có thể thêm vào DB sau
    { maLoai: "DICHVU", tenLoai: "Dịch vụ", icon: Globe },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setDisplayCount(6);
  };

  const loadMoreProducts = () => {
    setDisplayCount(prev => prev + 6);
  };

  const filteredProducts = products.filter(p => activeTab === "TẤT CẢ" || p.tab === activeTab);
  const displayedProducts = filteredProducts.slice(0, displayCount);
  const totalFilteredCount = filteredProducts.length;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-[10%] -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] -right-20 w-[30rem] h-[30rem] bg-red-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100 shadow-sm animate-bounce">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Hệ Sinh Thái SOF</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0c3151] tracking-tighter leading-tight">
             Công nghệ 
             <span className="relative inline-block px-1">
               <span className="relative z-10 text-red-500">toàn diện</span>
               <div className="absolute bottom-1 left-0 w-full h-3 bg-red-100/60 rounded-md -rotate-1 z-0 scale-x-105"></div>
             </span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-20">
          <div className="inline-flex p-2 bg-gray-50/80 backdrop-blur-md rounded-[2.5rem] border border-gray-100 shadow-inner flex-wrap justify-center gap-2">
            <button
              onClick={() => handleTabChange("TẤT CẢ")}
              className={`group flex items-center gap-2 px-8 py-3.5 rounded-[2rem] transition-all duration-500 font-black text-xs uppercase tracking-widest ${activeTab === "TẤT CẢ"
                ? "bg-white shadow-xl text-blue-500 border border-blue-50"
                : "text-gray-400 hover:text-blue-500"}`}
            >
              <Grid3X3 className="w-4 h-4" />
              Tất cả
            </button>
            {topCategories.map((cat) => (
              <button
                key={cat.maLoai}
                onClick={() => handleTabChange(cat.maLoai)}
                className={`group flex items-center gap-2 px-8 py-3.5 rounded-[2rem] transition-all duration-500 font-black text-xs uppercase tracking-widest ${activeTab === cat.maLoai
                  ? "bg-white shadow-xl text-blue-500 border border-blue-50"
                  : "text-gray-400 hover:text-blue-500"}`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.tenLoai}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
             <p className="text-gray-400 font-bold animate-pulse">Đang kết nối kho dữ liệu...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedProducts.map((p, idx) => (
              <div
                key={p.slug || idx}
                className={`group relative bg-white p-2 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(30,97,157,0.15)] transition-all duration-700 flex flex-col h-full hover:-translate-y-4`}
              >
                <div className="p-6 flex-grow">
                  <div className={`relative w-full rounded-[2.5rem] overflow-hidden mb-8 transform-gpu transition-all duration-700 group-hover:scale-95 ${p.tab === 'HARDWARE' ? 'h-64 bg-[#fcfdfe]' : 'aspect-square bg-gray-50'}`}>
                    <img
                      src={p.img || '/hinhanh/placeholder.png'}
                      alt={p.title}
                      className="w-full h-full p-4 object-contain transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[10px] font-black uppercase tracking-widest text-[#0c3151] z-20">
                      {p.tab === 'SOFTWARE' ? 'Phần mềm' : p.tab === 'HARDWARE' ? 'Phần cứng' : p.tab}
                    </div>
                  </div>

                  <div className="px-2">
                     <h3 className="text-xl font-black text-[#0c3151] mb-4 leading-tight min-h-[56px] line-clamp-2 group-hover:text-blue-500 transition-colors">
                       {p.title}
                     </h3>
                     <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-3 mb-8">
                       {p.desc}
                     </p>
                  </div>
                </div>

                <div className="mt-auto px-8 pb-8 pt-4 flex items-center justify-between border-t border-gray-50">
                   <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Premium quality</span>
                   </div>
                   <Link 
                     href={`/san-pham/${p.tab?.toLowerCase() || 'software'}/${p.slug}`} 
                     className="group/btn relative flex items-center gap-2 pl-4 pr-1 py-1 rounded-full bg-gray-50 hover:bg-[#0c3151] transition-all duration-500"
                   >
                      <span className="text-[11px] font-bold text-[#0c3151] group-hover/btn:text-white transition-colors">Tìm hiểu thêm</span>
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0c3151] group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-500 shadow-sm">
                         <ArrowRight className="w-5 h-5" />
                      </div>
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && totalFilteredCount > displayCount && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={loadMoreProducts}
              className="group relative px-12 py-5 bg-[#0c3151] rounded-3xl text-white font-black text-xs uppercase tracking-[0.3em] overflow-hidden hover:scale-105 transition-all shadow-2xl shadow-blue-900/20"
            >
              <span className="relative z-10 flex items-center gap-3">
                 Tải thêm vật phẩm <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
