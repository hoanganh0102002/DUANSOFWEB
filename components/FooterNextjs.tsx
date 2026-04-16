"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { productService, getProductUrl } from "@/services/productService";
import { menuService, getInfoUrl } from "@/services/menuService";
import { useTenant } from "@/components/providers/TenantProvider";
import { MapPin } from "lucide-react";

const offices = [
  {
    location: "Trụ sở chính:",
    phone: "028.38.152.465 - 028.38.152.364",
    address: "69/9 Đường D9, Phường Tây Thạnh, TP. Hồ Chí Minh",
  },
];

const FooterContent = () => {
  const searchParams = useSearchParams();
  const currentLang = searchParams.get('lang') || 'vi';
  const { tenant } = useTenant();
  const companyName = tenant?.name || 'CÔNG TY TNHH SOF';
  const footerText = tenant?.settings?.footerText || null;

  const [allProducts, setAllProducts] = useState<any[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Giữ lại logic fetch sản phẩm cho modal nếu cần
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = await productService.getAllProducts();
        if (mounted && all && all.length > 0) {
          setAllProducts(all);
        }
      } catch (e) {
        console.error("Footer: failed to load data", e);
      }
    })();
    return () => { mounted = false };
  }, [currentLang]);

  const openAllProducts = async () => {
    if (!allProducts) {
      try {
        const all = await productService.getAllProducts();
        setAllProducts(all || []);
      } catch (e) {
        console.warn('Failed to load all products', e);
        setAllProducts([]);
      }
    }
    setModalOpen(true);
  };

  return (
    <>
      <footer className="bg-[#f4fbff] border-t border-[#a7d5ec]">
        {/* Main Footer - Hiển thị tĩnh các cột như Hình 1 */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">

            {/* Cột 1 */}
            <div className="space-y-4">
              <h4 className="font-bold text-base sm:text-lg text-[#0f426c] mb-4">
                Thiết kế Website
              </h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Thiết kế website doanh nghiệp</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Thiết kế website chuyên nghiệp</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Thiết kế website thương mại điện tử</Link></li>
              </ul>
            </div>

            {/* Cột 2 */}
            <div className="space-y-4">
              <h4 className="font-bold text-base sm:text-lg text-[#0f426c] mb-4">
                Dịch vụ khác
              </h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Đào tạo phần mềm</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Quản trị hệ thống mạng linux</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Quản trị hệ thống mạng window</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Cài đặt mail server linux & window</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Cài đặt giám sát mạng linux & window</Link></li>
              </ul>
            </div>

            {/* Cột 3 */}
            <div className="space-y-4">
              <h4 className="font-bold text-base sm:text-lg text-[#0f426c] mb-4">
                Hỗ trợ
              </h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Hỏi đáp</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Hướng dẫn sử dụng phần mềm</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Hướng dẫn mua trực tuyến</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Hướng dẫn thanh toán</Link></li>
              </ul>
            </div>

            {/* Cột 4 */}
            <div className="space-y-4">
              <h4 className="font-bold text-base sm:text-lg text-[#0f426c] mb-4">
                Chính sách
              </h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Quy định và hình thức thanh toán</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors leading-relaxed block">Chính sách vận chuyển, giao nhận,<br />cài đặt</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Chính sách bảo hành, bảo trì</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Chính sách đổi trả và hoàn tiền</Link></li>
                <li><Link href="#" className="text-sm text-[#507588] hover:text-[#0f426c] transition-colors">Chính sách bảo mật thông tin</Link></li>
              </ul>
            </div>

            {/* Cột 5 */}
            <div className="space-y-4">
              <h4 className="font-bold text-base sm:text-lg text-[#0f426c] mb-4">
                Tuyển dụng
              </h4>
            </div>

          </div>

          {/* Office Locations (two-column layout) - Giống Hình 2 */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#a7d5ec]">
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-6 sm:gap-8">
              {/* Left: Company + Head office */}
              <div className="space-y-4">
                <p className="font-bold text-base sm:text-lg text-[#0f426c]">{companyName.toUpperCase()}</p>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#507588] mt-0.5" />
                  <div className="space-y-1.5">
                    <p className="text-sm sm:text-base text-[#507588] font-medium">Trụ sở chính</p>
                    <p className="text-sm sm:text-base text-[#507588]">Địa chỉ: {offices[0]?.address}</p>
                    <p className="text-sm sm:text-base text-[#507588]">Điện thoại: {offices[0]?.phone}</p>
                    <p className="text-sm sm:text-base text-[#507588]"><a href="mailto:info@sof.vn" className="hover:underline">Email: info@sof.vn</a></p>
                  </div>
                </div>
              </div>

              { /* Right: Registration info */}
              <div className="space-y-4 flex-shrink-0 md:text-right">
                <p className="font-bold text-base sm:text-lg text-[#0f426c]">Thông tin đăng ký</p>
                <div className="text-sm sm:text-base text-[#507588] space-y-1.5">
                  <p>Số ĐKKD: 0310690184 — Ngày cấp: 15/03/2011</p>
                  <p>Cơ quan cấp: Sở kế hoạch và Đầu tư TPHCM</p>
                </div>
                {/* Registration badge image */}
                <div className="md:flex md:justify-end">
                  <Link href="http://online.gov.vn/Home/WebDetails/140223" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                    <img
                      src="/hinhanh/logoSaleNoti.png"
                      alt="Đã thông báo bộ công thương"
                      className="w-32 sm:w-40 object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tenant footer text override */}
        {footerText && (
          <div className="border-t border-[#a7d5ec] mt-6 pt-4 text-center text-xs text-[#507588]">
            {footerText}
          </div>
        )}
      </footer>

      {/* Modal danh sách sản phẩm (nếu còn sử dụng ở đâu đó, được giữ lại) */}
      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} />
          <div className="relative z-10 w-full max-w-3xl bg-white rounded shadow-lg p-6 overflow-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#0f426c]">Tất cả sản phẩm</h3>
              <button onClick={() => setModalOpen(false)} className="text-sm text-[#0f426c] font-medium hover:underline">Đóng</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(allProducts || []).map((p: any, index: number) => (
                <a key={`product-${p.maSanPham || p.slug || index}`} href={getProductUrl(p)} className="text-sm text-[#507588] hover:text-[#0f426c]">
                  {p.tenSanPham || p.maSanPham}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const Footer = () => {
  return (
    <Suspense fallback={<div className="bg-[#f4fbff] py-10 text-center text-xs text-blue-200/30">Đang tải chân trang...</div>}>
      <FooterContent />
    </Suspense>
  );
};

export default Footer;