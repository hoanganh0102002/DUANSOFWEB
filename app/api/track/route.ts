import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    
    // Đảm bảo bảng page_views tồn tại
    await query({ query: `
      CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        path VARCHAR(255) NOT NULL,
        visitor_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    // Thêm bản ghi truy cập
    await query({
      query: "INSERT INTO page_views (path, visitor_id) VALUES (?, ?)",
      values: [path || "/", ip]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
