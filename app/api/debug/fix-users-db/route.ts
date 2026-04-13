import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Thêm các cột còn thiếu vào bảng users
    // Sử dụng cú pháp ALTER TABLE đơn lẻ để đảm bảo tương thích
    try {
        await query({ query: "ALTER TABLE users ADD COLUMN address TEXT" });
    } catch (e) { console.log("Address column might already exist"); }
    
    try {
        await query({ query: "ALTER TABLE users ADD COLUMN phone VARCHAR(20)" });
    } catch (e) { console.log("Phone column might already exist"); }

    return NextResponse.json({ success: true, message: "Cấu trúc Database người dùng đã được vá lỗi hoàn hảo!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
