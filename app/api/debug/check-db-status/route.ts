import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // 1. Kiểm tra các cột trong bảng users
    const columns: any = await query({ query: "SHOW COLUMNS FROM users" });
    
    // 2. Thử cập nhật một dữ liệu mẫu để xem có lỗi hay không
    // (Chúng ta chỉ test chứ không làm thay đổi dữ liệu thật của bạn)
    
    return NextResponse.json({ 
      success: true, 
      database_structure: columns,
      message: "Đây là cấu trúc hiện tại của bảng users. Hãy xem có cột phone và address chưa."
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
