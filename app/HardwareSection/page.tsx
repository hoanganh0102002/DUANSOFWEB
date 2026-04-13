'use client';
import React from 'react';
import Header from '../../components/Header';
import BackgroundDecor from '../../components/BackgroundDecor';
import Footer from '../../components/FooterNextjs';
import { 
  Monitor, 
  Smartphone, 
  Printer, 
  ScanLine, 
  Banknote, 
  Scale, 
  CheckCircle2,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Danh sách ĐẦY ĐỦ các sản phẩm từ hình ảnh bạn cung cấp
const hardwareGroups = [
  {
    title: 'Máy POS Bán Hàng',
    subtitle: 'Mạnh mẽ, Ổn định, Màn hình cảm ứng đa điểm',
    description: [
      'Thiết kế nguyên khối sang trọng, chống nước và bụi bẩn tốt tại quầy.',
      'Cấu hình mạnh mẽ, xử lý giao dịch tốc độ cao không độ trễ.',
      'Tương thích hoàn hảo với phần mềm bán hàng SOF.',
      'Phù hợp cho Thu ngân Siêu thị, Nhà hàng, Chuỗi F&B.'
    ],
    imageSrc: '/hinhanh/hw_dual_pos.png', 
    icon: Monitor,
    color: 'text-[#3087fe]',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Thiết Bị POS Mini & Máy Tính Bảng',
    subtitle: 'Linh hoạt, Nhỏ gọn, Phục vụ tại bàn',
    description: [
      'Giải pháp di động cho phép nhân viên nhận đơn ở bất kỳ đâu.',
      'Tích hợp sẵn tính năng in hóa đơn và quét mã vạch (đối với POS Mini).',
      'Hỗ trợ truy cập báo cáo theo thời gian thực mọi lúc mọi nơi.',
      'Nâng cao hiệu suất và mang lại trải nghiệm hiện đại cho khách hàng.'
    ],
    imageSrc: '/hinhanh/hw_handheld.png',
    icon: Smartphone,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Máy In Hóa Đơn (K80)',
    subtitle: 'Tốc độ siêu tốc, Bản in sắc nét',
    description: [
      'Khả năng in tốc độ cao, giải quyết nhanh chóng hàng đợi tại quầy.',
      'Đầu in siêu bền, chống kẹt giấy và dao cắt tự động chuẩn xác.',
      'Đảm bảo hóa đơn và chứng từ giao dịch rõ ràng, chuyên nghiệp.',
      'Kết nối đa dạng: LAN, USB, Bluetooth tùy nhu cầu sử dụng.'
    ],
    imageSrc: '/hinhanh/hw_printer.png',
    icon: Printer,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Máy Quét Mã Vạch 1D/2D',
    subtitle: 'Nhận diện thông minh, Đọc mã siêu nhạy',
    description: [
      'Đọc mượt mà mọi loại mã vạch 1D và 2D (QR Code).',
      'Hoạt động tốt cả trên màn hình điện thoại hay mã vạch bị mờ, xước.',
      'Có chân đế đi kèm, hỗ trợ chế độ quét tự động (rảnh tay).',
      'Tối ưu hóa quy trình thanh toán và kiểm kê kho bãi.'
    ],
    imageSrc: '/hinhanh/hw_scanner.png',
    icon: ScanLine,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    title: 'Két Đựng Tiền Tự Động',
    subtitle: 'Bảo mật tuyệt đối, Quản lý dòng tiền an toàn',
    description: [
      'Phân chia nhiều ngăn linh hoạt cho các mệnh giá tiền khác nhau.',
      'Kết nối đồng bộ với máy in hóa đơn: Tự động bung két khi thanh toán.',
      'Chất liệu thép không gỉ nguyên khối, khóa bảo mật 3 chế độ.',
      'Hạn chế tối đa thất thoát và gian lận tại quầy thu ngân.'
    ],
    imageSrc: '/hinhanh/hw_drawer.png',
    icon: Banknote,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Cân Điện Tử Tích Hợp',
    subtitle: 'Định lượng chuẩn xác, Kết nối trực tiếp',
    description: [
      'Truyền dữ liệu trọng lượng trực tiếp vào phần mềm bán hàng SOF.',
      'Khử bỏ hoàn toàn sai số do nhập liệu thủ công.',
      'Màn hình LED hiển thị rõ ràng 2 mặt (cho nhân viên và khách hàng).',
      'Công cụ không thể thiếu cho siêu thị mini, cửa hàng thực phẩm, hoa quả.'
    ],
    imageSrc: '/hinhanh/hw_pos_scale.png',
    icon: Scale,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export default function HardwareSection() {
  const [currentImg, setCurrentImg] = useState(0);
  const heroImages = [
    '/hinhanh/hw_dual_pos.png',
    '/hinhanh/hw_handheld.png',
    '/hinhanh/hw_printer.png',
    '/hinhanh/hw_scanner.png',
    '/hinhanh/hw_drawer.png',
    '/hinhanh/hw_pos_scale.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-clip relative" style={{ background: '#f8fbff' }}>
      {/* 1. BACKGROUND SVG ĐỒNG BỘ TRANG CHỦ */}
      <BackgroundDecor />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* HEADER */}
        <Header />

        {/* --- INJECT CUSTOM KEYFRAME ANIMATIONS --- */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes customFloat {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes customFloatReverse {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(15px) rotate(-1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes customPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
          .anim-float { animation: customFloat 6s ease-in-out infinite; }
          .anim-float-reverse { animation: customFloatReverse 7s ease-in-out infinite; }
          .anim-pulse { animation: customPulse 5s ease-in-out infinite; }
        `}} />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-16 px-4 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

          <div className="flex-1 space-y-8 z-10" data-aos="fade-right" data-aos-duration="1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-blue-100 transition-transform hover:-translate-y-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e619d] animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest text-[#1e619d]">
                Hệ Sinh Thái Thiết Bị
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-[#1e619d] leading-tight">
              Giải Pháp Phần Cứng <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400 animate-pulse">SOF Chuyên Nghiệp</span>
            </h1>
            
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl text-justify">
              SOF cung cấp một dòng thiết bị phần cứng chuyên biệt, được thiết kế để hỗ trợ hoạt động kinh doanh hiện đại với tốc độ, độ chính xác và sự tiện lợi. Tất cả đều tương thích hoàn hảo, tạo nên trải nghiệm trọn vẹn cho khách hàng.
            </p>
            
            <div className="pt-2">
              {/* Nút đã được gỡ bỏ theo yêu cầu tối giản */}
            </div>
          </div>

          <div className="flex-1 w-full relative z-10" data-aos="zoom-in" data-aos-duration="1200">
            {/* Slider Hình ảnh thiết bị */}
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden bg-white/40 backdrop-blur-md border-[8px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex items-center justify-center p-12 group anim-float">
              <div className="absolute inset-0 bg-[#3087fe]/5 transition-colors group-hover:bg-[#3087fe]/10 z-0"></div>
              
              {heroImages.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt="Thiết bị phần cứng SOF" 
                  className={`absolute max-w-[85%] max-h-[85%] object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-1000 ease-in-out ${
                    idx === currentImg ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'
                  }`}
                />
              ))}

              {/* Chỉ báo slider (Dots) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroImages.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentImg ? 'w-8 bg-[#1e619d]' : 'w-2 bg-[#1e619d]/20'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl flex items-center gap-4 border border-blue-50 anim-float-reverse">
              <div className="w-14 h-14 bg-[#1e619d] text-white rounded-2xl flex items-center justify-center shadow-lg">
                <PackageCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="font-black text-[#1e619d] text-lg">Bền bỉ - Chính xác</p>
                <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Vận hành 24/7</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- HARDWARE STATS SECTION --- */}
        <section className="w-full flex justify-center px-4 lg:px-8 relative z-20 -mt-8 mb-20">
          <div className="w-full max-w-6xl bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(30,58,138,0.06)] py-12 px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-blue-50 border border-white/60" data-aos="fade-up">
            <div className="text-center p-4">
              <div className="text-[36px] font-black text-[#1e619d] mb-1 leading-none">5+ Năm</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Tuổi thọ đầu in</div>
            </div>
            <div className="text-center p-4">
              <div className="text-[36px] font-black text-[#1e619d] mb-1 leading-none">IP65</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Kháng bụi & nước</div>
            </div>
            <div className="text-center p-4">
              <div className="text-[36px] font-black text-[#1e619d] mb-1 leading-none">Plug & Play</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Kết nối tích tắc</div>
            </div>
            <div className="text-center p-4">
              <div className="text-[36px] font-black text-[#1e619d] mb-1 leading-none">99%</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Tỷ lệ hài lòng</div>
            </div>
          </div>
        </section>

        {/* --- DANH MỤC TỪNG THIẾT BỊ (XEN KẼ) --- */}
        <section id="kham-pha" className="py-24 relative z-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-28">
            {hardwareGroups.map((group, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-14 lg:gap-24`} data-aos={isEven ? "fade-right" : "fade-left"} data-aos-duration="1200">
                  
                  {/* Khối Hình ảnh với hiệu ứng Spotlight */}
                  <div className="flex-1 w-full group relative">
                    <div className="absolute inset-0 bg-blue-400/5 rounded-[3rem] blur-3xl group-hover:bg-blue-400/10 transition-colors"></div>
                    <div className="relative rounded-[3rem] overflow-hidden bg-white/40 backdrop-blur-md p-10 shadow-[0_20px_50px_rgba(30,58,138,0.06)] border border-white/80 group-hover:shadow-[0_30px_80px_rgba(30,97,157,0.15)] transition-all duration-500 hover:-translate-y-3 flex justify-center items-center h-[420px]">
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-3 py-1 rounded-full bg-[#1e619d] text-white text-[10px] font-black uppercase tracking-widest">SOF Original</div>
                      </div>
                      
                      <img 
                        src={group.imageSrc} 
                        alt={group.title} 
                        className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                      />
                    </div>
                  </div>

                  {/* Khối Nội dung Chuyên nghiệp */}
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border border-white bg-white/60 backdrop-blur-md ${group.color} shadow-xl shadow-blue-900/5 group-hover:rotate-6 transition-transform`}>
                          <group.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <p className={`font-black text-xs uppercase tracking-[0.2em] ${group.color} mb-1 opacity-80`}>
                            {group.subtitle}
                          </p>
                          <h3 className="text-3xl lg:text-4xl font-black text-[#1e619d]">
                            {group.title}
                          </h3>
                        </div>
                      </div>
                      <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {group.description.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/30 border border-white/50 hover:bg-white/50 transition-all hover:translate-x-2 group/item">
                          <div className={`mt-1 w-6 h-6 rounded-full ${group.bgColor} ${group.color} flex items-center justify-center shrink-0 shadow-sm group-hover/item:scale-110 transition-transform`}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-gray-600 text-base leading-relaxed font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- BANNER TỔNG KẾT --- */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <div className="bg-[#1e619d] rounded-[3.5rem] p-12 md:p-20 text-white overflow-hidden relative shadow-[0_40px_100px_rgba(30,97,157,0.3)] flex flex-col md:flex-row items-center justify-between gap-12" data-aos="zoom-in" data-aos-duration="1000">
              
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none anim-pulse"></div>
              
              <div className="relative z-10 flex-1 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                  Xây dựng hệ thống <br /><span className="text-blue-300">bán hàng chuyên nghiệp</span>
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed max-w-2xl opacity-90">
                  Hãy liên hệ ngay với đội ngũ SOF để được tư vấn thiết bị phù hợp nhất với mô hình kinh doanh của bạn. Chúng tôi cam kết mang đến giải pháp tối ưu và tiết kiệm chi phí nhất.
                </p>
              </div>

              <div className="relative z-10 flex-shrink-0">
                <Link href="/contact" className="inline-block bg-white text-[#1e619d] px-10 py-5 rounded-full font-black shadow-2xl hover:bg-blue-50 hover:scale-105 hover:shadow-white/20 transition-all duration-300 uppercase tracking-widest text-sm">
                  Liên Hệ Ngay
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- BACK TO HOME --- */}
        <div className="py-12 flex justify-center" data-aos="fade-up">
           <Link href="/" className="group flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-blue-200 text-[#1e619d] font-black shadow-xl hover:bg-[#1e619d] hover:text-white transition-all duration-500 uppercase tracking-widest text-xs">
              <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại trang chủ
           </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}