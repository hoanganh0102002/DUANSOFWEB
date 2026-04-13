import { NextResponse } from "next/server";
import { query } from "@/lib/db"              ; 

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Chỉ lấy những người dùng có role là 'user' (loại bỏ admin)
    const users = await query({
      query: `SELECT * FROM users WHERE role = 'user' AND deleted_at IS NULL ORDER BY created_at DESC`,
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.error("[Admin Users] Error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi tải danh sách người dùng" },
      { status: 500 }
    );
  }
}
