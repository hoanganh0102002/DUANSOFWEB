"use client";

import { useState, useEffect } from "react";
import {
  Cpu,
  Monitor,
  Globe,
  Grid3X3,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STATIC_PRODUCTS = [
  { id: 'BANHANG', tab: 'PHANMEM', title: 'Phần mềm Quản lý Bán hàng', desc: 'Giải pháp toàn diện giúp tự động hóa quy trình bán hàng, kiểm soát tồn kho và theo dõi doanh thu chính xác, tối ưu hóa lợi nhuận.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094757.png' },
  { id: 'BAOHANH', tab: 'PHANMEM', title: 'Phần mềm Quản lý Bảo hành', desc: 'Công cụ tra cứu lịch sử sửa chữa, theo dõi serial, cảnh báo hết hạn bảo hành và thông báo chăm sóc khách hàng tự động.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094922.png' },
  { id: 'CAFE', tab: 'PHANMEM', title: 'Phần mềm Quản lý Quán Cafe', desc: 'Giải pháp order nhanh chóng, quản lý nguyên vật liệu, tích điểm thành viên và báo cáo doanh thu trực quan theo thời gian thực.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094652.png' },
  { id: 'GIUXE', tab: 'PHANMEM', title: 'Phần mềm Quản lý Bãi xe', desc: 'Kiểm soát phương tiện ra vào bằng công nghệ nhận diện biển số thông minh, thẻ từ RFID, giám sát doanh thu vé an toàn, chống thất thoát.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094734.png' },
  { id: 'GIUXEMOBILE', tab: 'PHANMEM', title: 'Phần mềm Quản lý Bãi xe Mobile', desc: 'Ứng dụng soát vé đa năng trên thiết bị cầm tay, lý tưởng cho các bãi giữ xe lưu động, sự kiện, cổng trường, linh hoạt tối đa.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094734.png' },
  { id: 'KHACHSAN', tab: 'PHANMEM', title: 'Phần mềm Quản lý Khách sạn', desc: 'Hệ thống quản lý đặt phòng, nhận/trả phòng, buồng phòng và các dịch vụ tích hợp dành riêng cho các chuỗi khách sạn và resort.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094706.png' },
  { id: 'KHOPALLET', tab: 'PHANMEM', title: 'Phần mềm Quản lý Kho Pallet', desc: 'Quản lý, phân bổ hàng hóa nâng cao theo từng ô Pallet, tối ưu luồng di chuyển và theo dõi thời gian lưu trữ chính xác.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094850.png' },
  { id: 'QUANAN', tab: 'PHANMEM', title: 'Phần mềm Quản lý Quán ăn', desc: 'Tối ưu trải nghiệm thực khách với quy trình order thông minh, quản lý khu vực bàn, nhà bếp và in bill tốc độ cao.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094620.png' },
  { id: 'QUANKHO', tab: 'PHANMEM', title: 'Phần mềm Quản lý Kho', desc: 'Theo dõi hàng hóa xuất/nhập/tồn kho chính xác, hỗ trợ quét mã vạch và tối ưu hóa diện tích kho bãi.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094833.png' },
  { id: 'VANTAI', tab: 'PHANMEM', title: 'Phần mềm Quản lý Vận tải', desc: 'Điều phối đội xe, quản lý lộ trình vận chuyển, giám sát chi phí nhiên liệu và tự động hóa quy trình nghiệp vụ logistic.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094910.png' },
  { id: 'NHAHANG', tab: 'PHANMEM', title: 'Phần mềm Quản lý Nhà hàng', desc: 'Xử lý đơn hàng phức tạp từ nhiều kênh, định lượng công thức món ăn, tính toán giá vốn và quản trị chuỗi F&B chuyên nghiệp.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094719.png' },
  { id: 'NHANSU', tab: 'PHANMEM', title: 'Phần mềm Quản lý Nhân sự', desc: 'Tối ưu công tác HRM từ tuyển dụng, chấm công, tính lương đến đánh giá KPI nhân sự trên một nền tảng chuyên nghiệp duy nhất.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094932.png' },
  { id: 'ERP', tab: 'PHANMEM', title: 'Phần mềm Quản trị ERP', desc: 'Giải pháp hoạch định tài nguyên doanh nghiệp tổng thể: Kế toán, chuỗi cung ứng, sản xuất, bán hàng, và báo cáo phân tích mạnh mẽ.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20094952.png' },
  { id: 'TRATHUONG', tab: 'PHANMEM', title: 'Phần mềm Quản lý Trả thưởng Hệ Mặt trời', desc: 'Hệ thống quản lý điểm thưởng, doanh thu hoa hồng và các mô hình trả thưởng đa cấp độ cho dự án Năng lượng.', img: '/hinhanh/hinhphanmem/Screenshot%202026-04-08%20095003.png' },
  
  { id: 'HW_CAN_ONEPLUS', tab: 'PHANCUNG', title: 'Cân Điện Tử Tính Tiền Thông Minh ONEPLUSONE C-L1', desc: 'Thiết bị tính năng cao cấp phục vụ nhà hàng, siêu thị. Cân chính xác, báo cáo dữ liệu trực tiếp đến phần mềm thu ngân.', img: '/hinhanh/hw_pos_scale.png' },
  { id: 'HW_IN_HPRT', tab: 'PHANCUNG', title: 'Máy in hóa đơn HPRT TP80NC-H', desc: 'Máy in nhiệt công nghiệp tốc độ siêu nhạy, tự động cắt giấy, khả năng hoạt động liên tục trong môi trường doanh nghiệp.', img: '/hinhanh/hw_printer.png' },
  { id: 'HW_GIAY_IN', tab: 'PHANCUNG', title: 'Giấy in nhiệt K80x45mm', desc: 'Cuộn giấy in hóa đơn cao cấp bám mực tốt, dùng cho siêu thị, quán cafe đảm bảo biên lai rõ nét, chất lượng cao nhất.', img: '/hinhanh/hw_paper.png' },
  { id: 'HW_POS_CAMTAY', tab: 'PHANCUNG', title: 'Máy POS Cầm Tay Thông Minh', desc: 'Thiết bị nhỏ gọn tích hợp 2-in-1: vừa order cảm ứng mượt mà vừa in bill trực tiếp, siêu tiện lợi cho hệ thống bán lẻ di động.', img: '/hinhanh/hw_handheld.png' },
  { id: 'HW_POS_2MANHINH', tab: 'PHANCUNG', title: 'Máy POS Thu Ngân 2 Màn Hình Cảm Ứng iMin D4-504', desc: 'Thiết bị cảm ứng chuyên nghiệp, 2 màn hình kép tiện lợi cho cả thu ngân lẫn khách hàng. Thiết kế sang trọng bền bỉ.', img: '/hinhanh/hw_dual_pos.png' },
  { id: 'HW_QUET_ICW', tab: 'PHANCUNG', title: 'Máy Quét Mã Vạch ICW 92108HS', desc: 'Đầu đọc mã vạch chuyên dụng đáp ứng nhu cầu quét cực nhanh, nhận hình ảnh tự động. Thiết kế tay cầm linh hoạt.', img: '/hinhanh/hw_scanner.png' },
  { id: 'HW_KET_TIEN', tab: 'PHANCUNG', title: 'Két tiền Mini MAKEN VK4102', desc: 'Két tự động bật mở thông qua kết nối máy in thu ngân. Mật khẩu và chìa khóa kết cấu vững chắc, an toàn tuyệt đối.', img: '/hinhanh/hw_drawer.png' },
  { id: 'HW_IN_EPSON', tab: 'PHANCUNG', title: 'Máy in hóa đơn EPSON TM-T82III (USB+LAN)', desc: 'Dòng máy in Nhật Bản chuẩn mực dành cho nhà hàng, cafe với hỗ trợ kết nối mạng LAN/USB tối ưu nhất thị trường.', img: '/hinhanh/hw_printer.png' },
  { id: 'HW_QUET_1D2D', tab: 'PHANCUNG', title: 'Máy quét mã vạch ICW97201', desc: 'Máy quét đa hướng (omnidirectional) đặt bàn, quét cực nhạy mọi góc, nhận dạng tốt mã 1D và 2D trên màn hình ĐTDĐ.', img: '/hinhanh/hw_omni.png' },

  { id: 'WEBSITE', tab: 'DICHVU', title: 'Thiết kế Website Chuyên nghiệp', desc: 'Xây dựng hình ảnh thương hiệu trực tuyến với website Chuẩn SEO, giao diện hiện đại, tối ưu UX/UI và tốc độ tải trang cực cao.', img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80' },
  { id: 'HOSTING', tab: 'DICHVU', title: 'Hạ tầng Máy chủ & Hosting', desc: 'Cung cấp Cloud Server, VPS, Hosting với độ ổn định 99.9%, bảo vệ dữ liệu bằng công nghệ đám mây chống DDoS cao cấp.', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
  { id: 'BAOTRI', tab: 'DICHVU', title: 'Bảo trì Hệ thống Kỹ thuật', desc: 'Dịch vụ hỗ trợ trực tuyến 24/7, định kỳ kiểm tra, bảo dưỡng và khắc phục mọi sự cố kỹ thuật của doanh nghiệp nhanh chóng.', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
];

export const EcosystemSection = () => {
  const [activeTab, setActiveTab] = useState("TẤT CẢ");
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const topCategories = [
    { maLoai: "PHANMEM", tenLoai: "Phần mềm", icon: Monitor },
    { maLoai: "PHANCUNG", tenLoai: "Phần cứng", icon: Cpu },
    { maLoai: "DICHVU", tenLoai: "Dịch vụ", icon: Globe },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setDisplayCount(6);
  };

  const loadMoreProducts = () => {
    setDisplayCount(prev => prev + 6);
  };

  const displayedProducts = STATIC_PRODUCTS
    .filter(p => activeTab === "TẤT CẢ" || p.tab === activeTab)
    .slice(0, displayCount);

  const totalFilteredCount = STATIC_PRODUCTS
    .filter(p => activeTab === "TẤT CẢ" || p.tab === activeTab).length;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[10%] -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] -right-20 w-[30rem] h-[30rem] bg-red-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 border border-blue-100 shadow-sm animate-bounce">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Hệ Sinh Thái SOF</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0c3151] tracking-tighter leading-tight">
             Giải pháp công nghệ <br className="hidden md:block" />
             <span className="relative inline-block px-1">
               <span className="relative z-10 text-red-500">toàn diện</span>
               {/* Modern Professional Highlight */}
               <div className="absolute bottom-1 left-0 w-full h-3 bg-red-100/60 rounded-md -rotate-1 z-0 scale-x-105"></div>
             </span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg font-medium leading-relaxed">
             Tích hợp hoàn hảo giữa phần mềm thông minh, thiết bị hiện đại và dịch vụ tận tâm, kiến tạo đòn bẩy thành công cho mọi quy mô doanh nghiệp.
          </p>
        </div>

        {/* Categories / Tabs */}
        <div className="flex justify-center mb-20">
          <div className="inline-flex p-2 bg-gray-50/80 backdrop-blur-md rounded-[2.5rem] border border-gray-100 shadow-inner flex-wrap justify-center gap-2">
            <button
              onClick={() => handleTabChange("TẤT CẢ")}
              className={`group flex items-center gap-2 px-8 py-3.5 rounded-[2rem] transition-all duration-500 font-black text-xs uppercase tracking-widest ${activeTab === "TẤT CẢ"
                ? "bg-white shadow-xl text-blue-500 border border-blue-50"
                : "text-gray-400 hover:text-blue-500"}`}
            >
              <Grid3X3 className={`w-4 h-4 transition-transform group-hover:rotate-12`} />
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
                <cat.icon className="w-4 h-4 transition-transform group-hover:scale-125" />
                {cat.tenLoai}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedProducts.map((p, idx) => (
            <div
              key={p.id}
              className={`group relative bg-white p-2 rounded-[3.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(30,97,157,0.15)] transition-all duration-700 flex flex-col h-full hover:-translate-y-4 md:hover:scale-[1.02]`}
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 100}
            >
              <div className="p-6 flex-grow">
                {/* Image Container */}
                <div className={`relative w-full rounded-[2.5rem] overflow-hidden mb-8 transform-gpu transition-all duration-700 group-hover:scale-95 ${p.tab === 'PHANCUNG' ? 'h-64 bg-[#fcfdfe]' : 'aspect-square sm:aspect-[4/3] bg-gray-50'}`}>
                   {/* Decorative Shine */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                   
                   <img
                    src={p.img}
                    alt={p.title}
                    className={`w-full h-full p-4 transition-transform duration-[2s] group-hover:scale-110 ${p.tab === 'PHANCUNG' ? 'object-contain mix-blend-multiply' : 'object-contain'}`}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[10px] font-black uppercase tracking-widest text-[#0c3151] z-20">
                    {p.tab}
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

              {/* Action Footer */}
              <div className="mt-auto px-8 pb-8 pt-4 flex items-center justify-between border-t border-gray-50">
                 <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Premium quality</span>
                 </div>
                 <Link 
                   href={`/san-pham/${p.tab.toLowerCase()}/${encodeURIComponent(p.title.toLowerCase().replace(/ /g, '-'))}`} 
                   className="group/btn relative flex items-center gap-2 pl-4 pr-1 py-1 rounded-full bg-gray-50 hover:bg-[#0c3151] transition-all duration-500 shadow-sm border border-gray-100 hover:border-[#0c3151]/50 overflow-hidden"
                 >
                    <span className="text-[11px] font-bold text-[#0c3151] group-hover/btn:text-white transition-colors duration-300">
                      Tìm hiểu thêm
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0c3151] group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-500 shadow-sm">
                       <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                 </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {totalFilteredCount > displayCount && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={loadMoreProducts}
              className="group relative px-12 py-5 bg-[#0c3151] rounded-3xl text-white font-black text-xs uppercase tracking-[0.3em] overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-900/20"
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
