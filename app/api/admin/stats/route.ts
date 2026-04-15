import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // 1. Số lượng User theo role và provider
    const userStats = await query({
      query: `SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admins,
                SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as regular_users,
                SUM(CASE WHEN provider = 'google' THEN 1 ELSE 0 END) as google_users,
                SUM(CASE WHEN provider = 'facebook' THEN 1 ELSE 0 END) as fb_users
              FROM users WHERE deleted_at IS NULL`
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

    // 3. Dữ liệu biểu đồ truy cập (Lấy từ bảng page_views thật)
    const timelineData = await query({
      query: `SELECT 
                DATE(created_at) as date, 
                COUNT(*) as visits,
                COUNT(DISTINCT visitor_id) as unique_users
              FROM page_views 
              WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
              GROUP BY DATE(created_at)
              ORDER BY DATE(created_at) ASC`
    }) as any[];

    // 4. Analytics: Heatmap từ dữ liệu thật
    const heatmapRows = await query({
      query: `
        SELECT 
          DAYOFWEEK(created_at) as dow, 
          HOUR(created_at) as hour, 
          COUNT(*) as count 
        FROM page_views 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY dow, hour
      `
    }) as any[];

    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const heatmapMap: Record<string, any> = {};
    dayNames.forEach(d => heatmapMap[d] = { name: d, "0h-6h": 0, "6h-12h": 0, "12h-18h": 0, "18h-24h": 0 });
    
    heatmapRows.forEach(row => {
        const dName = dayNames[row.dow - 1];
        if (row.hour >= 0 && row.hour < 6) heatmapMap[dName]["0h-6h"] += row.count;
        else if (row.hour >= 6 && row.hour < 12) heatmapMap[dName]["6h-12h"] += row.count;
        else if (row.hour >= 12 && row.hour < 18) heatmapMap[dName]["12h-18h"] += row.count;
        else heatmapMap[dName]["18h-24h"] += row.count;
    });
    
    const heatmapData = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => heatmapMap[d]);

    const totalVisitsRow = await query({ query: "SELECT COUNT(*) as cnt FROM page_views WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)" }) as any[];
    const totalContactsRow = await query({ query: "SELECT COUNT(*) as cnt FROM contact_requests WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)" }) as any[];
    
    const totalVisitors = totalVisitsRow[0].cnt || 0; 
    const totalForms = totalContactsRow[0].cnt || 0;
    const conversionRate = totalVisitors > 0 ? ((totalForms / totalVisitors) * 100).toFixed(1) : "0.0";

    // 5. Security Stats
    const securityStats = await query({
      query: `
        SELECT 
          (SELECT COUNT(*) FROM blocked_ips WHERE expires_at > NOW() OR expires_at IS NULL) as blocked_ips,
          (SELECT COUNT(*) FROM security_alerts WHERE type = 'BRUTE_FORCE' AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)) as failed_logins
      `
    }) as any[];

    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: userStats[0]?.total || 0,
          regular: userStats[0]?.regular_users || 0,
          admins: userStats[0]?.admins || 0,
          google: userStats[0]?.google_users || 0,
          facebook: userStats[0]?.fb_users || 0,
        },
        products: {
          software: softwareCount,
          hardware: hardwareCount,
        },
        traffic: {
          total: totalVisitors, 
          timeline: timelineData.map(t => ({
            name: new Date(t.date).toLocaleDateString('vi-VN', {weekday: 'short'}),
            users: t.unique_users,
            visits: t.visits 
          }))
        },
        analytics: {
          heatmap: heatmapData,
          visitors: totalVisitors,
          forms: totalForms,
          conversionRate: parseFloat(conversionRate)
        },
        security: {
          blocked_ips: securityStats[0]?.blocked_ips || 0,
          failed_logins: securityStats[0]?.failed_logins || 0
        }
      }
    });

  } catch (error: any) {
    console.error("[Admin Stats API] Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
