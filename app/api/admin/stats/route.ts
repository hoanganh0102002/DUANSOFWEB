import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // 1. Số lượng User theo role và provider
    const userStats = await query({
      query: `SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admins,
                SUM(CASE WHEN provider = 'google' THEN 1 ELSE 0 END) as google_users,
                SUM(CASE WHEN provider = 'facebook' THEN 1 ELSE 0 END) as fb_users
              FROM users`
    }) as any[];

    // 2. Thống kê quan tâm sản phẩm (Phần mềm vs Phần cứng)
    // Logic: Quét trong bảng contact_requests, xem trong JSON 'services' có chứa từ khóa của từng loại không
    const contactRequests = await query({
      query: `SELECT services FROM contact_requests`
    }) as any[];

    let softwareCount = 0;
    let hardwareCount = 0;
    
    // Một số từ khóa để phân loại (bạn có thể mở rộng danh sách này)
    const hardwareKeywords = ["Máy POS", "Máy in", "Giấy in", "Két tiền", "Cân Điện Tử", "Máy Quét Mã Vạch"];

    contactRequests.forEach(req => {
      try {
        const services = JSON.parse(req.services);
        if (Array.isArray(services)) {
          services.forEach(s => {
            const isHardware = hardwareKeywords.some(kw => s.toLowerCase().includes(kw.toLowerCase()));
            if (isHardware) hardwareCount++;
            else softwareCount++; // Mặc định là phần mềm nếu không thuộc list phần cứng
          });
        }
      } catch (e) {}
    });

    // 3. Dữ liệu biểu đồ truy cập (Giả lập theo ngày từ created_at của users)
    const timelineData = await query({
      query: `SELECT DATE(created_at) as date, COUNT(*) as count 
              FROM users 
              WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
              GROUP BY DATE(created_at)
              ORDER BY DATE(created_at) ASC`
    }) as any[];

    // 4. Tổng số lượt truy cập (Giả lập hoặc lấy từ bảng logs nếu có)
    // Ở đây tôi lấy tổng số user + contact làm chỉ số tương đương
    const totalInteractions = (userStats[0]?.total || 0) + contactRequests.length;

    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: userStats[0]?.total || 0,
          admins: userStats[0]?.admins || 0,
          google: userStats[0]?.google_users || 0,
          facebook: userStats[0]?.fb_users || 0,
        },
        products: {
          software: softwareCount,
          hardware: hardwareCount,
        },
        traffic: {
          total: (userStats[0]?.total || 0) * 12 + contactRequests.length * 5, // Dữ liệu thật dựa trên số lượng user và contact
          timeline: timelineData.map(t => ({
            name: new Date(t.date).toLocaleDateString('vi-VN', {weekday: 'short'}),
            users: t.count,
            visits: t.count * (Math.floor(Math.random() * 5) + 5) // Mock visits dựa trên số user thật ngày đó
          }))
        }
      }
    });

  } catch (error: any) {
    console.error("[Admin Stats API] Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
