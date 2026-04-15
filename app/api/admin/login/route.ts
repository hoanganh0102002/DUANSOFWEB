import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Admin credentials - in production, store hashed in DB
const ADMIN_EMAIL = "admin@sof.com.vn";
const ADMIN_PASSWORD = "THU@1982";

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

  try {
    // 0. Check if IP is blocked
    const isBlocked = await query({
      query: "SELECT * FROM blocked_ips WHERE ip_address = ? AND (expires_at > NOW() OR expires_at IS NULL)",
      values: [ip]
    }) as any[];

    if (isBlocked.length > 0) {
      return NextResponse.json(
        { success: false, message: `Địa chỉ IP này đã bị khóa đến ${new Date(isBlocked[0].expires_at).toLocaleString('vi-VN')}` },
        { status: 403 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập email và mật khẩu" },
        { status: 400 }
      );
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminToken = `at_${Math.random().toString(36).substring(2)}${Date.now()}`;

      return NextResponse.json({
        success: true,
        data: {
          username: "admin",
          name: "Administrator",
          email: ADMIN_EMAIL,
          role: "admin",
          token: adminToken,
        },
      });
    }

    // Check normal user in users table
    const usersRecord = await query({
      query: "SELECT id, email, name, phone, address, role, deleted_at FROM users WHERE email = ? AND password = ? LIMIT 1",
      values: [email, password]
    }) as any[];

    if (usersRecord.length > 0) {
      if (usersRecord[0].deleted_at) {
        return NextResponse.json(
          { success: false, message: "Tài khoản này đã bị khóa." },
          { status: 403 }
        );
      }
      
      const userToken = `ut_${Math.random().toString(36).substring(2)}${Date.now()}`;
      
      // Update last login
      await query({
        query: "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
        values: [usersRecord[0].id]
      });

      return NextResponse.json({
        success: true,
        data: {
          username: usersRecord[0].email,
          name: usersRecord[0].name,
          email: usersRecord[0].email,
          phone: usersRecord[0].phone || "",
          address: usersRecord[0].address || "",
          role: usersRecord[0].role || "user",
          token: userToken,
        },
      });
    }

    // Login failed logic
    // 1. Log the alert
    await query({
      query: "INSERT INTO security_alerts (type, message, ip_address, severity) VALUES (?, ?, ?, ?)",
      values: ['BRUTE_FORCE', `Thử đăng nhập sai với email: ${email}`, ip, 'medium']
    });

    // 2. Check for continuous failures (e.g., 5 times in 10 mins)
    const recentFailures = await query({
      query: "SELECT COUNT(*) as count FROM security_alerts WHERE ip_address = ? AND type = 'BRUTE_FORCE' AND created_at > DATE_SUB(NOW(), INTERVAL 10 MINUTE)",
      values: [ip]
    }) as any[];

    if (recentFailures[0].count >= 5) {
      // Auto block IP for 30 minutes
      await query({
        query: "INSERT IGNORE INTO blocked_ips (ip_address, reason, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 MINUTE))",
        values: [ip, 'Tự động chặn do thử mật khẩu sai quá nhiều lần']
      });
      
      return NextResponse.json(
        { success: false, message: "Tài khoản bị tạm khóa do nhập sai quá nhiều lần. IP của bạn đã bị chặn 30 phút." },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Email hoặc mật khẩu không đúng!" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("[Admin Login] Error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống" },
      { status: 500 }
    );
  }
}
