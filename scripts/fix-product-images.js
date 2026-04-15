const mysql = require('mysql2/promise');

async function fixImages() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sof.vn_db',
  });

  // ======= SỬA ẢNH PHẦN CỨNG (HARDWARE) =======
  // Mapping rõ ràng từ tên file ảnh
  const hardwareFixes = [
    { slug: 'can-dien-tu',       img: '/hinhanh/hw_pos_scale.png' },   // Cân → giữ nguyên ✓
    { slug: 'may-in-hoa-don',    img: '/hinhanh/hw_printer.png' },     // Máy in → giữ nguyên ✓
    { slug: 'may-pos-cam-tay',   img: '/hinhanh/hw_handheld.png' },    // POS cầm tay → giữ nguyên ✓
    { slug: 'may-pos-2-man-hinh', img: '/hinhanh/hw_dual_pos.png' },   // POS 2 màn hình
    { slug: 'may-quet-ma-vach',  img: '/hinhanh/hw_scanner.png' },     // Quét mã vạch cầm tay
    { slug: 'may-quet-omni',     img: '/hinhanh/hw_omni.png' },        // Máy quét Omni để bàn
    { slug: 'ket-dung-tien',     img: '/hinhanh/hw_drawer.png' },      // Két đựng tiền
    { slug: 'giay-in-nhiet',     img: '/hinhanh/hw_paper.png' },       // Giấy in nhiệt
  ];

  // ======= SỬA ẢNH PHẦN MỀM (SOFTWARE) =======
  // 14 sản phẩm, 13 file ảnh → mỗi SP 1 ảnh riêng (ảnh cuối sẽ dùng 094620)
  const softwareFixes = [
    { slug: 'ban-hang',          img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094757.png' },  // Bán hàng ✓
    { slug: 'bao-hanh',          img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094922.png' },  // Bảo hành ✓
    { slug: 'quan-cafe',         img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094652.png' },  // Quán Cafe ✓
    { slug: 'quan-ly-bai-xe',    img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094734.png' },  // Bãi xe ✓
    { slug: 'bai-xe-mobile',     img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094719.png' },  // Bãi xe Mobile (ảnh riêng)
    { slug: 'khach-san',         img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094706.png' },  // Khách sạn ✓
    { slug: 'kho-pallet',        img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094850.png' },  // Kho Pallet ✓
    { slug: 'quan-an',           img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094620.png' },  // Quán ăn (ảnh riêng)
    { slug: 'kho',               img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094833.png' },  // Kho (ảnh riêng)
    { slug: 'van-tai',           img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094910.png' },  // Vận tải (ảnh riêng)
    { slug: 'nha-hang',          img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094932.png' },  // Nhà hàng (ảnh riêng)
    { slug: 'nhan-su',           img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 095003.png' },  // Nhân sự (ảnh riêng)
    { slug: 'erp-enterprise',    img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094952.png' },  // ERP ✓
    { slug: 'tra-thuong',        img: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094932.png' },  // Trả thưởng (chỉ có 13 ảnh cho 14 SP)
  ];

  const allFixes = [...hardwareFixes, ...softwareFixes];

  console.log('🔧 Đang cập nhật ảnh sản phẩm...\n');

  for (const fix of allFixes) {
    try {
      const [result] = await pool.execute(
        'UPDATE site_products SET image_url = ? WHERE slug = ?',
        [fix.img, fix.slug]
      );
      const affected = result.affectedRows;
      console.log(`${affected > 0 ? '✅' : '⚠️'} ${fix.slug} → ${fix.img} (${affected} row updated)`);
    } catch (err) {
      console.error(`❌ Lỗi ${fix.slug}:`, err.message);
    }
  }

  console.log('\n✅ Hoàn tất cập nhật tất cả ảnh sản phẩm!');
  await pool.end();
}

fixImages();
