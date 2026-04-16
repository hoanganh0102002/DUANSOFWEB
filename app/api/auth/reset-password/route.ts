import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Vui lòng cung cấp đầy đủ thông tin" },
        { status: 400 }
      );
    }

    // Xác minh lại OTP
    const resets = await query({
      query: "SELECT id FROM password_resets WHERE email = ? AND otp = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1",
      values: [email, otp],
    }) as any[];

    if (resets.length === 0) {
      return NextResponse.json(
        { success: false, message: "Mã OTP không đúng hoặc đã hết hạn." },
        { status: 400 }
      );
    }

    // Cập nhật mật khẩu 
    await query({
      query: "UPDATE users SET password = ? WHERE email = ?",
      values: [newPassword, email],
    });

    // Xóa tất cả request đổi mật khẩu cũ của user này
    await query({
      query: "DELETE FROM password_resets WHERE email = ?",
      values: [email],
    });

    // Ghi log bảo mật
    try {
      await query({
        query: "INSERT INTO security_alerts (type, message, ip_address, severity) VALUES (?, ?, ?, ?)",
        values: ['PASSWORD_CHANGE', `Thay đổi mật khẩu thành công: ${email}`, request.headers.get("x-forwarded-for") || "127.0.0.1", 'low']
      });
    } catch (e) {}

    return NextResponse.json({
      success: true,
      message: "Đổi mật khẩu thành công!",
    });
  } catch (error: any) {
    console.error("[Reset Password] Error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
