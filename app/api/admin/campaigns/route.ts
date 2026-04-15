import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Đảm bảo bảng campaigns tồn tại
    await query({ query: `
      CREATE TABLE IF NOT EXISTS campaigns (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        target_group VARCHAR(50),
        status ENUM('active', 'completed', 'paused') DEFAULT 'active',
        sent_count INT DEFAULT 0,
        open_count INT DEFAULT 0,
        click_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    const campaigns = await query({
      query: "SELECT * FROM campaigns ORDER BY created_at DESC"
    }) as any[];

    // Nếu chưa có camp nào, tạo demo
    if (campaigns.length === 0) {
      await query({
        query: `INSERT INTO campaigns (name, target_group, status, sent_count, open_count, click_count) VALUES 
          ('Khuyến mãi Tháng 5', 'Khách hàng cũ', 'active', 1250, 840, 320),
          ('Ra mắt tính năng mới', 'Doanh nghiệp ERP', 'completed', 450, 310, 120)`
      });
      return NextResponse.json({ success: true, data: [
        { id: 1, name: 'Khuyến mãi Tháng 5', target: 'Khách hàng cũ', status: 'active', sent: 1250, open: 840, click: 320 },
        { id: 2, name: 'Ra mắt tính năng mới', target: 'Doanh nghiệp ERP', status: 'completed', sent: 450, open: 310, click: 120 }
      ]});
    }

    return NextResponse.json({
      success: true,
      data: campaigns.map(c => ({
        id: c.id,
        name: c.name,
        target: c.target_group,
        status: c.status,
        sent: c.sent_count,
        open: c.open_count,
        click: c.click_count
      }))
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(req: Request) {
  try {
    const { name, target_group } = await req.json();
    const result = await query({
      query: "INSERT INTO campaigns (name, target_group, status) VALUES (?, ?, 'active')",
      values: [name, target_group]
    }) as any;

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
  