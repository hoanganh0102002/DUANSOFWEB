import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // 1. Tạo bảng security_alerts (Nhật ký cảnh báo)
    await query({ query: `
      CREATE TABLE IF NOT EXISTS security_alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        ip_address VARCHAR(45) NOT NULL,
        severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
        is_resolved TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    // 2. Tạo bảng blocked_ips (IP bị khóa)
    await query({ query: `
      CREATE TABLE IF NOT EXISTS blocked_ips (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL UNIQUE,
        reason TEXT NOT NULL,
        blocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `});

    // 3. Thêm dữ liệu mẫu để demo
    const alertsExist = await query({ query: "SELECT COUNT(*) as count FROM security_alerts" }) as any;
    if (alertsExist[0].count === 0) {
      await query({ query: `
        INSERT INTO security_alerts (type, message, ip_address, severity) VALUES 
        ('SPAM', 'Vượt ngưỡng 50 request/phút tại Form Liên hệ', '192.168.1.45', 'high'),
        ('BRUTE_FORCE', 'Sai mật khẩu 5 lần liên tiếp tài khoản admin@sof.vn', '27.45.122.8', 'critical'),
        ('UNUSUAL_ACCESS', 'Đăng nhập từ vị trí lạ (Moscow, Russia)', '103.4.21.5', 'medium')
      `});
    }

    const blockedExist = await query({ query: "SELECT COUNT(*) as count FROM blocked_ips" }) as any;
    if (blockedExist[0].count === 0) {
      await query({ query: `
        INSERT INTO blocked_ips (ip_address, reason, expires_at) VALUES 
        ('192.168.1.45', 'Tự động chặn do Spam Form', DATE_ADD(NOW(), INTERVAL 24 HOUR)),
        ('27.45.122.8', 'Chặn tạm thời do thử mật khẩu', DATE_ADD(NOW(), INTERVAL 30 MINUTE))
      `});
    }

    return NextResponse.json({ 
      success: true, 
      message: "Khởi tạo hệ thống An ninh (Security Tables) thành công!" 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
