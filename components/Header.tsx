"use client";

import React, { useState, useEffect } from 'react';
import {
  ChevronDown, Monitor, Cpu, Globe,
  ChevronRight, ArrowRight, LogOut, User
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { productService } from "@/services/productService";
import { useAuth } from '@/components/providers/AuthProvider';

// ====== DỮ LIỆU TĨNH ĐẦY ĐỦ CHO MEGA MENU ======
const STATIC_SOFTWARES = [
  { tenSanPham: 'Phần mềm Quản lý Bán hàng', slug: 'ban-hang', noiDungShort: 'Tự động hóa quy trình bán hàng, kiểm soát tồn kho và theo dõi doanh thu chính xác.' },
  { tenSanPham: 'Phần mềm Quản lý Bảo hành', slug: 'bao-hanh', noiDungShort: 'Tra cứu lịch sử sửa chữa, theo dõi serial, cảnh báo hết hạn bảo hành tự động.' },
  { tenSanPham: 'Phần mềm Quản lý Quán Cafe', slug: 'cafe', noiDungShort: 'Giải pháp order nhanh, quản lý nguyên vật liệu và tích điểm thành viên.' },
  { tenSanPham: 'Phần mềm Quản lý Bãi xe', slug: 'bai-xe', noiDungShort: 'Nhận diện biển số thông minh, thẻ từ RFID, giám sát doanh thu vé an toàn.' },
  { tenSanPham: 'Phần mềm Quản lý Bãi xe Mobile', slug: 'giu-xe-mobile', noiDungShort: 'Soát vé đa năng trên thiết bị cầm tay, lý tưởng cho bãi xe lưu động.' },
  { tenSanPham: 'Phần mềm Quản lý Khách sạn', slug: 'khach-san', noiDungShort: 'Quản lý đặt phòng, nhận/trả phòng và dịch vụ tích hợp cho khách sạn.' },
  { tenSanPham: 'Phần mềm Quản lý Kho Pallet', slug: 'kho-pallet', noiDungShort: 'Quản lý hàng hóa theo từng ô Pallet, tối ưu luồng di chuyển chính xác.' },
  { tenSanPham: 'Phần mềm Quản lý Quán ăn', slug: 'quan-an', noiDungShort: 'Quy trình order thông minh, quản lý khu vực bàn và in bill tốc độ cao.' },
  { tenSanPham: 'Phần mềm Quản lý Kho', slug: 'kho', noiDungShort: 'Theo dõi xuất/nhập/tồn kho chính xác, hỗ trợ quét mã vạch tối ưu.' },
  { tenSanPham: 'Phần mềm Quản lý Vận tải', slug: 'van-tai', noiDungShort: 'Điều phối đội xe, giám sát chi phí nhiên liệu và tự động hóa logistics.' },
  { tenSanPham: 'Phần mềm Quản lý Nhà hàng', slug: 'nha-hang', noiDungShort: 'Xử lý đơn hàng đa kênh, định lượng công thức và quản trị chuỗi F&B.' },
  { tenSanPham: 'Phần mềm Quản lý Nhân sự', slug: 'nhan-su', noiDungShort: 'Tuyển dụng, chấm công, tính lương và đánh giá KPI trên một nền tảng.' },
  { tenSanPham: 'Phần mềm Quản trị ERP', slug: 'erp', noiDungShort: 'Hoạch định tài nguyên doanh nghiệp: Kế toán, chuỗi cung ứng, sản xuất.' },
  { tenSanPham: 'Phần mềm Trả thưởng Hệ Mặt trời', slug: 'tra-thuong', noiDungShort: 'Quản lý điểm thưởng, hoa hồng và mô hình trả thưởng đa cấp.' },
];

const STATIC_HARDWARES = [
  { tenSanPham: 'Cân Điện Tử ONEPLUSONE C-L1', slug: 'can-dien-tu', noiDungShort: 'Cân tính tiền in tem, hỗ trợ 20.000 PLU, kết nối Ethernet/Wifi.' },
  { tenSanPham: 'Máy POS 2 Màn Hình iMin D4-504', slug: 'may-pos-2-man-hinh', noiDungShort: 'POS cảm ứng chuyên nghiệp 2 màn hình kép, thiết kế sang trọng bền bỉ.' },
  { tenSanPham: 'Máy POS Cầm Tay Thông Minh', slug: 'may-pos-cam-tay', noiDungShort: 'Thiết bị nhỏ gọn 2-in-1: order cảm ứng + in bill trực tiếp linh hoạt.' },
  { tenSanPham: 'Máy In Hóa Đơn HPRT TP80NC-H', slug: 'may-in-hoa-don', noiDungShort: 'In nhiệt tốc độ 200mm/s, cắt giấy tự động, kết nối USB + LAN.' },
  { tenSanPham: 'Máy Quét Mã Vạch ICW 92108HS', slug: 'may-quet-ma-vach', noiDungShort: 'Quét mã vạch 1D & 2D cầm tay, IP42, chịu rơi 1.5m siêu bền.' },
  { tenSanPham: 'Máy Quét Mã Vạch Omni ICW97201', slug: 'may-quet-omni', noiDungShort: 'Quét đa hướng để bàn, tự động quét không cần bấm nút.' },
  { tenSanPham: 'Két Tiền Mini MAKEN VK4102', slug: 'ket-dung-tien', noiDungShort: 'Ngăn kéo 10 ngăn thép sơn tĩnh điện, 3 chế độ khóa, kết nối RJ11.' },
  { tenSanPham: 'Giấy In Nhiệt K80x45mm', slug: 'giay-in-nhiet', noiDungShort: 'Giấy in nhiệt cao cấp không BPA, hình ảnh sắc nét tương thích mọi máy.' },
];

const STATIC_SERVICES = [
  { tenSanPham: 'Thiết kế Website', slug: 'website', noiDungShort: 'Website chuẩn SEO, giao diện hiện đại, tối ưu UX/UI.' },
  { tenSanPham: 'Hạ tầng Hosting', slug: 'hosting', noiDungShort: 'Cloud Server, VPS, Hosting ổn định 99.9% uptime.' },
  { tenSanPham: 'Bảo trì Hệ thống', slug: 'bao-tri', noiDungShort: 'Hỗ trợ kỹ thuật 24/7, bảo dưỡng định kỳ chuyên nghiệp.' },
];

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeMegaTab, setActiveMegaTab] = useState<'softwares' | 'hardwares' | 'services'>('softwares');

  // Dùng data tĩnh đầy đủ cho mega menu (14 phần mềm + 8 phần cứng + dịch vụ)
  const softwares = STATIC_SOFTWARES;
  const hardwares = STATIC_HARDWARES;
  const services = STATIC_SERVICES;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentMegaData = activeMegaTab === 'softwares' ? softwares : activeMegaTab === 'hardwares' ? hardwares : services;
  const ActiveIcon = activeMegaTab === 'softwares' ? Monitor : activeMegaTab === 'hardwares' ? Cpu : Globe;
  const viewAllLink = activeMegaTab === 'softwares' ? '/san-pham' : activeMegaTab === 'hardwares' ? '/san-pham/phancung' : '/san-pham';
  const viewAllLabel = activeMegaTab === 'softwares' ? 'phần mềm' : activeMegaTab === 'hardwares' ? 'phần cứng' : 'dịch vụ';
  const productCount = activeMegaTab === 'softwares' ? '14' : activeMegaTab === 'hardwares' ? '8' : '3';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-xl' : 'bg-transparent py-2'}`}>
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center h-20">

        {/* LOGO & HOTLINE */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center shrink-0">
            <img 
              src="/hinhanh/favicon-96x96.png" 
              alt="SOF Logo" 
              className="h-14 md:h-16 w-auto object-contain cursor-pointer transform group-hover:scale-110 transition-transform duration-300" 
            />
          </Link>
          <div className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-full text-sm font-bold border border-red-100 shadow-sm">
            <span className="text-[#ef4444]">Hotline:</span>
            <a href="tel:0933549469" className="hover:underline hover:text-red-700 transition-colors">0933 549 469</a>
            <span className="opacity-30">|</span>
            <a href="tel:0932518569" className="hover:underline hover:text-red-700 transition-colors">0932 518 569</a>
          </div>
        </div>

        {/* NAVIGATION MENUS */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-[#0f426c] h-full">

          {/* 1. GIỚI THIỆU */}
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 hover:text-[#3087fe] transition-colors focus:outline-none outline-none h-full">
              Giới thiệu <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 top-full -mt-2 pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                <Link href="/about/us" className="block px-5 py-3 text-gray-600 hover:bg-blue-50 hover:text-[#3087fe] border-b border-gray-50 focus:outline-none outline-none">Về chúng tôi</Link>
                <Link href="/about/location" className="block px-5 py-3 text-gray-600 hover:bg-blue-50 hover:text-[#3087fe] border-b border-gray-50 focus:outline-none outline-none">Vị trí công ty</Link>
                <Link href="/about/copyright" className="block px-5 py-3 text-gray-600 hover:bg-blue-50 hover:text-[#3087fe] focus:outline-none outline-none">Bản quyền</Link>
              </div>
            </div>
          </div>

          {/* 2. MEGA MENU SẢN PHẨM */}
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 hover:text-[#3087fe] transition-colors focus:outline-none outline-none h-full">
              Sản phẩm <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>

            {/* Khung Mega Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="w-[850px] lg:w-[1000px] bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex overflow-hidden min-h-[400px] max-h-[600px]">

                {/* Cột Trái: Danh mục */}
                <div className="w-[28%] bg-white p-6 border-r border-gray-50 flex flex-col gap-2">
                  <p className="text-[11px] font-bold text-gray-400 mb-2 tracking-widest">LĨNH VỰC</p>

                  <button
                    onMouseEnter={() => setActiveMegaTab('softwares')}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 focus:outline-none outline-none ${activeMegaTab === 'softwares' ? 'bg-[#f4f8ff] text-[#3087fe] shadow-sm border border-blue-100' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5" />
                      <span className="font-bold text-sm">PHẦN MỀM</span>
                    </div>
                    {activeMegaTab === 'softwares' && <ChevronRight className="w-4 h-4" />}
                  </button>

                  <button
                    onMouseEnter={() => setActiveMegaTab('hardwares')}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 focus:outline-none outline-none ${activeMegaTab === 'hardwares' ? 'bg-[#f4f8ff] text-[#3087fe] shadow-sm border border-blue-100' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Cpu className="w-5 h-5" />
                      <span className="font-bold text-sm">PHẦN CỨNG</span>
                    </div>
                    {activeMegaTab === 'hardwares' && <ChevronRight className="w-4 h-4" />}
                  </button>

                  <button
                    onMouseEnter={() => setActiveMegaTab('services')}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 focus:outline-none outline-none ${activeMegaTab === 'services' ? 'bg-[#f4f8ff] text-[#3087fe] shadow-sm border border-blue-100' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5" />
                      <span className="font-bold text-sm">DỊCH VỤ</span>
                    </div>
                    {activeMegaTab === 'services' && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Cột Phải: Dữ liệu Sản phẩm */}
                {/* Cột Phải: Dữ liệu Sản phẩm */}
                <div className="w-[72%] bg-white p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#0f426c] flex items-center gap-2">
                        <div className="w-1.5 h-7 bg-[#3087fe] rounded-full"></div>
                        Hệ Sinh Thái Giải Pháp
                      </h3>
                      <p className="text-gray-500 text-[14px] mt-1.5">Tối ưu hóa quy trình vận hành và tăng doanh thu cho doanh nghiệp của bạn.</p>
                    </div>
                    <Link href={viewAllLink} className="flex-shrink-0 bg-blue-50 text-[#3087fe] px-5 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#3087fe] hover:text-white transition-colors flex items-center gap-1 group/btn focus:outline-none outline-none whitespace-nowrap">
                      Xem tất cả {viewAllLabel} ({productCount}) <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>

                  {/* Lưới Sản Phẩm - Có scroll */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '400px' }}>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      {currentMegaData.map((item, index) => {
                        const productSlug = item.slug || encodeURIComponent(item.tenSanPham || 'product').toLowerCase().replace(/%20/g, '-');
                        const productCategory = activeMegaTab === 'softwares' ? 'phanmem' : activeMegaTab === 'hardwares' ? 'phancung' : 'dichvu';
                        return (
                          <Link href={`/san-pham/${productCategory}/${productSlug}`} key={index} className="flex items-start gap-3 group/item focus:outline-none outline-none p-2 rounded-xl hover:bg-[#f4f8ff] transition-colors">
                            {/* Icon nền xanh đậm */}
                            <div className="w-[44px] h-[44px] bg-[#1a5b8e] text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover/item:bg-[#3087fe] group-hover/item:-translate-y-0.5 transition-all duration-300">
                              <ActiveIcon className="w-5 h-5" />
                            </div>
                            <div className="pt-0.5 min-w-0">
                              <h4 className="font-bold text-[#0f426c] text-[14px] group-hover/item:text-[#3087fe] transition-colors leading-tight truncate">
                                {item.tenSanPham}
                              </h4>
                              <p className="text-[12.5px] text-gray-500 mt-1 line-clamp-1 leading-relaxed">
                                {item.noiDungShort || `Giải pháp toàn diện tối ưu hóa cho ${item.tenSanPham?.toLowerCase()}`}
                              </p>
                            </div>
                          </Link>
                        );
                      })}

                      {currentMegaData.length === 0 && (
                        <div className="col-span-2 text-center py-10 text-gray-400">
                          Đang tải dữ liệu từ hệ thống...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Bottom link - Hiển thị cho tất cả tab */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
                    <Link 
                      href={viewAllLink}
                      className="flex items-center gap-2 text-[#3087fe] font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                    >
                       Xem toàn bộ hệ sinh thái {viewAllLabel} ({productCount}) <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/news" className="hover:text-[#3087fe] transition-colors focus:outline-none outline-none">
              Tin tức
            </Link>
          <Link href="/contact" className="hover:text-[#3087fe] transition-colors focus:outline-none outline-none">Liên hệ</Link>
        </nav>

        {/* NÚT LOGIN / USER INFO */}
        <div className="flex items-center gap-4">
          {user && user.role !== 'admin' && !user.username?.toLowerCase().includes('admin') && !user.name?.toLowerCase().includes('admin') ? (
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex flex-col items-end">
                <Link href="/profile" className="text-[14px] font-bold text-[#0f426c] hover:text-[#3087fe] transition-colors">{user.name || user.username}</Link>
              </div>
              <Link href="/profile" className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#3087fe] hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <User className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <Link href="/login" className="relative group overflow-hidden bg-[#144773] text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all">
              <span className="relative z-10">Đăng nhập</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}