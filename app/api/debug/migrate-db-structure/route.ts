import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // 1. Nâng cấp bảng site_products (Thêm các trường chi tiết)
    await query({ query: `
      CREATE TABLE IF NOT EXISTS site_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        code VARCHAR(50),
        category ENUM('SOFTWARE', 'HARDWARE', 'DICHVU') NOT NULL,
        description_brief TEXT,
        image_url TEXT,
        price DECIMAL(18, 0) DEFAULT 0,
        unit VARCHAR(50),
        badges JSON,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    // 2. Tạo bảng product_specs (Thông số kỹ thuật chi tiết)
    await query({ query: `
      CREATE TABLE IF NOT EXISTS product_specs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_slug VARCHAR(255) NOT NULL,
        label VARCHAR(255),
        value TEXT,
        is_bold TINYINT(1) DEFAULT 0,
        sort_order INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    // 3. Tạo bảng product_descriptions (Mô tả chi tiết theo đoạn)
    await query({ query: `
      CREATE TABLE IF NOT EXISTS product_descriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_slug VARCHAR(255) NOT NULL,
        heading VARCHAR(255),
        content TEXT,
        is_bold TINYINT(1) DEFAULT 0,
        heading_color VARCHAR(20),
        sort_order INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    // 4. Tạo bảng product_images (Album hình ảnh sản phẩm)
    await query({ query: `
      CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_slug VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        sort_order INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    return NextResponse.json({ success: true, message: "Cấu trúc Database hoàn hảo đã sẵn sàng!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
