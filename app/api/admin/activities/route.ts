import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Lấy dữ liệu đăng nhập / đăng ký từ users (Bỏ qua tài khoản admin)
    const users = await query({
      query: `SELECT name as user, 'Hoạt động thành viên' as action, CONCAT('Đăng nhập qua ', provider) as detail, last_login as time_val, 'auth' as type FROM users WHERE last_login IS NOT NULL AND role != 'admin' ORDER BY last_login DESC LIMIT 20`
    }) as any[];

    // 2. Lấy lượt gửi liên hệ 
    const contacts = await query({
      query: `SELECT full_name as user, 'Gửi yêu cầu tư vấn' as action, services as detail, created_at as time_val, 'contact' as type FROM contact_requests ORDER BY created_at DESC LIMIT 20`
    }) as any[];

    // 3. Lấy lượt xem sản phẩm (từ bảng page_views vừa tạo)
    const views = await query({
      query: `SELECT 'Khách tiềm năng' as user, 'Xem sản phẩm/dịch vụ' as action, path as detail, created_at as time_val, 'view' as type FROM page_views WHERE path LIKE '%/san-pham/%' ORDER BY created_at DESC LIMIT 30`
    }) as any[];

    // Gộp tất cả lại và sắp xếp theo thời gian mới nhất MỚI LÊN ĐẦU
    let activities = [...users, ...contacts, ...views];
    activities.sort((a, b) => new Date(b.time_val).getTime() - new Date(a.time_val).getTime());
    activities = activities.slice(0, 50); // Lấy 50 hành động mới nhất

    // Hàm chuyển đổi thời gian sang dạng "X phút trước"
    const formatTime = (dateStr: string) => {
      const diff = Date.now() - new Date(dateStr).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return 'Vừa xong';
      if (mins < 60) return `${mins} phút trước`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours} giờ trước`;
      if (hours < 48) return `Hôm qua`;
      return `${Math.floor(hours / 24)} ngày trước`;
    };

    // Format lại data cho component
    const formattedData = activities.map((a, i) => {
      let parsedDetail = a.detail;
      // Nếu là contact, detail là mảng json, ta nối nó lại
      if (a.type === 'contact') {
        try { 
          const parsed = JSON.parse(a.detail);
          parsedDetail = Array.isArray(parsed) ? parsed.join(", ") : parsed;
        } catch {}
      }
      // Đổi định dạng hiển thị tên path cho đẹp nếu là view
      if (a.type === 'view') {
        parsedDetail = decodeURIComponent(a.detail.replace('/san-pham/', 'Gói ')).replace('-', ' ').toUpperCase();
      }

      return {
        id: i + 1,
        user: a.user || "Khách ẩn danh",
        action: a.action,
        detail: parsedDetail,
        time: formatTime(a.time_val),
        type: a.type
      };
    });

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
