import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, name, phone, address } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" });
    }

    // 1. Kiểm tra xem người dùng đã tồn tại trong DB chưa
    const existing = await query({
      query: "SELECT id FROM users WHERE email = ? LIMIT 1",
      values: [email]
    }) as any[];

    if (existing.length > 0) {
      // 2. Nếu đã có -> Cập nhật (Update)
      await query({ 
        query: "UPDATE users SET name = ?, phone = ?, address = ?, updated_at = NOW() WHERE email = ?",
        values: [name, phone, address, email]
      });
      console.log(`✅ Updated existing user: ${email}`);
    } else {
      // 3. Nếu chưa có -> Tạo mới (Insert)
      await query({
        query: "INSERT INTO users (email, name, phone, address, provider, role, created_at, updated_at) VALUES (?, ?, ?, ?, 'google', 'user', NOW(), NOW())",
        values: [email, name, phone, address]
      });
      console.log(`✨ Created new user record for: ${email}`);
    }

    return NextResponse.json({ success: true, message: "Hồ sơ đã được lưu vĩnh viễn vào Database!" });
  } catch (error: any) {
    console.error("❌ Profile Update Error:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}
