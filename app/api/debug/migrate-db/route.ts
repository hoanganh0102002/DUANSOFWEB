import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // 1. Tạo bảng site_stats (Thông số trang web)
    await query({ query: `
      CREATE TABLE IF NOT EXISTS site_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        label VARCHAR(255) NOT NULL,
        value VARCHAR(50) NOT NULL,
        icon VARCHAR(50),
        sort_order INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    // 2. Tạo bảng site_products (Sản phẩm phần mềm & phần cứng)
    await query({ query: `
      CREATE TABLE IF NOT EXISTS site_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        category ENUM('SOFTWARE', 'HARDWARE') NOT NULL,
        description TEXT,
        image_url TEXT,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    // Làm sạch dữ liệu sản phẩm cũ để đồng bộ slug mới
    await query({ query: "TRUNCATE TABLE site_products" });

    // 3. Đổ dữ liệu Stats mẫu (Từ code hiện tại)
    const statsExists = await query({ query: "SELECT COUNT(*) as count FROM site_stats" }) as any;
    if (statsExists[0].count === 0) {
      await query({ query: `
        INSERT INTO site_stats (label, value) VALUES 
        ('Fifteen years of experience', '15+'),
        ('Completed Projects', '500+'),
        ('Happy Customers', '1000+'),
        ('Support Team', '24/7')
      `});
    }

    // 4. Đổ dữ liệu Sản phẩm đầy đủ (Khớp slug với hardwareData.ts & logic phần mềm)
    const productsData = [
      { name: 'Phần mềm Quản lý Bán hàng', slug: 'ban-hang', category: 'SOFTWARE', description: 'Giải pháp toàn diện giúp tự động hóa quy trình bán hàng, kiểm soát tồn kho và theo dõi doanh thu chính xác.', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094757.png' },
      { name: 'Phần mềm Quản lý Bảo hành', slug: 'bao-hanh', category: 'SOFTWARE', description: 'Công cụ tra cứu lịch sử sửa chữa, theo dõi serial, cảnh báo hết hạn bảo hành.', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094922.png' },
      { name: 'Phần mềm Quản lý Quán Cafe', slug: 'quan-cafe', category: 'SOFTWARE', description: 'Giải pháp order nhanh chóng, quản lý nguyên vật liệu, tích điểm thành viên.', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094652.png' },
      { name: 'Phần mềm Quản lý Bãi xe', slug: 'quan-ly-bai-xe', category: 'SOFTWARE', description: 'Kiểm soát phương tiện ra vào bằng công nghệ nhận diện biển số thông minh.', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094734.png' },
      { name: 'Phần mềm Quản lý Khách sạn', slug: 'khach-san', category: 'SOFTWARE', description: 'Hệ thống quản lý đặt phòng, nhận/trả phòng dành riêng cho các chuỗi khách sạn.', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094706.png' },
      { name: 'Phần mềm Quản lý Kho Pallet', slug: 'kho-pallet', category: 'SOFTWARE', description: 'Quản lý, phân bổ hàng hóa nâng cao theo từng ô Pallet.', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094850.png' },
      { name: 'Phần mềm Quản trị ERP', slug: 'erp-enterprise', category: 'SOFTWARE', description: 'Giải pháp hoạch định tài nguyên doanh nghiệp tổng thể: Kế toán, cung ứng...', image_url: '/hinhanh/hinhphanmem/Screenshot 2026-04-08 094952.png' },
      // Phần cứng (Khớp slug với hardwareData.ts)
      { name: 'Cân Điện Tử ONEPLUSONE', slug: 'can-dien-tu', category: 'HARDWARE', description: 'Thiết bị tính năng cao cấp phục vụ nhà hàng, siêu thị.', image_url: '/hinhanh/hw_pos_scale.png' },
      { name: 'Máy in hóa đơn HPRT', slug: 'may-in-hoa-don', category: 'HARDWARE', description: 'Máy in nhiệt công nghiệp tốc độ siêu nhạy, tự động cắt giấy.', image_url: '/hinhanh/hw_printer.png' },
      { name: 'Máy POS Cầm Tay', slug: 'may-pos-cam-tay', category: 'HARDWARE', description: 'Thiết bị nhỏ gọn tích hợp 2-in-1: vừa order vừa in bill.', image_url: '/hinhanh/hw_handheld.png' }
    ];

    for (const p of productsData) {
        await query({ 
            query: "INSERT IGNORE INTO site_products (name, slug, category, description, image_url) VALUES (?, ?, ?, ?, ?)",
            values: [p.name, p.slug, p.category, p.description, p.image_url]
        });
    }

    return NextResponse.json({ success: true, message: "Database migration (Stats & Products) hoàn tất hoàn hảo!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
