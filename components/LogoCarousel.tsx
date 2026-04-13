'use client';
import React, { useState } from 'react';

const initialLogos = [
  { name: "Công Ty Dầu Khí Việt Nhật", logo: "https://tse3.mm.bing.net/th?id=OIP.p9XPw4piqJFBdCPTHi-mkAHaEP&pid=Api&P=0&h=180" },
  { name: "Công Ty Dầu Khí Đồng Tháp", logo: "https://tse1.mm.bing.net/th?id=OIP.BLH6vldIscj_ZjLCVeVgVwAAAA&pid=Api&P=0&h=180" },
  { name: "Công Ty CP Giải Pháp Biznet", logo: "https://static.topcv.vn/company_logos/cong-ty-co-phan-giai-phap-cong-nghe-biznet-628f4eceb2572.jpg" },
  { name: "Khách sạn 5* Imperial - Vũng Tàu", logo: "https://pbs.twimg.com/profile_images/1203596005502902272/GnJDC4Mg_400x400.jpg" },
  { name: "Công ty Bueno - KCN Nhơn Trạch", logo: "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/cong-ty-tnhh-ky-thuat-bueno-5e7d77dd06e4c.jpg" },
  { name: "BECAMEX Bình Dương", logo: "https://forbes.baovanhoa.vn/wp-content/uploads/2022/06/LogoTop50_Becamex.jpg" },
  { name: "Công Ty Sợi Thế Kỷ", logo: "https://up.yimg.com/ib/th?id=OIP.g5NZdNu-aFraIQhmlDg6fgAAAA&pid=Api&rs=1&c=1&qlt=95&w=191&h=121" },
  { name: "Công Ty Vận Tải Nghi Phong", logo: "https://pic.trangvangvietnam.com/114586/logo-van-tai-nghi-long.gif" },
  { name: "Cty Công Nghệ Minh Phương", logo: "https://erp.minhphuong.biz/images/logo/logo.png" },
  { name: "Công Ty Bao Bì Thịnh Thành Đạt", logo: "https://studentjob.vn/resize/280/0/store/2018/12/thinh-thanh-dat-coltd-cong-ty-tnhh-bao-bi-thinh-thanh-dat.jpg" },
  { name: "Công Ty Cổ Phần Phân Bón Bình Điền", logo: "https://cdn.haitrieu.com/wp-content/uploads/2023/10/Logo-Binh-Dien-635x635.png" },
  { name: "Công Ty Dược Phẩm Hasan", logo: "https://static.topcv.vn/company_logos/cong-ty-duoc-pham-hasan-603db90ac4dbc.jpg" },
  { name: "Công Ty Brotex Việt Nam", logo: "https://dxwd4tssreb4w.cloudfront.net/image/db2944f727fe7c17c135966d3cb2750a" },
  { name: "Cty Wantai - KCN Phước Đông - Tây Ninh", logo: "https://wtrubber.com.vn/wp-content/uploads/2022/02/logo1.jpg" },
  { name: "Công Ty Quốc Tế Di Hưng", logo: "https://goldwellvn.com/upload/photo/logo_08593302102019.png" },
  { name: "Công Ty Điện Lạnh Đông Sapa", logo: "https://dongsapa.com.vn/wp-content/uploads/2022/10/Logo-DSP-new-1.png.webp" },
  { name: "Huy Vân", logo: "https://huyvan.sof.com.vn/images/logo/logo.png" },
  { name: "Geo", logo: "https://geo.sof.com.vn/images/logo/logo.png" },
  { name: "Thiên Vân", logo: "https://thienvan.sof.com.vn/images/logo/logo.png" },
];

export const LogoCarousel = () => {
  // Only display logos that actually have a URL
  const validLogos = initialLogos.filter(l => l.logo && l.logo.length > 0);

  return (
    <section className="py-12 border-y border-[#a7d5ec]/20 overflow-hidden bg-white/30 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-10 text-center">
          <div className="px-4 py-1 rounded-full border border-[#0f426c]/20 bg-blue-50">
            <span className="text-[#0f426c] font-semibold text-sm">Rất nhiều</span>
          </div>
          <span className="text-sm text-[#507588]">
            doanh nghiệp đã chuyển mình cùng{" "}
            <span className="text-[#0f426c] font-bold">SOF</span>
          </span>
        </div>
      </div>

      {/* Infinite Logo Scroll Area */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8fbff] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8fbff] to-transparent z-10 pointer-events-none" />

        <div className="animate-scroll flex flex-nowrap w-max items-center gap-16 lg:gap-24">
          {/* Render logos 3 times for super smooth infinite scrolling */}
          {[...validLogos, ...validLogos, ...validLogos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[140px] lg:w-[180px] flex items-center justify-center group"
            >
              <div className="relative h-14 lg:h-20 w-full flex items-center justify-center px-4 transition-all duration-300">
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="h-full w-auto max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    // Hide individual logo container if image fails to load
                    (e.target as HTMLImageElement).closest('.flex-shrink-0')?.remove();
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
